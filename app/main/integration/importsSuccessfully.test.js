import { importFile } from '../src/csv/importServices'
import logger from '../src/helpers/logger'
import { tryCatch } from '../src/helpers/either'
import config from '../src/config/config'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../src/csv/csvImportOptions'
import {
  promiseCreateDatabase,
  promiseWrite,
  promiseQuery,
  promiseDeleteDatabase,
  promiseDatabase
} from '../src/influx/influxServices'

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
      .then(promiseCreateDatabase())
      .then(
        importFile(csvOptions)(config.importDataPath).on('json', jsonObj =>
          writeToInflux(jsonObj)
        )
        // .on('done', err => logger.warn('importFile() err', err))
      )
      .catch(err => {
        logger.error('promiseCreateDatabase()', err)
      })
  })
  it('reads the data', () => {
    const stringToUse = `[{"city": "HACKNEY", "county": "GREATER LONDON", "date": "2006-06-22 00:00", "host": "testHost", "postcode": "E8 1EN", "price": 245000, "time": 2017-05-23T21:55:20.026Z}]`

    return readFromInflux().then(data =>
      expect(data).toEqual(expect.stringContaining(stringToUse))
    )
  })
  it('deletes the DB', () => {
    const spy = spyOn(promiseDeleteDatabase(), 'play')
    // expect(spy).toHaveBeenCalled()
    // expect(promiseDeleteDatabase).toBe(true)
    // expect(spy.promiseDeleteDatabase()).toBeCalled()
  })
})
