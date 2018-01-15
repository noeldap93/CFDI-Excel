let CFDIParser = require('./CFDI.parse').CFDIParser;
function getRow(headers, XMLText) {
    let promise = new Promise((resolve, reject) => {
        let cfdiParser = new CFDIParser();
        cfdiParser.load(XMLText);
        let rowArray = headers.map((header) => cfdiParser.get(header));
        resolve(rowArray);
    });
    return promise;
}
module.exports = getRow;