const chai = require("chai");
const mongoose = require("mongoose");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const rewire = require("rewire");
chai.use(chaiAsPromised);
chai.use(sinonChai);

const users = rewire("./users");
const User = require("./models/user");

const sandbox = sinon.createSandbox();

describe("users", () => {
  let findStub;
  let sampleArgs;
  let sampleUser;

  beforeEach(() => {
    sampleUser = {
      id: 123,
      name: "TestName",
      email: "test@email.com"
    };

    findStub = sandbox.stub(mongoose.Model, "findById").resolves(sampleUser);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context("get", () => {
    it("should check for an id", done => {
      users.get(null, (err, result) => {
        expect(err).to.exist;
        expect(err.message).to.equal("Invalid user id");
        done();
      });
    });
  });
});
