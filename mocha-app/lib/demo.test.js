const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const rewire = require("rewire");
chai.use(chaiAsPromised);
chai.use(sinonChai);

const demo = rewire("./demo");

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

  context("test doubles", () => {
    it("should spy on log", () => {
      const spy = sinon.spy(console, "log");
      demo.foo();

      expect(spy.calledOnce).to.be.true;
      expect(spy).to.have.been.calledOnce;
      spy.restore();
    });

    it("should stub console.warn", () => {
      const stub = sinon.stub(console, "warn");

      demo.foo();
      expect(stub).to.have.been.calledOnce;
      stub.restore();
    });
  });

  context("stub private function", () => {
    it("should stub createfile", async () => {
      let createStub = sinon.stub(demo, "createFile").resolves("create_stub");
      let callStub = sinon.stub().resolves("calldb_stub");

      demo.__set__("callDB", callStub);

      let result = await demo.bar("test.txt");

      expect(result).to.equal("calldb_stub");
      expect(createStub).to.have.been.calledOnce;
      expect(createStub).to.have.been.calledWith("test.txt");
      expect(callStub).to.have.been.calledOnce;
    });
  });
});
