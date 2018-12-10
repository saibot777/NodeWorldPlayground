"use strict";
exports.__esModule = true;
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
exports.getHomePage = function (req, res) {
    res.send("TourBookingAPI");
};
