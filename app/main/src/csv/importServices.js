import csvtojson from 'csvtojson'
import importFileBuilder from './importFileBuilder'

export const importFile = options => importDataPath =>
  importFileBuilder(csvtojson)(options)(importDataPath)
