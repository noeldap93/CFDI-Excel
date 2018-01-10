let fs = require("fs");
console.log("Before");
let FileText = './data/Headers_ex2.txt';


function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (error, data) => {
            if (error)
                reject(error);
            else {
                resolve(data);
            }
        });
    });

}
/* function getHeadersFromFile(data) {
    return new Promise((resolve, reject) => {
        
    } */
function getHeadersFromFile(path) {
    return readFile(path).then((data) => {
        let headers = {
            header: [],
            order: { column: -1, ascendig: true }
        }
        //parsing....
        let headersData = data.split("\n");

        headers.header = headersData.map((header, position) => {
            header = header.replace(/\s\s+/g, ' ');
            let splitHeaders = header.split(" ");
            if (splitHeaders[1] == 'ordenar') {
                headers.order.column = position;
            }
            if (splitHeaders[2] == 'descendente') {
                headers.order.ascendig = false;
            }
            return splitHeaders[0];
        });
        return headers;

    });
};


module.exports = getHeadersFromFile;