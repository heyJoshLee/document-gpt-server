import express from 'express';
import { getAllPlans, getPlanById, createPlan, deletePlanById, updatePlanById } from '../controllers/plansController.js';
const router = express.Router();

// Define CRUD routes for Resource
router.get('/', getAllPlans);
router.get('/:id', getPlanById);
router.post('/', createPlan);
router.patch('/:id', updatePlanById);
router.delete('/:id', deletePlanById);

export default router;
