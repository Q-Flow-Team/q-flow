import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  handleGetShiftOverview,
  handleCallNext,
  handleStartService,
  handleCompleteService,
  handleSkipTicket,
  handleGetStaffHistory,
  handleGetCounters,
} from '../controllers/staff.controller.js';
import { requireCounterStaff } from '../middlewares/staff.middleware.js';

const router = Router();

// Protect all counter staff routes with JWT Auth
router.use(authenticateToken, requireCounterStaff);

/**
 * @openapi
 * /api/v1/counters/shift-overview:
 *   get:
 *     summary: Get current shift overview and counter statistics
 *     tags: [Counter Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Counter shift details and queue statistics retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 counterNumber:
 *                   type: integer
 *                   example: 1
 *                 counterName:
 *                   type: string
 *                   example: Teller 1
 *                 servedCount:
 *                   type: integer
 *                   example: 14
 *                 currentTicket:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                     ticketNumber:
 *                       type: string
 *                       example: A-102
 *                     status:
 *                       type: string
 *                       example: IN_SERVICE
 *       401:
 *         description: Unauthorized - missing or invalid JWT token
 *       403:
 *         description: Forbidden - requires counter staff role
 */
router.get('/shift-overview', handleGetShiftOverview);
router.get('/history', handleGetStaffHistory);
router.get('/counters', handleGetCounters);

/**
 * @openapi
 * /api/v1/counters/call-next:
 *   post:
 *     summary: Call the next ticket in line to the active counter
 *     tags: [Counter Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Next ticket successfully assigned to counter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ticket called successfully
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     ticketNumber:
 *                       type: string
 *                       example: A-103
 *                     status:
 *                       type: string
 *                       example: CALLED
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No waiting tickets in queue
 */
router.post('/call-next', handleCallNext);

/**
 * @openapi
 * /api/v1/counters/tickets/{id}/start:
 *   post:
 *     summary: Mark ticket service as started
 *     tags: [Counter Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ticket ID
 *     responses:
 *       200:
 *         description: Ticket service marked as in progress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 ticketNumber:
 *                   type: string
 *                   example: A-103
 *                 status:
 *                   type: string
 *                   example: IN_SERVICE
 *       400:
 *         description: Ticket cannot be started from current status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */
router.post('/tickets/:id/start', handleStartService);

/**
 * @openapi
 * /api/v1/counters/tickets/{id}/complete:
 *   post:
 *     summary: Mark ticket service as completed
 *     tags: [Counter Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ticket ID
 *     responses:
 *       200:
 *         description: Ticket service completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 ticketNumber:
 *                   type: string
 *                   example: A-103
 *                 status:
 *                   type: string
 *                   example: COMPLETED
 *       400:
 *         description: Ticket cannot be completed from current status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */
router.post('/tickets/:id/complete', handleCompleteService);

/**
 * @openapi
 * /api/v1/counters/tickets/{id}/skip:
 *   post:
 *     summary: Skip a ticket (e.g., customer no-show)
 *     tags: [Counter Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ticket ID
 *     responses:
 *       200:
 *         description: Ticket skipped successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 ticketNumber:
 *                   type: string
 *                   example: A-103
 *                 status:
 *                   type: string
 *                   example: SKIPPED
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */
router.post('/tickets/:id/skip', handleSkipTicket);

export default router;