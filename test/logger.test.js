let expect = require('chai').expect;
let fs = require("fs");

/*
    This test runs serparately because could interfer with other tests logs.
*/
if (process.env.TEST_LOGGER) {
    describe.only("Running only Logger log4js.", () => {
        let config = require("../logger.config.json");;
        let default_file = config.appenders.main.filename;
        let error_file = config.appenders.emergencies.filename;
        function clean(done) {
            let donecount = 0;
            fs.unlink(default_file, () => (donecount++) && done());
            fs.unlink(error_file, () => (donecount++) && done());
            // done();
        }
        before(clean);
        after(clean);
        it("Test enabled, dsiable with ~$ unset TEST_LOGGER", ()=>{});

        describe("Log files must not exist", () => {
            it("default", () => {
                expect(fs.existsSync(default_file)).to.be.false;
            });
            it("error", () => {
                expect(fs.existsSync(error_file)).to.be.false;
            })
        })
        describe("Log files must be created", () => {
            let log;
            before(() => {
                let getLogger = require("../src/logger");
                log = getLogger("TEST_LOGGER");
            })
            it("Create default on log.debug", (done) => {
                log.debug("Debuging")
                setTimeout(() => {
                    expect(fs.existsSync(default_file)).to.be.true;
                    done()
                }, 300);
            });
            it("Create error on log.error", (done) => {
                log.error("error")
                setTimeout(() => {
                    expect(fs.existsSync(default_file)).to.be.true;
                    done()
                }, 300);
            })
        })
    });
} else {
    describe("Logger log4js test", () => { it("Is not enabled, enable with ~$ export TEST_LOGGER=1 ", ()=>{}) });
}