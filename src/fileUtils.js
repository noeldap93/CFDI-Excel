const getLogger = require('./logger');
const log = getLogger("fileUtils");
const path = require('path');
const fs = require('fs');
var ls = require('list-directory-contents');

function loadFileList(PATH, FILETYPE) {
  log.info(PATH, FILETYPE);
  let promise = new Promise((resolve, reject) => {

    ls(PATH, (err, fileList) => {
      if (err) return reject(err);

      let filteredFileList = fileList.filter((fileName) => {
        return path.extname(fileName) === FILETYPE
      });
      log.debug(filteredFileList);

      resolve(filteredFileList)
    });
  });

  return promise;
}

function readFile(pathFileName) {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(pathFileName, 'utf8', (err, data) => {
      if (err) {
        log.error(error);
        reject(err);
      }else{
        log.debug(data);
        resolve(data);
      }
    });
  });
  return promise;
}

module.exports.loadFileList = loadFileList;
module.exports.readFile = readFile;