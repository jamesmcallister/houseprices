import logger from '../../src/helpers/logger'
import cliFunction from './cliFunction'
import {
  csvOptions,
  headerOptions,
  ingnoreColumns,
  includedColumns
} from '../../src/csv/csvImportOptions'
import config from '../config/config'

describe('import file from file system', () => {
  it('does stuff', () => {
    logger.warn(
      'cliFunction',
      cliFunction('test.csv')(config.databaseName)(csvOptions)
    )
  })
})

// describe('push file though to influx', () => {
//   it('does stuff', () => {
//     logger.warn(cliFunction('test.csv')(config.databaseName)(csvOptions))
//   })
// })

// describe('read data from influx with max price', () => {
//   it('does stuff', () => {
//     logger.warn(cliFunction('test.csv')(config.databaseName)(csvOptions))
//   })
// })
