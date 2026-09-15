import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';
import { handleGenerateQRCode, handleCreateCounter, handleGetAllCounters, handleToggleCounter, handleForceUnbind,
    handleCreateUser, handleGetAllUsers, handleResetPassword, 
    handleCreatePriorityTicket,
    handleOverrideTicketStatus} from '../controllers/admin.controller.js';

const router = Router();

// Protect all admin routes with JWT auth & Admin role checks
router.use(authenticateToken, requireAdmin);

// GET /api/v1/admin/qr-code
router.get('/qr-code', handleGenerateQRCode);

// Counter CRUD Endpoints
router.post('/counters', handleCreateCounter);
router.get('/counters', handleGetAllCounters);
router.patch('/counters/:id/toggle', handleToggleCounter);
router.post('/counters/:id/force-unbind', handleForceUnbind);

// User Provisioning Endpoints
router.post('/users', handleCreateUser);
router.get('/users', handleGetAllUsers);
router.post('/users/:id/reset-password', handleResetPassword);

// Queue Overrides & Priority Insertion
router.post('/tickets/priority', handleCreatePriorityTicket);
router.patch('/tickets/:id/override', handleOverrideTicketStatus);

export default router;