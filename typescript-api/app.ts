import * as express from "express";
import * as bodyParser from "body-parser";
import * as middlewares from './middlewares';
import * as path from 'path';

const app = express();

// Express Configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public", "img")));

// Middlewares
app.use(middlewares.authenticator)
app.use(middlewares.logger)

// API Routes
require('./routes')(app);

export default app;