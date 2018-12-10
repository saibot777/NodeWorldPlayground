import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

// Express Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
require('./routes')(app);

export default app;