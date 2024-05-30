import express from 'express';
import { getAllTemplateSets, getTemplateSetById, createTemplateSet, deleteTemplateSet, updateTemplateSet } from '../controllers/TemplateSetsController.js';

const router = express.Router();

// Define routes for TemplateSets
router.get('/', getAllTemplateSets);
router.get('/:id', getTemplateSetById);
router.post('/', createTemplateSet);
router.patch('/:id', updateTemplateSet);
router.delete('/:id', deleteTemplateSet);

export default router;
