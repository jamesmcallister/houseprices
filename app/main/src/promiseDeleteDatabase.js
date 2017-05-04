export const promiseDeleteDatabaseBuilder =  influxClient => name => influxClient.dropDatabase(name);
let promiseDeleteDatabaseFunction = null;
export default () => {
    let config = require('./config');
    console.log(config)
    const databaseName = config.default.databaseName
    console.log(databaseName)
    if(promiseDeleteDatabaseFunction == null) {
        const influxClient = require('./influxClient').default();
        promiseDeleteDatabaseFunction = promiseDeleteDatabaseBuilder(influxClient)
        return promiseDeleteDatabaseFunction(databaseName)
    }
    else {
        return promiseDeleteDatabaseFunction(databaseName)
    }
}