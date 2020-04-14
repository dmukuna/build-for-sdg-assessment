import { Router } from 'express';

import {
  jsonEstimator,
  xmlEstimator,
  getLogs
} from './controllers';

const router = Router();

router.post('/api/v1/on-covid-19', jsonEstimator);
router.post('/api/v1/on-covid-19/json', jsonEstimator);
router.post('/api/v1/on-covid-19/xml', xmlEstimator);
router.get('/api/v1/on-covid-19/logs', getLogs);

export default router;
