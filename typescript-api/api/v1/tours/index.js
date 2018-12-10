"use strict";
exports.__esModule = true;
var express = require("express");
var controller = require("./controller");
var router = express.Router({ mergeParams: true });
router.get('/', controller.getHomePage);
module.exports = router;
