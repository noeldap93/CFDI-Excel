let excelBuilder = require('msexcel-builder');

class xlsxGenerator {
    constructor(xlsxFileName, configFromHeadersFile) {
        this.rows = [];
        this.xlsxFileName = xlsxFileName;
        this.configFromHeadersFile = configFromHeadersFile;
    }
    add(row) {
        this.rows.push(row);
    }
    getRows() {
        return this.rows;
    }
    sortDataByColumn() {
        if (this.configFromHeadersFile.order.ascending) {
            this.getRows().sort((a,b)=>a[this.configFromHeadersFile.order.column]>b[this.configFromHeadersFile.order.column]);   
        }
        else{
            this.getRows().sort((a,b)=>a[this.configFromHeadersFile.order.column]<b[this.configFromHeadersFile.order.column]);   
        }
    }

    saveData() {
        this.getRows().unshift(this.configFromHeadersFile.headers);
        
        let columnsByHeaders = this.getRows()[0].length;
        let rowsByAddedFile = this.getRows().length;

        let promise = new Promise((resolve, reject) => {
            let workbook = excelBuilder.createWorkbook('./', this.xlsxFileName);
            let sheet1 = workbook.createSheet('sheet1', columnsByHeaders, rowsByAddedFile);

            for (let j = 1; j <= columnsByHeaders; j++) {
                for (let i = 1; i <= rowsByAddedFile; i++) {
                    sheet1.set(j, i, this.getRows()[i - 1][j - 1]);
                }
            }


            workbook.save((ok)=>{
                ok = true;
               if (ok) {
                   resolve('ok');
                }else{
                    reject('failed');
               }
            });
        });
        return promise;

    }
}

module.exports.xlsxGenerator = xlsxGenerator;