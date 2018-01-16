let fs = require("fs");
let expect = require("chai").expect;
let CFDIParser = require("../src/CFDI.parse").CFDIParser;
let CFDItext = fs.readFileSync('./test/data/oxxo.xml');

let headers = [
    "FECHA",
    "SUBTOTAL",
    "TOTAL",
    "RFC_EMISOR",
    "NOMBRE_EMISOR"
];
let arrayTest = [
    '2017-01-09T21:50:16',
    92.71,
    106.50,
    'CCO8605231N4',
    'CADENA COMERCIAL OXXO, S.A. DE C.V.'
];
describe("CFDI Parser", () => {
    let cfdiParser = new CFDIParser();
    it("Must load xml test without errors", (done) => {
        cfdiParser.load(CFDItext).then((result) => {
            expect(result).to.be.string;
            done();
        });
    });
    describe("Check that the values are numbers", () => {
        it("Type of should be a number", () => {
            expect(cfdiParser.get("SUBTOTAL")).to.be.a('number');
            expect(cfdiParser.get("TOTAL")).to.be.a('number');
            expect(cfdiParser.get("DESCUENTO")).to.be.a('number');
            expect(cfdiParser.get("IMPUESTOS_RETENIDOS")).to.be.a('number');
            expect(cfdiParser.get("IMPUESTOS_TRASLADADOS")).to.be.a('number')
        });
    })
    describe("Return the correct values.", () => {
        it("Should return correct CFDI:Comprobante values", () => {
            expect(cfdiParser.get("FECHA")).to.equal("2017-01-09T21:50:16");
            expect(cfdiParser.get("SUBTOTAL")).to.equal(92.71);
            expect(cfdiParser.get("TOTAL")).to.equal(106.50);
            expect(cfdiParser.get("DESCUENTO")).to.equal(0);
            expect(cfdiParser.get("FORMA_PAGO")).to.equal("PAGO EN UNA SOLA EXHIBICION");
            expect(cfdiParser.get("METODO_PAGO")).to.equal("04");
            expect(cfdiParser.get("FOLIO")).to.equal("173235476");
            expect(cfdiParser.get("NUM_CUENTA")).to.equal("0");

        })
        it("Should return correct CFDI:Emisor values", () => {
            expect(cfdiParser.get("RFC_EMISOR")).to.equal("CCO8605231N4");
            expect(cfdiParser.get("NOMBRE_EMISOR")).to.equal("CADENA COMERCIAL OXXO, S.A. DE C.V.");
        })
        it("Should return correct CFDI:Receptor values", () => {
            expect(cfdiParser.get("RFC_RECEPTOR")).to.equal("AEAN581126874");
            expect(cfdiParser.get("NOMBRE_RECEPTOR")).to.equal("jose noel del angel del angel");
        })
        it("Should return correct CFDI:Impuestos values", () => {
            expect(cfdiParser.get("IMPUESTOS_RETENIDOS")).to.equal(0);
            expect(cfdiParser.get("IMPUESTOS_TRASLADADOS")).to.equal(13.79);
        })
        it("Should not access private methods", () => {
            expect(cfdiParser.get("load")).to.equal("");

        })
        it("Should not access unexistent methods", () => {
            expect(cfdiParser.get("unexistent")).to.equal("");

        })
    });

    describe("Return the values in the correct order:", () => {
        it("The row must contain the data in this order: FECHA,SUBTOTAL,TOTAL, RFC_EMISOR,NOMBRE_EMISOR", () => {
            expect(cfdiParser.getRow(headers)).to.deep.equal(arrayTest);
        });
    });
})
