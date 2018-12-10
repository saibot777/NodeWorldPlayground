import { Response, Request } from "express";

/**
 * @api {get} /tours/
 *
 * @apiName GET Home Page
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (500) {String} Internal Server error
 */

export const getHomePage = (req: Request, res: Response) => {
    res.send("TourBookingAPI")
};