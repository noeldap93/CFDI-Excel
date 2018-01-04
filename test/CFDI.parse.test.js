let expect = require("chai").expect;
let CFDIParser = require("CFDI.parse");
let CFDItext =  fs.readFileSync( './data/oxxo.xml');

describe("CFDI Parser", () => {
    let cfdiParser = new CFDIParser();
    it("Must load xml test without errors", () => {
        cfdiParser.load(CFDItext);
    });

    describe("Return the correct values.", () => {
        it("Must return correct CFDI:Comprobante values", () => {
            expect(cfdiParser.get("FECHA")).to.equal(0);
            expect(cfdiParser.get("SUBTOTAL")).to.equal(0);
            expect(cfdiParser.get("DESCUENTO")).to.equal(0);
            expect(cfdiParser.get("TOTAL")).to.equal(0);
        })
        it("Must return correct CFDI:Emisor values", () => {
            expect(cfdiParser.get("RFC_EMISOR")).to.equal("BSM970519DU8");
            expect(cfdiParser.get("NOMBRE_EMISOR")).to.equal("");
        })
    })

})
