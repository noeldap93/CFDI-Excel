let fs = require('fs');
let expect = require("chai").expect;
let getRow = require("../src/getRow");
let XMLText = fs.readFileSync('./data/oxxo.xml');
let headers = [
    "FECHA",
    "SUBTOTAL",
    "TOTAL",
    "RFC_EMISOR",
    "NOMBRE_EMISOR"
];
let arrayTest = [
    '2017-01-09T21:50:16',
    '92.71',
    '106.50',
    'CCO8605231N4',
    'CADENA COMERCIAL OXXO, S.A. DE C.V.'
];
describe.only("Return the values in the correct order:", () => {
    let row = getRow(headers,XMLText);
    it("The row must contain the data in this order: FECHA,SUBTOTAL,TOTAL, RFC_EMISOR,NOMBRE_EMISOR", () => {
        expect(row).to.deep.equal(arrayTest);
    });
});