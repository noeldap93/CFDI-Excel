var ls = require('list-directory-contents');
const path = require('path');
/**
 * 
 * @param {*PATH} PATH 
 * @param {*FILETYPE} FILETYPE 
 */
function fileListFiltered(PATH, FILETYPE) {
  let promise = new Promise((resolve,reject)=>{
    
    ls(PATH, (err, fileList) => {
      let filteredFileList = fileList.filter((fileName) => {
        return path.extname(fileName) === FILETYPE
      });
      
      resolve(filteredFileList)
    });
  });
  
  return promise;
}

module.exports.fileListFiltered = fileListFiltered;