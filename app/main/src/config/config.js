import schema from './schema.js'
export default {
  influxDbHost: process.env.INFLUXDB_HOST,
  databaseName: 'testit',
  schema: schema
}
