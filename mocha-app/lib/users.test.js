const chai = require("chai");
const mpngoose = require("mongoose");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const rewire = require("rewire");
chai.use(chaiAsPromised);
chai.use(sinonChai);

const users = rewire("./users");
const User = require("./models/user");

describe("users", () => {
  context("", () => {
    it("", () => {});
  });
});
