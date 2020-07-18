import { Router } from 'express';
import { LinkController } from '@v1/controllers/index';
import { devEnvOnly } from '@middlewares/index';

const router = Router();

router.get('/', devEnvOnly, LinkController.getAllLink);
router.get('/:hash', LinkController.getLink);
router.post('/', LinkController.addLink);

export default router;
