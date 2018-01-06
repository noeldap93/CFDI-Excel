
let CFDIParser = require('./CFDI.parse').CFDIParser;


function getRow(headers, XMLText) {
    let cfdiParser = new CFDIParser();
    cfdiParser.load(XMLText);
    let rowArray = headers.map((header) => cfdiParser.get(header));
    return rowArray;
}

module.exports = getRow;