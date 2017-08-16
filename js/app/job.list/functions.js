import { importStream } from '../../app/services/importServices'
import logger from '../../src/helpers/logger'
// import config from '../../app/config/config'
import { csvOptions } from '../../src/csv/csvImportOptions'
import { promiseWrite, promiseQuery } from '../../app/services/influxServices'
export const writeToInflux = ({ price, date, postcode, city, county }) => {
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

export const printShitOut = result => {
  // logger.warn(result)
  logger.warn(JSON.stringify(formatOutputOfResult(result), 2, 2))
}

export const formatOutputOfResult = result => result

export const fileName = jobName => `./output/___${jobName}.json`

import saveToFile from '../functions/file.fuctions'
import { getMaxPrice, getTotalPrice } from '../functions/math.fuctions'

export const readFromInflux = jobQuery => {
  return promiseQuery(jobQuery).catch(err =>
    logger.error('readFromInflux()', err).then(x => printShitOut(x))
  )
}

// promiseDeleteDatabase()
// promiseCreateDatabase()
// // Observable.fromCSV(fileToImport).subscribe(x => printShitOut(x))
// Observable.fromPromise(fileInStream).subscribe(x => printShitOut(x))

// // importStream(csvOptions)(fileToStream).on('json', result =>
// //   writeToInflux(result)
// // )
// // jobQuery.map(job =>
// //   readFromInflux(job.query).then(result => {
// //     saveToFile(fileName(job.name))(formatOutputOfResult(result))
// //     printShitOut(result)
// //   })
// )
