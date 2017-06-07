import schema from '../../config/schema'
export default {
  influxDbHost: process.env.INFLUXDB_HOST,
  port: process.env.INFLUXDB_PORT,
  databaseName: 'testit',
  schema: schema,
  importDataPath: process.env.INGEST_PATH
}
