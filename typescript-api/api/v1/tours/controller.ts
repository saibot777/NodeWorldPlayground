import { Response, Request } from "express";

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

export const list = (req: Request, res: Response) => {
    res.send("Tours List")
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

export const find = (req: Request, res: Response) => {
    res.send("Single Tour")
};