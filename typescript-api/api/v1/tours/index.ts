import * as express from "express";
import * as controller from './controller';

const router = express.Router({ mergeParams: true });

router.get('/', controller.list);
router.get('/:id', controller.find);

module.exports = router;