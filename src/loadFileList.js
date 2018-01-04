const getLogger = require('./logger');
const log = getLogger("loadFileList");
var ls = require('list-directory-contents');
const path = require('path');
/**
 * 
 * @param {*PATH} PATH 
 * @param {*FILETYPE} FILETYPE 
 */
function fileListFiltered(PATH, FILETYPE) {
  log.info(PATH, FILETYPE);
  let promise = new Promise((resolve,reject)=>{
    
    ls(PATH, (err, fileList) => {
      let filteredFileList = fileList.filter((fileName) => {
        return path.extname(fileName) === FILETYPE
      });
      log.debug( filteredFileList );
      
      resolve(filteredFileList)
    });
  });
  
  return promise;
}

module.exports.fileListFiltered = fileListFiltered;