import fs from 'fs'
import config from '../app/config/config'
const existsSync = filePath => {
  try {
    fs.statSync(filePath)
  } catch (err) {
    if (err.code == 'ENOENT') {
      return false
    }
  }
  return true
}

describe('Local dev setup', () => {
  it(`Server is running ${process.env.INFLUXDB_HOST}`, () => {
    expect(process.env.INFLUXDB_HOST).not.toBeNull()
  })
  it(`${config.importDataPath}`, () => {
    const file = existsSync(config.importDataPath)
    expect(file).toBe(true)
  })
})
