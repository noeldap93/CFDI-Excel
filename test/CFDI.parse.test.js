let fs = require("fs");
let expect = require("chai").expect;
let CFDIParser = require("../src/CFDI.parse").CFDIParser;
let CFDItext =  fs.readFileSync( './data/oxxo.xml');

describe("CFDI Parser", () => {
    let cfdiParser = new CFDIParser();
    it("Must load xml test without errors", () => {
        cfdiParser.load(CFDItext);
    });

    describe("Return the correct values.", () => {
        it("Must return correct CFDI:Comprobante values", () => {
            expect(cfdiParser.get("FECHA")).to.equal("2017-01-09T21:50:16");
            expect(cfdiParser.get("SUBTOTAL")).to.equal("92.71");
            expect(cfdiParser.get("DESCUENTO")).to.equal("0");
            expect(cfdiParser.get("load")).to.equal("0");
        })
        it("Must return correct CFDI:Emisor values", () => {
            expect(cfdiParser.get("RFC_EMISOR")).to.equal("CCO8605231N4");
            expect(cfdiParser.get("NOMBRE_EMISOR")).to.equal("CADENA COMERCIAL OXXO, S.A. DE C.V.");
        })
    })

})
