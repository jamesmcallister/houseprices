import config from '../config/config'
import influxClientBuilder from './influxClientBuilder'
import promiseCreateDatabaseBuilder from './promiseCreateDatabaseBuilder'
import promiseDatabaseBuilder from './promiseDatabaseBuilder'
import promiseDatabaseNamesBuilder from './promiseDatabaseNamesBuilder'
import promiseDeleteDatabaseBuilder from './promiseDeleteDatabaseBuilder'
import promiseQueryBuilder from './promiseQueryBuilder'
import promiseWriteBuilder from './promiseWriteBuilder'

const influxClientForDefaultDatabaseAndSchema = influxClientBuilder(
  config.influxDbHost
)(config.databaseName)(config.schema)

export const promiseCreateDatabase = () =>
  promiseCreateDatabaseBuilder(influxClientForDefaultDatabaseAndSchema)(
    config.databaseName
  )

export const promiseDatabaseNames = () =>
  promiseDatabaseNamesBuilder(influxClientForDefaultDatabaseAndSchema)

export const promiseDatabase = () =>
  promiseDatabaseBuilder(promiseDatabaseNames)(promiseCreateDatabase)(
    config.databaseName
  )

export const promiseDeleteDatabase = () =>
  promiseDeleteDatabaseBuilder(influxClientForDefaultDatabaseAndSchema)(
    config.databaseName
  )

export const promiseQuery = query =>
  promiseQueryBuilder(influxClientForDefaultDatabaseAndSchema)(query)

// added this, as it was missing
export const promiseWrite = writePoints =>
  promiseWriteBuilder(influxClientForDefaultDatabaseAndSchema)(writePoints)
