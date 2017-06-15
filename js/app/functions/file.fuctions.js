import logger from '../../src/helpers/logger'
import { writeFile, unlink, existsSync } from 'fs'

export const deleteFile = fileName => {
  new Promise((resolve, reject) => {
    unlink(fileName, error => {
      error ? logger.info('no file') : resolve()
    })
  })
}

export const isFileThere = fileName =>
  existsSync(fileName) ? deleteFile(fileName) : false

export const saveToFile = fileName => result => {
  writeFile(fileName, JSON.stringify(result), 'utf8', () =>
    logger.info('Saving File', fileName)
  )
}

export default fileName => result => {
  isFileThere(fileName) ? deleteFile(fileName) : saveToFile(fileName)(result)
}
