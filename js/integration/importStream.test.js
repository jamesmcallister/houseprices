import { importStream } from '../app/services/importServices'
import logger from '../src/helpers/logger'
import { createReadStream } from 'fs'

import config from '../app/config/config'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../src/csv/csvImportOptions'

describe('Lets import a Stream', () => {
  it('should import a csv file from stream', () => {
    // const streamFile = fs.createWriteStream(config.importDataPath)

    // const fileToImport = __dirname + '/pp.csv'
    const fileStreamLoaction = createReadStream(config.importDataPath)

    importStream(csvOptions)(fileStreamLoaction)
      .on('json', result => {
        expect(result.price).toBeGreaterThan(10000)
        logger.warn(result)
      })
      .on('error', error => {
        logger.error(error)
      })
  })
})
