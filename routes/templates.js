import express from 'express';
import { getAllTemplates, getTemplateById, createTemplate, deleteTemplateById, updateTemplateById } from '../controllers/templatesController.js';

const router = express.Router();

// Define routes for Templates
router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);
router.patch('/:id', updateTemplateById);
router.delete('/:id', deleteTemplateById);

export default router;
