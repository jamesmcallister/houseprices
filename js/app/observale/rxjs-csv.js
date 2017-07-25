// https://gist.github.com/bjoerge/9e88a877a0633705b728
import { Observable } from 'rxjs/Rx'
import fs from 'fs'
import csv from 'csv-parse'
import fromStream from './rxjs-from-stream'

import { csvOptions } from '../../src/csv/csvImportOptions'
import importStream from '../../src/csv/importStreamBuilder'

// const parse = (file, csvParserOptions) =>
//   new Observable(observer => {
//     const parser = csv(csvParserOptions)
//     const lines = fromStream(fs.createReadStream(file).pipe(parser))
//     lines.subscribe(observer)
//     return lines
//   })

// export default parse

// importStream(csvOptions)(fileToStream)
//   .on('json', result => writeToInflux(result))
//   .on('error', err => logger.error('importStream()', err))

const csvparser = fileToStream =>
  importStream(csvOptions)(fileToStream)
    .on('json', result => writeToInflux(result))
    .on('error', err => logger.error('importStream()', err))

const parse = (file, csvParserOptions) =>
  new Observable(observer => {
    const parser = csvparser()
    const lines = fromStream(fs.createReadStream(file).pipe(parser))
    lines.subscribe(observer)
    return lines
  })

export default parse
