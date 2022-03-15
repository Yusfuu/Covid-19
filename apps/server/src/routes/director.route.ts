import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  stats,
} from '@controllers/director.controller';
import express from 'express';

const router = express.Router();

router.post('/create', createAdmin);
router.post('/delete', deleteAdmin);
router.get('/admins', getAdmins);
router.get('/stats', stats);

export { router };
