import { promiseDatabaseBuilder } from '../src/promiseDatabase'
import { expect } from 'chai'
import sinon from 'sinon'
describe('Promise Database', () => {
  const testDatabaseName = 'promiseDatabaseTest'
  it('Calls the influx createDatabase when no database present', () => {
    const fakeCreateDatabase = sinon.spy()
    const fakeInfluxClient = {
      createDatabase: fakeCreateDatabase
    }
    const promiseDatabaseNames = sinon.stub().returns(Promise.resolve([]))
    return promiseDatabaseBuilder(fakeInfluxClient)(promiseDatabaseNames)(
      testDatabaseName
    ).then(promisedDatabase => {
      expect(fakeCreateDatabase.called).true
      expect(fakeCreateDatabase.calledWith(testDatabaseName)).true
      expect(promiseDatabaseNames.called).true
    })
  })
  it('Calls the influx createDatabase when no database present', () => {
    const fakeCreateDatabase = sinon.spy()
    const fakeInfluxClient = {
      createDatabase: fakeCreateDatabase
    }
    const promiseDatabaseNames = sinon
      .stub()
      .returns(Promise.resolve([testDatabaseName]))
    return promiseDatabaseBuilder(fakeInfluxClient)(promiseDatabaseNames)(
      testDatabaseName
    ).then(promisedDatabase => {
      expect(fakeCreateDatabase.called).false
      expect(promiseDatabaseNames.called).true
    })
  })
})
