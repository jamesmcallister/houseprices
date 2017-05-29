import importFileBuilder from '../../src/csv/importFileBuilder.js'
import sinon, { spy } from 'sinon'

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
      "testpath"
    ).then(() => {
      expect(fakeFileImportFucntion.called).toBe(true)
      expect(fakeFileImportFucntion.calledWith("testpath")).toBe(
        true
      )
    })
  })
})
