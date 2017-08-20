import logger from '../src/helpers/logger'
import promiseDatabase from './influx/promiseDatabaseBuilder'
import promiseDeleteDatabaseBuilder from './influx/promiseDeleteDatabaseBuilder'
import promiseWriteBuilder from './influx/promiseWriteBuilder.js'
import promiseQueryBuilder from './influx/promiseQueryBuilder.js'

promiseDeleteDatabaseBuilder()
  .then(promiseDatabase)
  .then(promiseWriteData)
  .then(promiseQueryBuilder)
  .catch(logger.error)
