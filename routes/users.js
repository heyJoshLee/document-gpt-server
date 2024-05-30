import express from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, updateUser } from '../controllers/UsersController.js';

const router = express.Router();

// Define routes for Users
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
