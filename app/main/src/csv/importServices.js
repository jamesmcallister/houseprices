import csvtojson from 'csvtojson'
import importFileBuilder from './importFileBuilder.js'

export const importFile = importDataPath => importFileBuilder(csvtojson())(importDataPath)
