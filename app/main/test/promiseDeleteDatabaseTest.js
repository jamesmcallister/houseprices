import promiseDeleteDatabaseBuilder from '../src/influx/promiseDeleteDatabaseBuilder'
import { expect } from 'chai'
import sinon from 'sinon'
describe('Promise Delete Database', () => {
  const testDatabaseName = 'promiseCreateDatabaseTest'
  it('Calls the influx deleteDatabase', () => {
    const fakeDropDatabase = sinon.stub().returns(Promise.resolve(''))
    const fakeInfluxClient = {
      dropDatabase: fakeDropDatabase
    }
    return promiseDeleteDatabaseBuilder(fakeInfluxClient)(
      testDatabaseName
    ).then(() => {
      expect(fakeDropDatabase.called).true
      expect(fakeDropDatabase.calledWith(testDatabaseName)).true
    })
  })
})
