#!/usr/bin/env node

let main = require('../src/main.js');
let parametros = process.argv;

const FILES_PATH_DEFAULT = './test/data';
const HEADERS_PATH_DEFAULT = './headers.txt'
const XLSX_FILE_NAME_DEFAULT = 'output.xlsx'

/* labels para parametros 
directorio de archivos xml    '--fdir='
directorio del archivo txt    '--hdir='
nombre del archivo final xlsx '--output='
*/
function defineParameters(id) {
    let valor;
    parametros.map((parametros) => {
        let posicion = parametros.indexOf(id);
        posicion == 0 ? valor = parametros.replace(id, ''): 0 ;        
    });
    return valor;
}
let filesPath = defineParameters("--fdir=");
let headersPath = defineParameters("--hdir=");
let XLSXFilename = defineParameters("--output=");
filesPath = filesPath || FILES_PATH_DEFAULT;
headersPath = headersPath || HEADERS_PATH_DEFAULT;
XLSXFilename = XLSXFilename || XLSX_FILE_NAME_DEFAULT;
console.log(XLSXFilename);
main.start(filesPath, headersPath, XLSXFilename); 