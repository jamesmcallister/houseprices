import { expect } from 'chai'

describe('Server', () => {
  it(`Server is running ${process.env.INFLUXDB_HOST}`, () => {
    expect(process.env.INFLUXDB_HOST).not.to.be.null
    expect(process.env.INFLUXDB_HOST).ok
  })
})
