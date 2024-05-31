import express from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../controllers/usersController.js';

const router = express.Router();

// Define routes for Users
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
