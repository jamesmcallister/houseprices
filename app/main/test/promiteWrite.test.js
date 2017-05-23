import promiseWriteDataBuilder from '../src/influx/promiseWriteBuilder.js'
import { spy, stub } from 'sinon'

describe('Promise Write Database', () => {
  it('Test writes to Database', () => {
    const config = '../src/config/config.js'
    const fakeWritePointData = [
      {
        measurement: 'response_times_2',
        tags: { host: config.influxDbHost },
        fields: { duration: 123, path: 'testpath' }
      }
    ]
    const fakeinfluxDbHost = 'fakeinfluxDbHost'
    const fakeGetDatabaseClient = stub().returns(Promise.resolve([]))
    const fakeWritePoint = {
      writePoints: fakeGetDatabaseClient
    }
    return promiseWriteDataBuilder(fakeWritePoint)(
      fakeWritePointData
    ).then(() => {
      expect(fakeGetDatabaseClient.called).toBe(true)
      expect(fakeGetDatabaseClient.calledWith(fakeWritePointData)).toBe(true)
    });
  })
})
