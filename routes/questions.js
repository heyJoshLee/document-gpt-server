import express from 'express';
import { getAllQuestions, getQuestionById, createQuestion, deleteQuestion, updateQuestion } from '../controllers/questionsController.js';
import Question from '../models/Question.js';

const router = express.Router();

// Define routes for Questions
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.post('/', createQuestion);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
