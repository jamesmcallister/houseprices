import config from '../src/config/config.js'
import logger from '../src/helpers/logger'
import {
  promiseWrite,
  promiseQuery,
  promiseDeleteDatabase,
  promiseDatabase
} from '../src/influx/influxServices'

import { expect, assert } from 'chai'
describe('Database Write and Read', () => {
  it('Returns a list that does not include a deleted name and includes a name when created', () => {
    return promiseDeleteDatabase()
      .then(promiseDatabase)
      .then(() =>
        promiseWrite([
          {
            measurement: 'response_times',
            tags: { host: 'testHost' },
            fields: {
              price: '600',
              date: 2021,
              postcode: 'ct11aa',
              city: 'canterbury',
              county: 'kent'
            }
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
        const { price, date, city, path, time } = response[0]
        const timeFromDataBase = Number(time.getNanoTime())
        const currentTimeLess60 = Date.now() * 1000000
        const timeDiff = 60000000

        expect(price).to.equal(600)
        expect(date).to.equal('2021')
        expect(city).to.equal('canterbury')
        assert.closeTo(timeFromDataBase, currentTimeLess60, timeDiff)
      })
      .catch(error => logger.error(__filename, error))
  })
})
