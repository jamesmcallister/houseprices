import {
  importStream,
  importFile,
  importString
} from '../../app/services/importServices'
import { csvOptions } from '../../src/csv/csvImportOptions'
import { createReadStream, createWriteStream } from 'fs'

import writeToFile from '../functions/file.fuctions'
import logger from '../../src/helpers/logger'

const fileToImport = __dirname + '/pp.csv'
const fileStreamLoaction = createReadStream(fileToImport, 'utf8')
const fileToSaveAs = './output/done.json'

// read file

const main = () => {
  importStream(csvOptions)(fileStreamLoaction).on('json', json => {
    writeToFile(fileToSaveAs)(json)
    logger.warn(json)
  })
}

main()

// push data to json
