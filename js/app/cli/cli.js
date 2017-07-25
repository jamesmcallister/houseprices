import logger from '../../src/helpers/logger'
import { tryCatch } from '../../src/helpers/either'
import cliFunction from './cliFunction'
import config from '../config/config'

import program from 'command'

const [, , fileName, databaseName, schema] = process.argv

const result = cliFunction(fileName ? fileName : config.importDataPath)(
  databaseName ? databaseName : config.databaseName
)(schema ? schema : {})

logger.warn('cli.js', result)
