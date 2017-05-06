import config from "../config";
import influxClientBuilder from "./influxClientBuilder";
import promiseCreateDatabaseBuilder from "./promiseCreateDatabaseBuilder";
import promiseDatabaseBuilder from "./promiseDatabaseBuilder";
import promiseDatabaseNamesBuilder from "./promiseDatabaseNamesBuilder";
import promiseDeleteDatabaseBuilder from "./promiseDeleteDatabaseBuilder";
import promiseQueryBuilder from "./promiseQueryBuilder";
import promiseWriteBuilder from "./promiseWriteBuilder";
const databaseName = config.databaseName;
const influxClientForDefaultDatabaseAndSchema = influxClientBuilder(config.influxDbHost)(databaseName)(config.schema);

export const promiseCreateDatabase = () =>  promiseCreateDatabaseBuilder(influxClientForDefaultDatabaseAndSchema)(databaseName);
export const promiseDatabaseNames = () => promiseDatabaseNamesBuilder(influxClientForDefaultDatabaseAndSchema);
export const promiseDatabase = () => promiseDatabaseBuilder(promiseDatabaseNames)(promiseCreateDatabase)(databaseName)
export const promiseDeleteDatabase = () => promiseDeleteDatabaseBuilder(influxClientForDefaultDatabaseAndSchema)(databaseName)
export const promiseQuery = query => promiseQueryBuilder(influxClientForDefaultDatabaseAndSchema)(query)
export const promiseWrite = writePoints => promiseWriteBuilder(influxClientForDefaultDatabaseAndSchema)(writePoints)
