import express from 'express';
import { getAllDocuments, getDocumentById, userCreateDocument, createDocument, deleteDocumentById, updateDocumentById, generateWithChatGpt, testControllerFunction } from '../controllers/documentsController.js';
const router = express.Router();

// Define CRUD routes for Resource
router.get('/', getAllDocuments);
router.get('/test', testControllerFunction)
router.get('/:id', getDocumentById);
router.post('/userCreateDocument', userCreateDocument);
router.post('/', createDocument);
router.patch('/:id/generateWithChatGpt', generateWithChatGpt); // Add route for
router.patch('/:id', updateDocumentById);
router.delete('/:id', deleteDocumentById);

export default router;
