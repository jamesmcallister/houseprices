import {promiseDeleteDatabaseBuilder} from "../src/promiseDeleteDatabase";
import {expect} from "chai";
import sinon from "sinon";
describe('Promise Create Database', () => {
    const testDatabaseName = "promiseCreateDatabaseTest";
    it("Calls the influx createDatabase", () => {
        const fakeDropDatabase = sinon.stub().returns(Promise.resolve(""))
        const fakeInfluxClient = {
            dropDatabase : fakeDropDatabase
        }
        return promiseDeleteDatabaseBuilder(fakeInfluxClient)(testDatabaseName).then(() => {
            expect(fakeDropDatabase.called).true
            expect(fakeDropDatabase.calledWith(testDatabaseName)).true
        })
    })

})