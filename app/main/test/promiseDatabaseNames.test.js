import promiseDatabaseNamesBuilder
  from '../src/influx/promiseDatabaseNamesBuilder'

import sinon from 'sinon'
describe('Promise Database Names', () => {
  const testDatabaseName = 'promiseDatabaseNamesTest'
  it('Calls the promiseDatabaseName', () => {
    const fakeGetDatabaseNames = sinon.stub().returns(Promise.resolve([]))
    const fakeInfluxClient = {
      getDatabaseNames: fakeGetDatabaseNames
    }
    return promiseDatabaseNamesBuilder(fakeInfluxClient).then(() => {
      expect(fakeGetDatabaseNames.called).toBe(true)
    })
  })
})
