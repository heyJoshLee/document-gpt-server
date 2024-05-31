import express from 'express';
import { getAllTemplates, getTemplateById, createTemplate, deleteTemplate, updateTemplate } from '../controllers/templatesController.js';

const router = express.Router();

// Define routes for Templates
router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);
router.patch('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;
