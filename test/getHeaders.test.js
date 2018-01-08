let fs = require("fs");
let expect = require("chai");
let getHeadersFromFile = require("../src/getHeadersFromFile");
let fIleDirection = "./data/Header_ex1.txt";

let headerTest = ["RFC_EMISOR",
    "FECHA",
    "TOTAL"
]
describe.only("The file must be sent and load without errors", () => {

    it("the direction is sent via fileDirection", () => {
        getHeadersFromFile(fIleDirection).then((headers) => {
            expect(headers.headers).to.deep.equal(headerTest);
            expect(headers.order.colum).to.deep.equal(1);
            expect(headers.order.ascending).to.deep.equal(true);
        });
    })
});