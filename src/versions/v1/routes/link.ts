import { Router } from 'express';
import { LinkController } from '@v1/controllers/index';

const router = Router();

router.get('/', LinkController.getAll);

export default router;
