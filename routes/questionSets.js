import express from 'express';
import { getAllQuestionSets, getQuestionsForQuestionSet, getQuestionSetById, createQuestionSet, deleteQuestionSet, updateQuestionSet } from '../controllers/questionSetsController.js';

const router = express.Router();

// Define routes for QuestionSets
router.get('/', getAllQuestionSets);
router.get('/:id', getQuestionSetById);
router.get('/:id/questions', getQuestionsForQuestionSet); // This route is used in documentgpt-react/src/redux/actions/questions.js
router.post('/', createQuestionSet);
router.patch('/:id', updateQuestionSet);
router.delete('/:id', deleteQuestionSet);

export default router;
