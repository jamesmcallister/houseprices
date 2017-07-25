#!/usr/bin/env node

import logger from '../../src/helpers/logger'
import program from 'commander'
import colors from 'colors'
import cliFunction from './cliFunction'
import config from '../config/config'

const definitions = {
  file: config.importDataPath ? config.importDataPath : 'default-cli.csv',
  database: config.databaseName ? config.databaseName : 'default-cli-name',
  schema: config.schema ? config.schema : {}
}

program
  .version('0.0.1')
  .option(
    '-f, --file <file>',
    `file to process or default setting '${colors.green(definitions.file)}'`,
    definitions.file
  )
  .option(
    '-d, --database <database>',
    `database name or default setting '${colors.green(definitions.database)}'`,
    definitions.database
  )
  .option(
    '-s, --schema <schema>',
    `schema or default setting '${colors.green(definitions.schema)}'`,
    definitions.schema
  )
  .parse(process.argv)

logger.warn(`${colors.grey(`
    Running with defaults.
    To use this file follow the help with '-h'`)}

    ${colors.yellow(`Processing:-`)}
    ${colors.green(`
      ${program.file}
      ${program.database}
      ${program.schema}`)}
  `)

cliFunction(program.file)(program.database)(program.schema)
