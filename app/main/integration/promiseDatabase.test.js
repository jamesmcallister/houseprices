import config from '../src/config/config.js'
import logger from '../src/helpers/logger'

import {
  promiseDatabase,
  promiseDatabaseNames,
  promiseDeleteDatabase
} from '../src/influx/influxServices'

describe('Database', () => {
  it('Returns a list that does not include a deleted name and includes a name when created', () => {
    return promiseDeleteDatabase()
      .then(promiseDatabaseNames)
      .then(names => expect(names).not.toContain(config.databaseName))
      .then(() => promiseDatabase())
      .then(promiseDatabaseNames)
      .then(names => expect(names).toContainEqual(config.databaseName))
      .then(promiseDeleteDatabase())
      .catch(err => logger.error(err))
  })
})
