import importFileBuilder from '../src/csv/importFileBuilder.js'
import { expect } from 'chai'
import sinon, { spy } from 'sinon'
import config from '../src/config/config.js'
// 15505038372820

describe('Read file form disk', () => {
  it('can read csv file', () => {
    const fakeFileImportFucntion = sinon.stub().returns(Promise.resolve([]))

    const fakeFileImportClient = {
      fromFile: fakeFileImportFucntion
    }
    return importFileBuilder(fakeFileImportClient)(config.importDataPath).then(() => {
      expect(fakeFileImportFucntion.called).true
      expect(fakeFileImportFucntion.calledWith(config.importDataPath)).true
    })
  })
})
