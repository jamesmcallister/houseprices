import { promiseReadDataBuilder } from '../src/promiseReadMetric.js'
import { expect } from 'chai'
import sinon, { spy } from 'sinon'

describe('Promise Read Database', () => {
  it('Calls the influx with fake host name', () => {
    const fakeinfluxDbHost = 'fakeinfluxDbHost'
    const fakeGetDatabaseClient = sinon.stub().returns(Promise.resolve([]))
    return promiseReadDataBuilder(fakeGetDatabaseClient)(
      fakeinfluxDbHost
    ).then(() => {
      expect(fakeGetDatabaseClient.called).true
      expect(fakeGetDatabaseClient.calledWith(fakeinfluxDbHost)).true
    })
  })
})
