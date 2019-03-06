import { Response, Request, RequestHandler, NextFunction } from "express";
import { DataStore } from '../../../data';
import { ToursListModel } from "../../../models/tours-list-model";
import { TourItemModel } from "../../../models/tour-item-model";
import * as uuid from 'uuid/v4';
import * as staticFileService from "../general/static";
import { fileMapper } from "../general/static";
import { APIError, PublicInfo } from "../../../models/error-model";
import { TourFiltersModel } from "../../../models/tour-filters-model";
import * as path from "path";
import { __root } from "../../../config";

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
    const filters = new TourFiltersModel(req.query);
    const filteredData = DataStore.tours.filter((item) => {
        let conditions = [
            filters.location ? (item.location == filters.location) : true,
            filters.priceMin ? (item.price > filters.priceMin) : true,
            filters.priceMax ? (item.price < filters.priceMax) : true,
        ];
        return conditions.every(value => value == true);
    })
    res.json(filteredData.map((item) => new ToursListModel(item)));
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

export const create: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        next(new APIError("Data missing", "No Data in Request Body", 400))
    }
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
    res.json(new PublicInfo("Tour added.", 200, { tour: newTour }));
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

export const update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
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
        res.json(new PublicInfo("Tour saved.", 200, { tour: newTour }));
    }
    else {
        next(new APIError("Validation Error", "Tour data fails.", 400));
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

export const remove: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const tourID = req.params.id;
    const tourIndex = DataStore.tours.findIndex((item) => item.id == tourID);
    if (tourIndex > - 1) {
        DataStore.tours.splice(tourIndex);
        res.json(new PublicInfo("Tour Removed", 200));
    } else {
        next(new APIError("Validation Error", "Tour not found.", 400));
    }
};

/**
 * @api {post} /tours/:id/upload
 *
 * @apiName POST Upload Image
 *
 * @apiHeader (RequestFileHeader) FILE
 *
 * @apiSuccess (200) Uploads Image
 *
 * @apiError (404) {String} Not Found
 */

export const upload: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const tourID = req.params.id;
    const tourIndex = DataStore.tours.findIndex((item) => item.id == tourID);
    if (tourIndex == -1) {
        res.json({"status": "fail", "message": "Tour not found"});
    }
    else {
        const upload = staticFileService.getFileUploader(req.app.get("env"));
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
                next(new APIError("Server Error", "File Upload Fail", 500));
            } else {
                DataStore.tours[tourIndex].img.push(req.file.filename);
                res.json(new PublicInfo("File Uploaded", 200));
            }
        })
       
    }
};

/**
 * @api {get} /tours/static/download/:filename
 *
 * @apiName GET Download Image
 *
 * @apiHeader (RequestFileHeader) FILE
 *
 * @apiSuccess (200) Downloads Image
 *
 * @apiError (404) {String} Not Found
 */

export const download: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const filename = req.params.filename;
    res.download(path.join(__root, "public", "img", filename), (err) => {
        if (err) {
            next(new APIError("Download Failed.", "Cannot download requested file", 400))
        }
    })
};

