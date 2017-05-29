import config from '../config/config'
import influxClientBuilder from '../../src/influx/influxClientBuilder'
import promiseCreateDatabaseBuilder from '../../src/influx/promiseCreateDatabaseBuilder'
import promiseDatabaseBuilder from '../../src/influx/promiseDatabaseBuilder'
import promiseDatabaseNamesBuilder from '../../src/influx/promiseDatabaseNamesBuilder'
import promiseDeleteDatabaseBuilder from '../../src/influx/promiseDeleteDatabaseBuilder'
import promiseQueryBuilder from '../../src/influx/promiseQueryBuilder'
import promiseWriteBuilder from '../../src/influx/promiseWriteBuilder'

const influxClientForDefaultDatabaseAndSchema = influxClientBuilder(
  config.influxDbHost
)(config.databaseName)(config.schema)(config.port)

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
