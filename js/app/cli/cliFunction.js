import logger from '../../src/helpers/logger'
import { importFile } from '../services/importServices'

export default fileName => databaseName => options => {
  importFile(options)(fileName)
}
