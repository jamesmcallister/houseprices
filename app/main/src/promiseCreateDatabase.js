export const promiseCreateDatabaseBuilder = influxClient => name => {
    return influxClient.createDatabase(name)
}
let promiseCreateDatabase = null
export default () => {
    const config = require("./config").default
    if (promiseCreateDatabase == null) {
        const influxClient = require('./influxClient').default()
        promiseCreateDatabase = promiseCreateDatabaseBuilder(influxClient);
        return promiseCreateDatabase(config.databaseName)
    }
    else {
        return promiseCreateDatabase(config.databaseName)
    }

}