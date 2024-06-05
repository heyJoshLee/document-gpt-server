import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  getDocumentsForUserWithId,
  createUserWithoutPassword
} from '../controllers/usersController.js';

const router = express.Router();

// Define routes for Users
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/documents', getDocumentsForUserWithId);
router.post('/createwithoutpassword', createUserWithoutPassword);
router.post('/', createUser);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
