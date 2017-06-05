const Influx = require('influx')
export default influxDbHost => databaseName => schema => port => {
  return new Influx.InfluxDB({
    host: influxDbHost,
    database: databaseName,
    schema: schema,
    port: port
  })
}
