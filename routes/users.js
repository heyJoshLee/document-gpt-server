import express from 'express';
import { getAllUsers, getUserById, createUser, deleteUserById, updateUserById } from '../controllers/usersController.js';

const router = express.Router();

// Define routes for Users
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
