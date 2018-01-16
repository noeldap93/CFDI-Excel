let fs = require("fs");
let expect = require("chai").expect;
let getHeadersFromFile = require("../src/getHeadersFromFile");
let fIleDirection = "./test/data/Headers_ex1.txt";

let headerFileTest = ["RFC_EMISOR",
    "FECHA ordenar",
    "TOTAL"
]
let headerTest = {
    headers: ["RFC_EMISOR", "FECHA", "TOTAL"],
    order: { column: 1, ascending: true }
}


describe("The file must be sent and load without errors", () => {

    it("the direction is sent via fileDirection", (done) => {
        getHeadersFromFile(fIleDirection).then((headers) => {
            console.log(headers);
            expect(headers).to.deep.equal(headerTest);
            done();
        }).catch((e)=>done(e));
    })
});