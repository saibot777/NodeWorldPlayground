"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
// API Routes
require('./routes')(app);
exports["default"] = app;
