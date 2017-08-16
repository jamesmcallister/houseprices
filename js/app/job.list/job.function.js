import {
  importStream,
  importFile,
  importString
} from '../../app/services/importServices'
import { csvOptions } from '../../src/csv/csvImportOptions'
import {
  promiseDeleteDatabase,
  promiseCreateDatabase
} from '../../app/services/influxServices'
import { writeToInflux, printShitOut, readFromInflux } from './functions'
import { createReadStream } from 'fs'
import { listOfQuerys } from './listOfQuerys'
import Rx, { Observable } from 'rxjs'
import 'rx-from-csv'
import csvparse from 'csv-parse'
import logger from '../../src/helpers/logger'

const fileLoaction = __dirname + '/pp.csv'
const fileStreamLoaction = createReadStream(__dirname + '/pp.csv', 'utf-8')

export default () => {}

promiseDeleteDatabase()
promiseCreateDatabase()

const csvread = () =>
  importStream(csvOptions)(fileStreamLoaction).on('json', x => x)

const buffer = Observable.of(csvread()).bufferCount(10, 2)

buffer.subscribe(x => writeToInflux(x).catch(err => logger.eroor(err)))
// console.log(csvread())

// const numbers = Observable.interval(1000).bufferCount(2, 1)

// numbers.subscribe(x => console.log(x))
