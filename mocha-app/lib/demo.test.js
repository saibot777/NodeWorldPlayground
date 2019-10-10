const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const demo = require("./demo");

describe("demo", () => {
  context("add", () => {
    it("should add two numbers", () => {
      expect(demo.add(1, 2)).to.equal(3);
    });
  });

  context("callback add", done => {
    it("should test the callback", done => {
      demo.addCallback(1, 2, (err, result) => {
        expect(err).not.to.exist;
        expect(result).to.equal(3);
        done();
      });
    });
  });

  context("test promise", done => {
    it("should add with a promise cb", () => {
      demo
        .addPromise(1, 2)
        .then(result => {
          expect(result).to.equal(3);
          done();
        })
        .catch(er => {
          console.log(er, "caught error");
        });
    });

    it("should test promise with aync await", async () => {
      const result = await demo.addPromise(1, 2);
      expect(result).to.equal(3);
    });

    it("should test promise with chai as promised", async () => {
      await expect(demo.addPromise(1, 2)).to.eventually.equal(3);
    });
  });
});
