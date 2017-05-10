import { importFile } from '../src/csv/importServices.js'
import { expect } from 'chai'
import config from '../src/config/config.js'

describe('Lets import a file', () => {
  it('should import a csv file', () => {
    return importFile(config.importDataPath)
  })
})
