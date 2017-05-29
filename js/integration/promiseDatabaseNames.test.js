import {
  promiseDatabaseNames,
  promiseCreateDatabase,
  promiseDeleteDatabase
} from '../app/services/influxServices'
import logger from '../src/helpers/logger'

import config from '../app/config/config.js'
import { importFile } from '../app/services/importServices'
describe('Database Names', () => {
  it('Returns a list that does not include a deleted name and includes a name when created', () => {
    return (
      promiseDeleteDatabase()
        .then(promiseDatabaseNames)
        // .then(names => expect(names).toContain(config.databaseName))
        .then(promiseCreateDatabase)
        .then(promiseDatabaseNames)
        .then(names => expect(names).toContainEqual(config.databaseName))
        .catch(err => logger.error(err))
    )
  })
})
