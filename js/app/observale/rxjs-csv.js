import { Observable } from 'rxjs/Rx'
import fs from 'fs'
import csv from 'csv-parse'
import fromStream from './rxjs-from-stream'

import { csvOptions } from '../../src/csv/csvImportOptions'
import importStream from '../../src/csv/importStreamBuilder'

const csvparser = fileToStream =>
  importStream(csvOptions)(fileToStream)
    .on('json', result => writeToInflux(result))
    .on('error', err => logger.error('importStream()', err))

const parse = (file, csvParserOptions) =>
  new Observable(observer => {
    const parser = csvparser()
    const lines = fromStream(fs.createReadStream(file).pipe(parser))
    return lines.subscribe(observer)
  })

export default parse

console.log(parse())
