import csvtojson from 'csvtojson'
import importFileBuilder from '../../src/csv/importFileBuilder'

export const importFile = options => importDataPath =>
  importFileBuilder(csvtojson)(options)(importDataPath)
