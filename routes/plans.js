import express from 'express';
import { getAllPlans, getPlanById, createPlan, deletePlan, updatePlan } from '../controllers/plansController.js';

const router = express.Router();

// Define routes for Plans
router.get('/', getAllPlans);
router.get('/:id', getPlanById);
router.post('/', createPlan);
router.patch('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;