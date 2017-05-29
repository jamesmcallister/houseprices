import logger from '../helpers/logger'

export default promiseDatabaseNames => promiseCreateDatabase => databaseName =>
  promiseDatabaseNames(databaseName).then(names => {
    if (!names.includes(databaseName)) {
      logger.log(`Create '${databaseName}'`)
      return promiseCreateDatabase(databaseName)
    } else {
      logger.log(`Database exists '${databaseName}'`)
      return Promise.resolve('')
    }
  })
