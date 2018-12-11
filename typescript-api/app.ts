import * as express from "express";
import * as bodyParser from "body-parser";
import * as middlewares from './middlewares';
import * as path from 'path';

const app = express();

// Cors & Headers
app.disable("x-powered-by");
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE"
    });
    next();
})

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