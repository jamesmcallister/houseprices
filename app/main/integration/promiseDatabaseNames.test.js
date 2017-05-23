import {
  promiseDatabaseNames,
  promiseCreateDatabase,
  promiseDeleteDatabase
} from '../src/influx/influxServices'
import logger, { getFilename } from '../src/helpers/logger'
import { expect } from 'chai'
import config from '../src/config/config.js'
import { importFile } from '../src/csv/importServices'
describe('Database Names', () => {
  it('Returns a list that does not include a deleted name and includes a name when created', () => {
    return promiseDeleteDatabase()
      .then(promiseDatabaseNames)
      .then(names => expect(names).not.includes(config.databaseName))
      .then(promiseCreateDatabase)
      .then(promiseDatabaseNames)
      .then(names => expect(names).includes(config.databaseName))
      .catch(error => logger.error(getFilename, error))
  })
})
