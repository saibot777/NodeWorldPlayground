import * as express from "express";
import * as controller from './controller';

const router = express.Router({ mergeParams: true });

router.get('/', controller.list);
router.get('/:id', controller.find);

router.post('/', controller.create);
router.post('/:id/upload', controller.upload);
router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;