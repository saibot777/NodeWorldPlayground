const chai = require("chai");
const expect = chai.expect;

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

  context("test promise", () => {
    it("should add with a promise cb", () => {
      demo
        .addPromise(1, 2)
        .then(res => {
          expect(res).to.equal(3);
          done();
        })
        .catch(er => {
          console.log(er, "caught error");
          done();
        });
    });
  });
});
