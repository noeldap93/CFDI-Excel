let fs = require("fs");
let expect = require("chai").expect;
let getHeadersFromFile = require("../src/getHeadersFromFile");
let fIleDirection = "./data/Headers_ex1.txt";

let headerFileTest = ["RFC_EMISOR",
    "FECHA ordenar",
    "TOTAL"
]
let headerTest = {
    header: ["RFC_EMISOR", "FECHA", "TOTAL"],
    order: { column: 1, ascendig: true }
}


describe("The file must be sent and load without errors", () => {

    it.only("the direction is sent via fileDirection", (done) => {
        getHeadersFromFile(fIleDirection).then((headers) => {
            expect(headers).to.deep.equal(headerTest);
            done();
        }).catch((e)=>done(e));
    })
});