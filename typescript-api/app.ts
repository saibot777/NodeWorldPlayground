import * as express from "express";
const app = express();

// API Routes
require('./routes')(app);

export default app;