import { Router } from 'express';
import { handleCheckIn } from '../controllers/ticket.controller.js';

const router = Router();

// Customer Endpoints
router.post('/check-in', handleCheckIn);

export default router;