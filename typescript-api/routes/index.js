module.exports = function (app) {
    /**
     * @ToursApiRoutes
     */
    app.use('/api/v1/tours', require('../api/v1/tours'));
    /**
     * @ReviewsApiRoutes
     */
    // app.use('/api/v1/reviews', require('../api/v1/reviews'));
};
