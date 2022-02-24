import express from 'express';
import { createCenter, showStats } from '@controllers/center.controller';

const router = express.Router();

router.post('/create', createCenter);
router.post('/stats', showStats);

export { router };
