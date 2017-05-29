import logger from '../helpers/logger'

export default influxClient => writePoints =>
  influxClient
    .writePoints(writePoints)
    .catch(e => logger.error('promissWriteBuilder()', e))
