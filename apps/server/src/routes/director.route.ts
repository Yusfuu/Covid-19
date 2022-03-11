import {
  createAdmin,
  deleteAdmin,
  getAdmins,
} from '@controllers/director.controller';
import express from 'express';

const router = express.Router();

router.post('/create', createAdmin);
router.post('/delete', deleteAdmin);
router.get('/admins', getAdmins);

export { router };
