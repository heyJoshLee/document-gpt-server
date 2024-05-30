import express from 'express';
import { getAllUserInfos, getUserInfoById, createUserInfo, deleteUserInfo, updateUserInfo } from '../controllers/UserInfosController.js';

const router = express.Router();

// Define routes for UserInfos
router.get('/', getAllUserInfos);
router.get('/:id', getUserInfoById);
router.post('/', createUserInfo);
router.patch('/:id', updateUserInfo);
router.delete('/:id', deleteUserInfo);

export default router;
