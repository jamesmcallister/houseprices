import something, { deleteFile, isFileThere, saveToFile } from './file.fuctions'

const testFileName = 'testFile.json'

describe('File - Delete and write', () => {
  it('Is file there', () => {
    isFileThere(testFileName)
  })
  it('Delete file', () => {
    deleteFile(testFileName)
  })
  it('Save to file', () => {
    saveToFile(testFileName)({})
  })
  it('something', () => {
    something(testFileName)({})
  })
})
