import logger from '../../../src/helpers/logger'
import { tryCatch } from '../../../src/helpers/either'
import cliFunction from './cliFunction'
import config from './cli.config'

const [, , fileName, databaseName, options] = process.argv

cliFunction(fileName)(databaseName)(options)

logger.warn(cliFunction(fileName)(databaseName)(options))

const result = datain => {
  tryCatch(datain)
}

logger.warn(result(options))
