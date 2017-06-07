import logger from '../../../src/helpers/logger'
import cliFunction from './cliFunction'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../../../src/csv/csvImportOptions'
import config from '../../config/config'

describe('reads argvs', () => {
  it('does stuff', () => {
    logger.warn(cliFunction('test.csv')(config.databaseName)(csvOptions))
  })
})
