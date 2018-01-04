let xmlFileList = require("xmlFileList")
let path="./ruta";
let outFile="./ruta";
let ExcelGenertor = require("eg");
let excelGen = new ExcelGenertor(outFile); 
function start(){
    excelGen.addHeaders();
    readFiles().then(()=>{
        ExcelGenertor.saveFile();
    })
}
function readFiles(){
    return xmlFileList(path).then((fileList)=>{
        let p = Promise.resolve();
        fileList.forEach(fileName => {
            p = p.then( ()=>{ 
                return process(fileName)
            })
        });
        return p;
    })
    
} 


function process(fileName){
    return loadFile(fileName).then((file)=>{
        return new CFDIParser(file)
    }).then((fileParser)=>{
        return getData(fileParser)
    }).then((data)=>{
        return ExcelGenertor.add(data);
    })
}