import express from 'express';
import { login } from '@controllers/admin.controller';

const router = express.Router();

router.post('/login', login);

export { router };
