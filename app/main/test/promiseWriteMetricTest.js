import { promiseWriteDataBuilder } from '../src/promiseWriteMetric.js'
import { expect } from 'chai'
import sinon, { spy } from 'sinon'

describe('Promise Write Database', () => {
  it('Test writes to Database', () => {
    const fakeinfluxDbHost = 'fakeinfluxDbHost'
    const fakeGetDatabaseClient = sinon.stub().returns(Promise.resolve([]))
    return promiseWriteDataBuilder(fakeGetDatabaseClient)(
      fakeinfluxDbHost
    ).then(() => {
      expect(fakeGetDatabaseClient.called).true
      expect(fakeGetDatabaseClient.calledWith(fakeinfluxDbHost)).true
    })
  })
})
