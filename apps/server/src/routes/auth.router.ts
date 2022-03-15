import { login } from '@controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.post('/login', login);

export { router };
