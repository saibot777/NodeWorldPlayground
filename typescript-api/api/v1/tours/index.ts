import * as express from "express";
import * as controller from './controller';
import * as middlewares from '../../../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', middlewares.apiCheckTourFilters, controller.list);
router.get('/:id', controller.find);
router.get('/static/download/:filename', controller.download);

router.post('/', controller.create);
router.post('/:id/upload', controller.upload);
router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;