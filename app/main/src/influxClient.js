const Influx = require('influx')

export const influxClientBuilder = influxDbHost => databaseName => schema =>
  new Influx.InfluxDB({
    host: influxDbHost,
    database: databaseName,
    schema: schema
  })
let influxClient = null
export default () => {
  const config = require('./config').default
  if (influxClient == null) {
    console.log('Creating influx client')
    influxClient = influxClientBuilder(config.influxDbHost)(
      config.databaseName
    )(config.schema)
    return influxClient
  } else {
    return influxClient
  }
}
export const getDatabaseNames = () => {}
