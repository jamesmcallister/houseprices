import { importFile } from '../src/csv/importServices'
import logger from '../src/helpers/logger'
import { tryCatch } from '../src/helpers/either'
import { expect, assert } from 'chai'
// import { wg } from '../src/config/helper'
import config from '../src/config/config'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../src/csv/csvImportOptions'
import {
  promiseWrite,
  promiseQuery,
  promiseDeleteDatabase,
  promiseDatabase
} from '../src/influx/influxServices'

const writeToInflux = dataToBeWriten => {
  const { price, date, postcode, city, county } = dataToBeWriten
  promiseWrite([
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
  ])
}

const readFromInflux = () => {
  promiseQuery(
    `select * from response_times
      where host = 'testHost'
      order by time desc
      limit 10 `
  )
}

describe('Imports successfully', () => {
  it('Writes File to influx', () => {
    promiseDatabase()
      .then(
        importFile(csvOptions)(config.importDataPath).on('json', jsonObj =>
          tryCatch(() => writeToInflux(jsonObj))
            .chain(promiseDatabase)
            .fold(err => logger.error(getFilename, err), expect().to.be(true))
        )
      )
      .catch(err => logger.error(getFilename, err))
  })
})

// tryCatch(() => writeToInflux(jsonObj))
//   .chain(promiseDatabase)
//   .fold(err => logger.warn(err), console.log('erere'))
