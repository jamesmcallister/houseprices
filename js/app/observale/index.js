import logger from '../../src/helpers/logger'
import { createReadStream } from 'fs'
import { importStream } from '../../app/services/importServices'
import {
  csvOptions
  //   headerOptions,
  //   ingnoreColumns,
  //   includedColumns
} from '../../src/csv/csvImportOptions'
import {
  promiseDeleteDatabase,
  promiseCreateDatabase,
  promiseWrite,
  promiseQuery
} from '../../app/services/influxServices'

const fileToImport = __dirname + '/pp.csv'
const fileStreamLoaction = createReadStream(fileToImport)

importStream(csvOptions)(fileStreamLoaction)
  .on('csv', csvRow => {
    logger.info(csvRow)
  })
  .on('done', error => {})
