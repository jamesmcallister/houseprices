import promiseWriteDataBuilder from '../src/influx/promiseWriteBuilder.js'
import { expect } from 'chai'
import { spy, stub } from 'sinon'

describe('Promise Write Database', () => {
  it('Test writes to Database', () => {
    const fakeinfluxDbHost = 'fakeinfluxDbHost'
    const fakeGetDatabaseClient = stub().returns(Promise.resolve([]))
    const fakeWritePoint = () => {}
    return promiseWriteDataBuilder(fakeGetDatabaseClient)(fakeinfluxDbHost)(
      fakeWritePoint
    )([]).then(() => {
      expect(fakeGetDatabaseClient.called).true
      expect(fakeGetDatabaseClient.calledWith(fakeinfluxDbHost)).true
    })
  })
})
