import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  handleGetShiftOverview,
  handleGetStaffQueue,
  handleGetStaffHistory,
  handleCallNext,
  handleStartService,
  handleCompleteService,
  handleSkipTicket,
  handleCreateStaffPriorityTicket,
} from '../controllers/staff.controller.js';
import { requireCounterStaff } from '../middlewares/staff.middleware.js';

const router = Router();

// Protect all counter staff routes with JWT Auth
router.use(authenticateToken, requireCounterStaff);

router.get('/shift-overview', handleGetShiftOverview);
router.get('/queue', handleGetStaffQueue);
router.get('/history', handleGetStaffHistory);
router.post('/call-next', handleCallNext);
router.post('/tickets/priority', handleCreateStaffPriorityTicket);
router.post('/tickets/:id/start', handleStartService);
router.post('/tickets/:id/complete', handleCompleteService);
router.post('/tickets/:id/skip', handleSkipTicket);

export default router;