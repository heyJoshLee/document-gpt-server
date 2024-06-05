import express from 'express';
import {
  getAllSubmissions,
  getDocumentsForSubmission,
  getSubmissionById,
  createSubmission,
  deleteSubmissionById,
  updateSubmissionById,
  notifyUser
} from '../controllers/submissionsController.js';
const router = express.Router();

// Define CRUD routes for Resource
router.get('/', getAllSubmissions);
router.get('/:id', getSubmissionById);
router.get('/:id/notifyuser', notifyUser);
router.get('/:id/documents', getDocumentsForSubmission);
router.post('/', createSubmission);
router.patch('/:id', updateSubmissionById);
router.delete('/:id', deleteSubmissionById);

export default router;
