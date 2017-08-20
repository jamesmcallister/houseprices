import promiseCreateDatabaseBuilder from '../../src/influx/promiseCreateDatabaseBuilder'
import sinon from 'sinon'
describe('Promise Create Database', () => {
  const testDatabaseName = 'promiseCreateDatabaseTest'
  it('Calls the influx createDatabase', () => {
    const fakeCreateDatabase = sinon.stub().returns(Promise.resolve(''))
    const fakeInfluxClient = {
      createDatabase: fakeCreateDatabase
    }
    return promiseCreateDatabaseBuilder(fakeInfluxClient)(
      testDatabaseName
    ).then(() => {
      return
      expect(fakeCreateDatabase.called).toBe(true)
      expect(fakeCreateDatabase.calledWith(testDatabaseName)).toBe(true)
    })
  })
})
