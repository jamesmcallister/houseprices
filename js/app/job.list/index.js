import logger from '../../src/helpers/logger'
import jobFunction from './job.function'
import { listOfQuerys } from './listOfQuerys'

jobFunction(listOfQuerys).catch(err => logger.error('index', err))

// listOfQuerys.map(x => jobfunction(x.name)(x.query))
