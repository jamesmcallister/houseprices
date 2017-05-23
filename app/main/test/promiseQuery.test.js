import promiseQueryBuilder from '../src/influx/promiseQueryBuilder.js'
import sinon, { spy } from 'sinon'
import config from '../src/config/config.js'
import { escape } from 'influx'

describe('Promise Read Database', () => {
  it('Calls the influx with fake query', () => {
    const fakeQuery = `
      select * from response_times_2
      where host = ${escape.stringLit(config.influxDbHost)}
      order by time desc
      limit`

    const fakeinfluxDbHost = 'fakeinfluxDbHost'
    const fakeGetDatabaseClient = sinon.stub().returns(Promise.resolve([]))

    const fakeInfluxClient = {
      query: fakeGetDatabaseClient
    }
    return promiseQueryBuilder(fakeInfluxClient)(fakeQuery).then(() => {
      expect(fakeGetDatabaseClient.called).toBe(true)
    })
  })
})
