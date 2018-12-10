import { CustomRequestHandler } from "../models/request-model";

export const authenticator: CustomRequestHandler = (req, res, next) => {
    const username = "admin";
    req.user = username;
    next();
}

export const logger: CustomRequestHandler = (req, res, next) => {
    console.log( "User: " + req.user + " - " + new Date() + " - " + req.method + " Request to " + req.path);
    next();
}