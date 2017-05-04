export const promiseDatabaseNamesBuilder = influxClient => influxClient.getDatabaseNames();
export default () => {
    const influxClient = require('./influxClient').default()
    return promiseDatabaseNamesBuilder(influxClient)
}
