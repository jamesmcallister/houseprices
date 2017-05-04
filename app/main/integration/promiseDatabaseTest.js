import config from '../src/config'
import promiseDatabase from "../src/promiseDatabase";
import promiseDatabaseNames from "../src/promiseDatabaseNames";
import promiseDeleteDatabase from "../src/promiseDeleteDatabase";
import {expect} from "chai";
describe('Database Names', () => {
    it("Returns a list that does not include a deleted name and includes a name when created", () => {
        return promiseDeleteDatabase()
            .then(promiseDatabaseNames)
            .then(names => {
                console.log(names)
                expect(names).not.includes(config.databaseName)
            })
            .then(() => promiseDatabase())
            .then(promiseDatabaseNames)
            .then(names => expect(names).includes(config.databaseName))
    })
})