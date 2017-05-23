import schema from './schema.js'
export default {
  influxDbHost: process.env.INFLUXDB_HOST,
  databaseName: 'testitLarge',
  schema: schema,
  importDataPath: '/var/houseprices/data/pp.csv'
}
