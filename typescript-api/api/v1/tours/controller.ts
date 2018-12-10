import { Response, Request, RequestHandler } from "express";
import { DataStore } from '../../../data';

/**
 * @api {get} /tours/
 *
 * @apiName GET Tours List
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (500) {String} Internal Server error
 */

export const list: RequestHandler = (req: Request, res: Response) => {
    res.json(DataStore.tours);
};

/**
 * @api {get} /tours/:id
 *
 * @apiName GET Single Tour
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (500) {String} Internal Server error
 */

export const find: RequestHandler = (req: Request, res: Response) => {
    res.send("Single Tour")
};