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
});
