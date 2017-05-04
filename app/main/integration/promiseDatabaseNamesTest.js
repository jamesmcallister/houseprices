import promiseDatabaseNames from "../src/promiseDatabaseNames";
import promiseCreateDatabase from "../src/promiseCreateDatabase";
import promiseDeleteDatabase from "../src/promiseDeleteDatabase";
import {expect} from "chai";
import config from '../src/config'
describe('Database Names', () => {
    it("Returns a list that does not include a deleted name and includes a name when created", () => {
        return promiseDeleteDatabase()
            .then(promiseDatabaseNames)
            .then(names => expect(names).not.includes(config.databaseName))
            .then(() => promiseCreateDatabase())
            .then(promiseDatabaseNames)
            .then(names => expect(names).includes(config.databaseName))
    })
})