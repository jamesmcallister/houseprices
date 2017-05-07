import config from '../src/config'
import {
  promiseWrite,
  promiseQuery,
  promiseDeleteDatabase,
  promiseDatabase
} from '../src/influx/influxServices'

import { expect, assert } from 'chai'
describe('Database Names', () => {
  it('Returns a list that does not include a deleted name and includes a name when created', () => {
    return promiseDeleteDatabase()
      .then(promiseDatabase)
      .then(() =>
        promiseWrite([
          {
            measurement: 'response_times',
            tags: { host: 'testHost' },
            fields: { duration: '12', path: './' }
          }
        ])
      )
      .then(() =>
        promiseQuery(
          `select * from response_times
            where host = 'testHost'
            order by time desc
            limit 10 `
        )
      )
      .then(response => {
        const { time, duration, host, path } = response[0]
        const timeFromDataBase = Number(time.getNanoTime())
        const currentTimeLess60 = Date.now() * 1000000
        const timeDiff = 60000000

        expect(host).to.equal('testHost')
        expect(path).to.equal('./')
        expect(duration).to.equal(12)
        assert.closeTo(timeFromDataBase, currentTimeLess60, timeDiff)
      })
  })
})
