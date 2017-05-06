import promiseDatabaseBuilder from "../src/influx/promiseDatabaseBuilder";
import {expect} from "chai";
import sinon from "sinon";
describe('Promise Database', () => {
    const testDatabaseName = 'promiseDatabaseTest'
    it('Calls the influx createDatabase when no database present', () => {
        const fakePromiseCreateDatabase = sinon.stub().returns(Promise.resolve())
        const fakePromiseDatabaseNames = sinon.stub().returns(Promise.resolve([]))
        return promiseDatabaseBuilder(fakePromiseDatabaseNames)(fakePromiseCreateDatabase)(testDatabaseName).then(() => {
            expect(fakePromiseCreateDatabase.called).true
            expect(fakePromiseCreateDatabase.calledWith(testDatabaseName)).true
            expect(fakePromiseDatabaseNames.called).true
        })
    })
    it('Does not calls the influx createDatabase when database present', () => {
        const fakePromiseCreateDatabase = sinon.stub().returns(Promise.resolve())
        const fakePromiseDatabaseNames = sinon.stub().returns(
            Promise.resolve([testDatabaseName])
        )
        return promiseDatabaseBuilder(fakePromiseDatabaseNames)(fakePromiseCreateDatabase)(testDatabaseName).then(() => {
            expect(fakePromiseCreateDatabase.called).false
            expect(fakePromiseDatabaseNames.called).true
        })
    })
})
