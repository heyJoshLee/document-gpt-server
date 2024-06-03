import express from 'express';
import { adminCreateUser } from '../controllers/adminController.js';
const router = express.Router();

// Define CRUD routes for Resource
router.post('/users/new', adminCreateUser);

export default router;