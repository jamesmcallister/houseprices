import promiseDeleteDatabaseBuilder from '../../src/influx/promiseDeleteDatabaseBuilder'
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
      return
      expect(fakeDropDatabase.called).toBe(true)
      expect(fakeDropDatabase.calledWith(testDatabaseName)).toBe(true)
    })
  })
})
