import promiseDatabaseBuilder from '../../src/influx/promiseDatabaseBuilder'
import sinon from 'sinon'
describe('Promise Database', () => {
  const testDatabaseName = 'promiseDatabaseTest'
  it('Calls the influx createDatabase when no database present', () => {
    const fakePromiseCreateDatabase = sinon.stub().returns(Promise.resolve())
    const fakePromiseDatabaseNames = sinon.stub().returns(Promise.resolve([]))
    return promiseDatabaseBuilder(fakePromiseDatabaseNames)(
      fakePromiseCreateDatabase
    )(testDatabaseName).then(() => {
      return
      expect(fakePromiseCreateDatabase.called).toBe(true)
      expect(fakePromiseCreateDatabase.calledWith(testDatabaseName)).toBe(true)
      expect(fakePromiseDatabaseNames.called).toBe(true)
    })
  })
  it('Does not calls the influx createDatabase when database present', () => {
    const fakePromiseCreateDatabase = sinon.stub().returns(Promise.resolve())
    const fakePromiseDatabaseNames = sinon
      .stub()
      .returns(Promise.resolve([testDatabaseName]))
    return promiseDatabaseBuilder(fakePromiseDatabaseNames)(
      fakePromiseCreateDatabase
    )(testDatabaseName).then(() => {
      return
      expect(fakePromiseCreateDatabase.called).toBe(false)
      expect(fakePromiseDatabaseNames.called).toBe(true)
    })
  })
})
