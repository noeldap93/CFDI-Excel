let fs = require("fs");
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

function getHeadersFromFile(path) {
    return readFile(path).then((data) => {
        let header = {
            headers : [],
            order: { column: -1, ascending: true }
        }
        //parsing....
        let headersData = data.split("\n");

        header.headers = headersData.map((header, position) => {
            
            header = header.trim().replace(/\s\s+/g, ' ');
            let splitHeaders = header.split(" ");
            if (splitHeaders[1] == 'ordenar') {
                header.order.column = position;
            }
            if (splitHeaders[2] == 'descendente') {
                header.order.ascending = false;
            }
            return splitHeaders[0];
        });
        return header;

    });
};


module.exports = getHeadersFromFile;