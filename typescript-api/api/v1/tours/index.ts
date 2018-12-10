import * as express from "express";
import * as controller from './controller';
import * as middlewares from '../../../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', middlewares.logger, controller.list);
router.get('/:id', controller.find);

router.post('/', controller.create);
router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;