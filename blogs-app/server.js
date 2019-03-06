"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/', function (req, res, next) {
    res.send("Booking API");
});
app.listen(process.env.PORT || 8091, function () { return console.log('Server started...'); });
