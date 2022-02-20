import express from 'express';
import { create } from '@controllers/user.controller';

const router = express.Router();

router.post('/', create);

export { router };
