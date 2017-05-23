import logger from '../../helpers/logger'

export default promiseDatabaseNames => promiseCreateDatabase => databaseName =>
  promiseDatabaseNames(databaseName).then(names => {
    if (!names.includes(databaseName)) {
      logger.info('debug', `Create ${databaseName}`)
      return promiseCreateDatabase(databaseName)
    } else {
      logger.info('debug', 'Database exists')
      return Promise.resolve('')
    }
  })
