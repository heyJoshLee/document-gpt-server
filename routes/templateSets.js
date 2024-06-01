import express from 'express';
import { getAllTemplateSets, getTemplateSetById, createTemplateSet, deleteTemplateSetById, updateTemplateSetById, getTemplatesForTemplateSetWithId } from '../controllers/templateSetsController.js';
const router = express.Router();

// Define CRUD routes for Resource
router.get('/', getAllTemplateSets);
router.get('/:id', getTemplateSetById);
router.get('/:id/templates', getTemplatesForTemplateSetWithId);
router.post('/', createTemplateSet);
router.patch('/:id', updateTemplateSetById);
router.delete('/:id', deleteTemplateSetById);

export default router;
