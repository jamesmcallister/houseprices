import config from '../config/config'
import logger from '../../src/helpers/logger'
import influxClientBuilder from '../../src/influx/influxClientBuilder'
import promiseCreateDatabaseBuilder
  from '../../src/influx/promiseCreateDatabaseBuilder'
import promiseDatabaseBuilder from '../../src/influx/promiseDatabaseBuilder'
import promiseDatabaseNamesBuilder
  from '../../src/influx/promiseDatabaseNamesBuilder'
import promiseDeleteDatabaseBuilder
  from '../../src/influx/promiseDeleteDatabaseBuilder'
import promiseQueryBuilder from '../../src/influx/promiseQueryBuilder'
import promiseWriteBuilder from '../../src/influx/promiseWriteBuilder'

const influxClientForDefaultDatabaseAndSchema = influxClientBuilder(
  config.influxDbHost
)(config.databaseName)(config.schema)(config.port)

export const promiseCreateDatabase = () => {
  logger.info('promiseCreateDatabase()')
  promiseCreateDatabaseBuilder(influxClientForDefaultDatabaseAndSchema)(
    config.databaseName
  )
}

export const promiseDatabaseNames = () =>
  promiseDatabaseNamesBuilder(influxClientForDefaultDatabaseAndSchema)

export const promiseDatabase = () =>
  promiseDatabaseBuilder(promiseDatabaseNames)(promiseCreateDatabase)(
    config.databaseName
  )

export const promiseDeleteDatabase = () => {
  logger.info('promiseDeleteDatabase()')
  promiseDeleteDatabaseBuilder(influxClientForDefaultDatabaseAndSchema)(
    config.databaseName
  )
}

export const promiseQuery = query =>
  promiseQueryBuilder(influxClientForDefaultDatabaseAndSchema)(query)

export const promiseWrite = writePoints => {
  logger.info('promiseWrite()')
  promiseWriteBuilder(influxClientForDefaultDatabaseAndSchema)(writePoints)
}
