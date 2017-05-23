import config from '../src/config/config.js'
import logger from '../src/helpers/logger'
import {
  promiseWrite,
  promiseQuery,
  promiseDeleteDatabase,
  promiseDatabase
} from '../src/influx/influxServices'
import { assert } from 'chai'

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
              postcode: 'lu22lu',
              city: 'somecity',
              county: 'county'
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

        expect(price).toBe(600)
        expect(date).toBe('2021')
        expect(city).toBe('somecity')
        assert.closeTo(timeFromDataBase, currentTimeLess60, timeDiff)
      })
    // .then(promiseDeleteDatabase())
    // .catch(error => logger.error('ahhhh', error))
  })
})
