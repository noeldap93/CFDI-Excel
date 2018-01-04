let expect = require("chai").expect;
let loadFileList = require('../src/loadFileList.js').fileListFiltered;
let arr = [];
const path = require ('path');
const FILE_PATH = "./test/loadFileList.test";
const FILE_TYPE = '.xml';
const CORRECT_FILE_LIST = [
    "test/loadFileList.test/folder1/test2.xml",
    "test/loadFileList.test/test1.xml",
    "test/loadFileList.test/folder1/folder2/test3.xml",
    "test/loadFileList.test/folder1/folder2/test4.xml"
].map((filename)=> path.normalize(filename));

describe("Read Files", () => {
    it("Must read only files in directory with given extension.", (done) => {
        loadFileList(FILE_PATH , FILE_TYPE).then((fileList)=>{
            expect(fileList.sort()).to.deep.equal( CORRECT_FILE_LIST.sort() );
            done();
         });
    })
});