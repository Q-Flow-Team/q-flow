import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  handleGetShiftOverview,
  handleCallNext,
  handleStartService,
  handleCompleteService,
  handleSkipTicket,
} from '../controllers/staff.controller.js';

const router = Router();

// Protect all counter staff routes with JWT Auth
router.use(authenticateToken);

router.get('/shift-overview', handleGetShiftOverview);
router.post('/call-next', handleCallNext);
router.post('/tickets/:id/start', handleStartService);
router.post('/tickets/:id/complete', handleCompleteService);
router.post('/tickets/:id/skip', handleSkipTicket);

export default router;