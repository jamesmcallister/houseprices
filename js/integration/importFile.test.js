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

describe('Lets import a file', () => {
  it('should import a csv file', () => {
    importFile(csvOptions)(config.importDataPath)
      .on('json', jsonObj => {
        expect(jsonObj.price).toBeGreaterThan(10000)
      })
      .on('error', error => {
        logger.error(error)
      })
  })
})
