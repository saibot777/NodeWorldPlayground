module.exports = app => {

    /**
     * @ToursApiRoutes
     */
    app.use('/api/v1/tours', require('../api/v1/tours'));

    /**
     * @UserApiRoutes
     */
    app.use('/api/v1/users', require('../api/v1/users'));

};