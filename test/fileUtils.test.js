const getLogger = require('../src/logger');
const log = getLogger("fileUTilsList");
const fs = require('fs');
let expect = require("chai").expect;
let loadFileList = require('../src/fileUtils.js').loadFileList;
let readFile = require('../src/fileUtils.js').readFile;
const path = require('path');
const FILE_PATH = "./test/fileUtilsList.test";
const FILE_TYPE = '.xml';
const CORRECT_FILE_LIST = [
    "test/fileUtilsList.test/folder1/test2.xml",
    "test/fileUtilsList.test/test1.xml",
    "test/fileUtilsList.test/folder1/folder2/test3.xml",
    "test/fileUtilsList.test/folder1/folder2/test4.xml"
].map((filename) => path.normalize(filename));

describe("Read Files", () => {
    it('Must recieve fileName to read', (done) => {
        readFile(CORRECT_FILE_LIST[0]).then((xmlString) => {
            expect(xmlString).to.be.equal('Hola mundo');
            done();
        }).catch(done);
    });
});

describe('Load Files', () => {
    it("Must read only files in directory with given extension.", (done) => {
        loadFileList(FILE_PATH, FILE_TYPE).then((fileList) => {
            expect(fileList.sort()).to.deep.equal(CORRECT_FILE_LIST.sort());
            done();
        }).catch(done);
    });
});
