import { promiseCreateDatabaseBuilder } from './promiseCreateDatabase'
export const promiseDatabaseBuilder = influxClient => promiseDatabaseNames => databaseName =>
  promiseDatabaseNames(databaseName).then(names => {
    if (!names.includes(databaseName)) {
      // console.log('Creating database')
      return promiseCreateDatabaseBuilder(influxClient)(databaseName)
    }
  })
export default () => {
  const promiseDatabaseNames = require('./promiseDatabaseNames').default
  const influxClient = require('./influxClient').default()
  const config = require('./config').default
  return promiseDatabaseBuilder(influxClient)(promiseDatabaseNames)(
    config.databaseName
  )
}
