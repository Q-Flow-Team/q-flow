import { Router } from 'express';
import { handleLogin, handleBindShift, handleUnbindShift } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { loginLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

// Public auth endpoint
router.post('/login', loginLimiter, handleLogin);

// Protected shift endpoints
router.post('/bind-shift', authenticateToken, handleBindShift);
router.post('/unbind-shift', authenticateToken, handleUnbindShift);

export default router;