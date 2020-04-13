import { Router } from 'express';

import {
  jsonEstimator,
  xmlEstimator,
  getLogs
} from './controllers';

const router = Router();

router.post('/', jsonEstimator);
router.post('/json', jsonEstimator);
router.post('/xml', xmlEstimator);
router.get('/logs', getLogs);

export default router;
