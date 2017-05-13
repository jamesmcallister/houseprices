import {importFile} from "../src/csv/importServices.js";
import {expect} from "chai";
import config from "../src/config/config.js";

describe('Lets import a file', () => {
    it('should import a csv file', done => {

        let importFile2 = importFile({noheader:true});
        let importFile3 = importFile2(config.importDataPath);
        importFile3
            .on('json', (json) => { //this func will be called 3 times
                console.log(json)
            })
            .on('done', () => {
                console.log('end')
                done()
            })
    })
})
