import express from 'express';
import { logIn } from '../controllers/auth.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', logIn);

export default router;