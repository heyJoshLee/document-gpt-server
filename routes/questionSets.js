import express from 'express';
import { getAllQuestionSets, getQuestionSetById, createQuestionSet, deleteQuestionSet, updateQuestionSet } from '../controllers/questionSetsController.js';

const router = express.Router();

// Define routes for QuestionSets
router.get('/', getAllQuestionSets);
router.get('/:id', getQuestionSetById);
router.post('/', createQuestionSet);
router.patch('/:id', updateQuestionSet);
router.delete('/:id', deleteQuestionSet);

export default router;
