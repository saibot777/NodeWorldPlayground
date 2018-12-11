import { Response, Request, RequestHandler, NextFunction } from "express";
import { DataStore } from '../../../data';
import { ToursListModel } from "../../../models/tours-list-model";
import { TourItemModel } from "../../../models/tour-item-model";
import * as uuid from 'uuid/v4';
import { APIError, PublicInfo } from "../../../models/error-model";
import { TourFiltersModel } from "../../../models/tour-filters-model";

/**
 * @api {get} /users/:id
 *
 * @apiName GET Single User
 * 
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) Response Object
 *
 * @apiError (404) {String} Not Found
 */

export const find: RequestHandler = (req: Request, res: Response) => {
    const userID = req.params.id;
    res.send("User details with id " +  userID);
};

/**
 * @api {post} /users
 *
 * @apiName POST Create User
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (404) {String} Not Found
 */

export const create: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.send("User added");
};

/**
 * @api {put} /users/:id
 *
 * @apiName PUT Update User
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) Updated User Data
 *
 * @apiError (404) {String} Not Found
 */

export const update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.send("User saved");
};

/**
 * @api {delete} /users/:id
 *
 * @apiName DELETE Removes User
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (404) {String} Not Found
 */

export const remove: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const userID = req.params.id;
    res.send("User deleted with id " +  userID);
};

