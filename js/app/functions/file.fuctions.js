import logger from '../../src/helpers/logger'
import { unlink, existsSync, createWriteStream } from 'fs'

const deleteFile = fileName => {
  new Promise((resolve, reject) => {
    unlink(fileName, error => {
      error ? logger.info('no file' + reject) : resolve()
    })
  })
}

const isFileThere = fileName =>
  existsSync(fileName) ? deleteFile(fileName) : false

const saveToFile = fileName => result => {
  createWriteStream(fileName)
    .write(result)
    .on('error', err => logger.info(err))
    .on('end', () => {
      stream.end()
    })
  logger.info('Saving File', fileName)
}

export default fileName => result => {
  isFileThere(fileName) ? deleteFile(fileName) : saveToFile(fileName)(result)
}
