import logger from '../../src/helpers/logger'
import { createReadStream } from 'fs'
import { importStream } from '../../app/services/importServices'
import { csvOptions } from '../../src/csv/csvImportOptions'
import {
  promiseWrite,
  promiseDeleteDatabase,
  promiseCreateDatabase
} from '../services/influxServices'

const fileToImport = __dirname + '/pp.csv'
const fileStreamLoaction = createReadStream(fileToImport)

promiseDeleteDatabase()
promiseCreateDatabase()

importStream(csvOptions)(fileStreamLoaction).on('csv', csvRow => {
  promiseWrite(csvRow)
  logger.info(csvRow)
})
