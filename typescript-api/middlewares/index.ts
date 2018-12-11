import { CustomRequestHandler } from "../models/request-model";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { TourFiltersModel } from "../models/tour-filters-model";
import { APIError } from "../models/error-model";

export const authenticator: CustomRequestHandler = (req, res, next) => {
    const username = "admin";
    req.user = username;
    next();
}

export const logger: CustomRequestHandler = (req, res, next) => {
    console.log( "User: " + req.user + " - " + new Date() + " - " + req.method + " Request to " + req.path);
    next();
}

export const apiCheckTourFilters: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const filters = new TourFiltersModel(req.query);
    for (let filter of Object.getOwnPropertyNames(req.query)) {
        if (!filters.hasOwnProperty(filter)) {
            next(new APIError("Query String Error", "No such filter", 400));
        }
    }
    next();
}