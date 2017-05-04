import {promiseDatabaseNamesBuilder} from "../src/promiseDatabaseNames";
import {expect} from "chai";
import sinon from "sinon";
describe('Promise Create Database', () => {
    const testDatabaseName = "promiseDatabaseNamesTest";
    it("Calls the influx createDatabase", () => {
        const fakeGetDatabaseNames = sinon.stub().returns(Promise.resolve([]))
        const fakeInfluxClient = {
            getDatabaseNames: fakeGetDatabaseNames
        }
        return promiseDatabaseNamesBuilder(fakeInfluxClient).then(() => {
            expect(fakeGetDatabaseNames.called).true
        })
    })

})