import {promiseCreateDatabaseBuilder} from "../src/promiseCreateDatabase";
import {expect} from "chai";
import sinon from "sinon";
describe('Promise Create Database', () => {
    const testDatabaseName = "promiseCreateDatabaseTest";
    it("Calls the influx createDatabase", () => {
        const fakeCreateDatabase = sinon.stub().returns(Promise.resolve(""))
        const fakeInfluxClient = {
            createDatabase : fakeCreateDatabase
        }
        return promiseCreateDatabaseBuilder(fakeInfluxClient)(testDatabaseName).then(() => {
            expect(fakeCreateDatabase.called).true
            expect(fakeCreateDatabase.calledWith(testDatabaseName)).true
        })
    })

})