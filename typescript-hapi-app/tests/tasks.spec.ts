import * as chai from "chai";
import TaskController from "../api/v1/tasks/controller";
import { ITask } from "../api/v1/tasks/task.model";
import { IUser } from "../api/v1/users/user.model";
import * as Configs from "../config";
import * as Server from "../server";
import * as Database from "../database";
import * as Utils from "./utils";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("TastController Tests", () => {
  let server;

  before(done => {
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  beforeEach(done => {
    Utils.createSeedTaskData(database, done);
  });

  afterEach(done => {
    Utils.clearDatabase(database, done);
  });
});