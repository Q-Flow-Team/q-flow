import { Router } from 'express';
import { handleCancelTicket, handleCheckIn, handleGetTicketStatus } from '../controllers/ticket.controller.js';

const router = Router();

// Customer Endpoints
router.post('/check-in', handleCheckIn);
router.get('/:id/status', handleGetTicketStatus);
router.post('/:id/cancel', handleCancelTicket);

export default router;