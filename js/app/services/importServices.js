import csvtojson from 'csvtojson'
import importFileBuilder from '../../src/csv/importFileBuilder'
import importStreamBuilder from '../../src/csv/importStreamBuilder'

export const importFile = options => importDataPath =>
  importFileBuilder(csvtojson)(options)(importDataPath)

export const importStream = options => importDataPath =>
  importStreamBuilder(csvtojson)(options)(importDataPath)
