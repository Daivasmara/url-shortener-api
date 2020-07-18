import { Router } from 'express';
import { link } from '@v1/routes/index';

const router = Router();

router.use('/link', link);

export default router;
