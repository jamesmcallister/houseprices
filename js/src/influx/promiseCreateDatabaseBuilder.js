import logger from '../helpers/logger'

export default influxClient => name =>
  influxClient
    .createDatabase(name)
    .catch(err => logger.warn('promissCreateDataBaseBuilder', err))
