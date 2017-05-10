import csvtojson from 'csvtojson'
import importFileBuilder from './importFileBuilder.js'

export const importFile = options => importDataPath =>
  importFileBuilder(csvtojson(options))(importDataPath)
