import { importFile } from '../../app/services/importServices'
import logger from '../../src/helpers/logger'
import config from '../../app/config/config'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../../src/csv/csvImportOptions'
import {
  promiseDeleteDatabase,
  promiseCreateDatabase,
  promiseWrite,
  promiseQuery
} from '../../app/services/influxServices'

import saveToFile from '../functions/file.fuctions'
import { getMaxPrice, getTotalPrice } from '../functions/math.fuctions'

const fileToImport = __dirname + '/pp.csv'

const fileName = jobName => `./output/___${jobName}.json`

const printShitOut = result => {
  logger.warn(result)
  logger.warn(JSON.stringify(formatOutputOfResult(result), 2, 2))
}

const formatOutputOfResult = result => {
  return result
}

const writeToInflux = ({ price, date, postcode, city, county }) => {
  return promiseWrite([
    {
      measurement: 'max',
      fields: {
        price: price,
        date: date,
        postcode: postcode,
        city: city,
        county: county
      }
    }
  ]).catch(err => logger.error('writeToInflux()', err))
}

const readFromInflux = jobQuery => {
  return promiseQuery(jobQuery).catch(err =>
    logger.error('readFromInflux()', err)
  )
}

export default jobQuerys => {
  return promiseDeleteDatabase()
    .then(promiseCreateDatabase)
    .then(
      () =>
        new Promise(resolve =>
          importFile(csvOptions)(fileToImport).on('json', result =>
            resolve(writeToInflux(result))
          )
        )
    )
    .then(
      jobQuerys.map(job =>
        readFromInflux(job.query)
          .then(result => {
            saveToFile(fileName(job.name))(formatOutputOfResult(result))
          })
          .then(promiseDeleteDatabase)
          .catch(err => logger.error('readFromInflux()', err))
      )
    )
}
