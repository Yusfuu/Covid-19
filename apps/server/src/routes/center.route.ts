import express from 'express';
import {
  createCenter,
  showStats,
  getCenters,
} from '@controllers/center.controller';

const router = express.Router();

router.post('/create', createCenter);
router.get('/stats', showStats);
router.get('/centers', getCenters);

export { router };
