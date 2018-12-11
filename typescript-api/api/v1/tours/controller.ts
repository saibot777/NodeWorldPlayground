import { Response, Request, RequestHandler } from "express";
import { DataStore } from '../../../data';
import { ToursListModel } from "../../../models/tours-list-model";
import { TourItemModel } from "../../../models/tour-item-model";
import * as uuid from 'uuid/v4';
import * as staticFileService from "../general/static";
import { fileMapper } from "../general/static";

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
        const imageURLs = selectedTour.img.map(fileMapper(req.app.get("env")));
        const selectedReviews = DataStore.reviews.filter((item) => item.tourID == tourID);
        res.json(new TourItemModel(selectedTour, selectedReviews, imageURLs));
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
 * @api {put} /tours/:id
 *
 * @apiName PUT Update Tour
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiSuccess (200) Updated Tour
 *
 * @apiError (404) {String} Not Found
 */

export const update: RequestHandler = (req: Request, res: Response) => {
    const tourID = req.params.id;
    const tourIndex = DataStore.tours.findIndex((item: any) => item.id == tourID);
    if (tourIndex > -1) {
        const originalTour = DataStore.tours[tourIndex];
        const newTour = {
            id: tourID,
            location: req.body.location || originalTour.location,
            tourTitle: req.body.tourTitle || originalTour.tourTitle,
            tourCategory: req.body.tourCategory || originalTour.tourCategory,
            tourDescription: req.body.tourDescription || originalTour.tourDescription,
            price: req.body.price || originalTour.price,
            currency: req.body.currency || originalTour.currency,
            img: originalTour.img
        }
        DataStore.tours[tourIndex] = newTour;
        res.json({"status": "success", "message": "Tour updated"});
    }
    else {
        res.json({"status": "error", "message": "Tour not found"});
    }
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

/**
 * @api {post} /tours/upload
 *
 * @apiName POST Upload Image
 *
 * @apiHeader (RequestFileHeader) FILE
 *
 * @apiSuccess (200) Uploads Image
 *
 * @apiError (404) {String} Not Found
 */

export const upload: RequestHandler = (req: Request, res: Response) => {
    const tourID = req.params.id;
    const tourIndex = DataStore.tours.findIndex((item) => item.id == tourID);
    if (tourIndex == -1) {
        
        res.json({"status": "success", "message": "Image upload"});
    }
    else {
        const upload = staticFileService.getFileUploader(req.app.get("env"));
        res.json({"status": "error", "message": "Tour not found"});
    }
};