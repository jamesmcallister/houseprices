import config from '../src/config/config.js'
import logger from '../helpers/logger'

import {
  promiseDatabase,
  promiseDatabaseNames,
  promiseDeleteDatabase
} from '../src/influx/influxServices'
import { expect } from 'chai'
describe('Database Names', () => {
  it('Returns a list that does not include a deleted name and includes a name when created', () => {
    return promiseDeleteDatabase()
      .then(promiseDatabaseNames)
      .then(names => {
        logger.info('debug', names)
        expect(names).not.includes(config.databaseName)
      })
      .then(() => promiseDatabase())
      .then(promiseDatabaseNames)
      .then(names => expect(names).includes(config.databaseName))
  })
})
