const Influx = require('influx')
export default influxDbHost => databaseName => schema =>
  new Influx.InfluxDB({
    host: influxDbHost,
    database: databaseName,
    schema: schema
  })
