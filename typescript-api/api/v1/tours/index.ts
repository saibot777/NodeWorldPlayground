import * as express from "express";
import * as controller from './controller';

const router = express.Router({ mergeParams: true });

router.get('/', controller.getHomePage);

module.exports = router;