import logger from '../../../src/helpers/logger'
import importServices from '.././importServices'

export default fileName => databaseName => options => {
  return `
  File: "${fileName}" 
  Database: "${databaseName}" 
  Options: "${options}"`
}
