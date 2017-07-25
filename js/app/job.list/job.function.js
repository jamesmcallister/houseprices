import { importStream } from '../../app/services/importServices'
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

import { Observable } from 'rxjs'
import 'rx-from-csv'

const fileToImport = __dirname + '/pp-2017.csv'

const fileToStream = () => {
  Observable.fromCSV(fileToImport).subscribe
}

const fileName = jobName => `./output/___${jobName}.json`

const printShitOut = result => {
  // logger.warn(result)
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

export default async jobQuery => {
  await promiseDeleteDatabase()
  await promiseCreateDatabase()
  await importStream(csvOptions)(fileToStream)
    .on('json', result => writeToInflux(result))
    .on('error', err => logger.error('writeToInflux()', err))
  await jobQuery.map(job =>
    readFromInflux(job.query).then(result => {
      saveToFile(fileName(job.name))(formatOutputOfResult(result))
      printShitOut(result)
    })
  )
}
