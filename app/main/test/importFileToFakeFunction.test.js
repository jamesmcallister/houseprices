import importFileBuilder from '../src/csv/importFileBuilder.js'
import sinon, { spy } from 'sinon'
import config from '../src/config/config.js'

describe('Read file form disk', () => {
  it('can read csv file', () => {
    const fakeFileImportFucntion = sinon.stub().returns(Promise.resolve([]))

    const fakeFileImportClient = fakeOptions => ({
      fromFile: fakeFileImportFucntion
    })

    const fakeOptions = x => ({
      noheader: true
    })

    return importFileBuilder(fakeFileImportClient)(fakeOptions)(
      config.importDataPath
    ).then(() => {
      expect(fakeFileImportFucntion.called).toBe(true)
      expect(fakeFileImportFucntion.calledWith(config.importDataPath)).toBe(true)
    });
  })
})
