import express from 'express';
import {
  getAllQuestionSets,
  getTemplateSetForQuestionSet,
  getQuestionsForQuestionSet,
  getQuestionSetById,
  createQuestionSet,
  deleteQuestionSet,
  updateQuestionSet,
  addTemplateSetToQuestionSet
} from '../controllers/questionSetsController.js';

const router = express.Router();

// Define routes for QuestionSets
router.get('/', getAllQuestionSets);
router.get('/:id', getQuestionSetById);
router.get('/:id/questions', getQuestionsForQuestionSet); // This route is used in documentgpt-react/src/redux/actions/questions.js
router.get('/:id/templatesets', getTemplateSetForQuestionSet); // This route is used in documentgpt-react/src/redux/actions/questions.js
router.post('/:id/templatesets', addTemplateSetToQuestionSet)
router.post('/', createQuestionSet);
router.patch('/:id', updateQuestionSet);
router.delete('/:id', deleteQuestionSet);




export default router;
