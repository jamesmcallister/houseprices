import { importFile } from '../app/services/importServices'
import logger from '../src/helpers/logger'
import { tryCatch } from '../src/helpers/either'
import config from '../app/config/config'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../src/csv/csvImportOptions'
import {
  promiseDeleteDatabase,
  promiseCreateDatabase,
  promiseWrite,
  promiseQuery
} from '../app/services/influxServices'

const writeToInflux = dataToBeWriten => {
  const { price, date, postcode, city, county } = dataToBeWriten
  return promiseWrite([
    {
      measurement: 'response_times',
      tags: { host: 'testHost' },
      fields: {
        price: price,
        date: date,
        postcode: postcode,
        city: city,
        county: county
      }
    }
  ]).catch(err => logger.warn('writeToInflux()', err))
}

const readFromInflux = () => {
  return promiseQuery(
    `select * from response_times
      where host = 'testHost'
      order by time desc
      limit 10 `
  ).catch(err => logger.warn('readFromInflux()', err))
}

describe('Imports successfully', () => {
  it('Writes File to influx', () => {
    return promiseDeleteDatabase()
      .then(promiseCreateDatabase)
      .then(
        () =>
          new Promise(resolve =>
            importFile(csvOptions)(config.importDataPath).on('json', json =>
              resolve(writeToInflux(json))
            )
          )
      )
      .catch(err => {
        logger.error('promiseCreateDatabase()', err)
      })
  })
  it('reads the data', () => {
    const stringToUse = {
      county: 'READING',
      date: '2002-12-11 00:00',
      host: 'testHost',
      postcode: 'RG1 4EX',
      price: 190000
    }

    return promiseDeleteDatabase()
      .then(promiseCreateDatabase)
      .then(
        () =>
          new Promise(resolve =>
            importFile(csvOptions)(config.importDataPath).on('json', json =>
              resolve(writeToInflux(json))
            )
          )
      )
      .then(() => {
        return readFromInflux()
      })
      .then(data => {
        return expect(data[0]).toEqual(expect.objectContaining(stringToUse))
      })
  })
  // it('deletes the DB', () => {
  //   const spy = spyOn(influxServices,"(p)romiseDeleteDatabase")
  //   // expect(spy).toHaveBeenCalled()
  //   // expect(promiseDeleteDatabase).toBe(true)
  //   // expect(spy.promiseDeleteDatabase()).toBeCalled()
  // })
})
