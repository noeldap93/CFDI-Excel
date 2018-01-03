
describe("Mocha functionality",()=>{
    let assert = require("assert");
    it("Should be able to assert",()=>{
        assert.equal(1,1);
    })
    it("Should assert async",(done)=>{
        setTimeout(()=>{
            assert.notEqual("Hello","world");
            done();
        }, 50);
    })
});
describe("Chai expect functionality",()=>{
    let expect = require("chai").expect;
    it("Should be able to assert",()=>{
        expect(1).to.equal(1);
    })
    it("Should assert async",(done)=>{
        setTimeout(()=>{
            expect("Hello").to.not.equal("world");
            done();
        }, 50);
    })
});