
const getLogger = require('../src/logger');
const log = getLogger("xlsxGenerator");
const XLSXFILENAME = 'output.xlsx';
const fs = require('fs');
let expect = require("chai").expect;
let xlsxGenerator = require('../src/xlsxGenerator.js').xlsxGenerator;

let row1 = ['BEPN010101543', '2014-04-20T23:25:24', '450.38'];
let row2 = ['FEPN010101543', '2014-04-20T23:25:20', '250.38'];
let row3 = ['AEPN010101543', '2014-04-20T23:25:21', '650.38'];

let configFromHeadersFile = {
    headers: ['RFC_EMISOR', 'FECHA', 'TOTAL'],
    order: { column: 1, ascending: true }
};

describe("Data getting", () => {
    let dataRecieve = new xlsxGenerator(XLSXFILENAME, configFromHeadersFile);
    it("Must recieve data.", (done) => {
        dataRecieve.add(row1);
        dataRecieve.add(row2);
        dataRecieve.add(row3);
        expect(dataRecieve.getRows()).to.deep.equal([row1, row2, row3]);
        done();
    })
});

describe("Data sorting", () => {
    let dataSort = new xlsxGenerator(XLSXFILENAME, configFromHeadersFile);
    it("Must sort the data by column.", (done) => {
        dataSort.add(row1);
        dataSort.add(row2);
        dataSort.add(row3);
        dataSort.sortDataByColumn();
        expect(dataSort.getRows()).to.deep.equal([row2, row3, row1]);
        done();
    })
});

describe("Save", () => {
    let save = new xlsxGenerator(XLSXFILENAME, configFromHeadersFile);
    it("Must save the data in xlsxFile.", (done) => {
        save.add(row1);
        save.add(row2);
        save.add(row1);
        save.add(row3);
        save.add(row3);
        save.sortDataByColumn();
        save.saveData().then((ok) => { 
            log.debug('File ' + ok); 
            expect(fs.existsSync('output.xlsx') ).to.be.true;
        }).catch((err) => {
            log.error('File ' + err); 
        });
        done();
    })
});