import { Response, Request, RequestHandler } from "express";
import { DataStore } from '../../../data';
import { ToursListModel } from "../../../models/tours-list-model";
import { TourItemModel } from "../../../models/tour-item-model";
import * as uuid from 'uuid/v4';

/**
 * @api {get} /tours/
 *
 * @apiName GET Tours List
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) Response List
 *
 * @apiError (500) {String} Internal Server error
 */

export const list: RequestHandler = (req: Request, res: Response) => {
    res.json(DataStore.tours.map((item) => new ToursListModel(item)));
};

/**
 * @api {get} /tours/:id
 *
 * @apiName GET Single Tour
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) Response Object
 *
 * @apiError (404) {String} Not Found
 */

export const find: RequestHandler = (req: Request, res: Response) => {
    const tourID = req.params.id;
    const selectedTour = DataStore.tours.find((element) => element.id == tourID);
    if (selectedTour) {
        const selectedReviews = DataStore.reviews.filter((item) => item.tourID == tourID);
        res.json(new TourItemModel(selectedTour, selectedReviews));
    }
    else {
        res.json({"status": "failed", "message": "Not found"});
    }
};

/**
 * @api {post} /tours
 *
 * @apiName POST Create Tour
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (404) {String} Not Found
 */

export const create: RequestHandler = (req: Request, res: Response) => {
    const newTour = {
        id: uuid(),
        location: req.body.location || "",
        tourTitle: req.body.tourTitle || "",
        tourCategory: req.body.tourCategory || "",
        tourDescription: req.body.tourDescription || "",
        price: req.body.price || "",
        currency: req.body.currency || "",
    }
    DataStore.tours.push(newTour);

    res.send("message: Success")
};

/**
 * @api {delete} /tours/:id
 *
 * @apiName DELETE Removes Tour
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) {String} 
 *
 * @apiError (404) {String} Not Found
 */

export const remove: RequestHandler = (req: Request, res: Response) => {
    const tourID = req.params.id;
    const tourIndex = DataStore.tours.findIndex((item) => item.id == tourID);
    if (tourIndex > - 1) {
        DataStore.tours.splice(tourIndex);
        res.json({"status": "success", "message": "Tour Removed"});
    } else {
        res.json({"status": "error", "message": "Not Found"})
    }
};