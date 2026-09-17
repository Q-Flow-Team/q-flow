import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';
import { 
  handleGenerateQRCode, 
  handleCreateCounter, 
  handleGetAllCounters, 
  handleToggleCounter, 
  handleForceUnbind,
  handleCreateUser, 
  handleGetAllUsers, 
  handleResetPassword, 
  handleCreatePriorityTicket,
  handleOverrideTicketStatus,
  handleGetAllTickets,
  handleGetSystemAnalytics,
  handleGetStaffEfficiency 
} from '../controllers/admin.controller.js';

const router = Router();

// Protect all admin routes with JWT auth & Admin role checks
router.use(authenticateToken, requireAdmin);

/**
 * @openapi
 * /api/v1/admin/qr-code:
 *   get:
 *     summary: Generate customer check-in QR code
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR code image/data generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCodeDataUrl:
 *                   type: string
 *                   example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/qr-code', handleGenerateQRCode);

/**
 * @openapi
 * /api/v1/admin/counters:
 *   post:
 *     summary: Create a new service counter
 *     tags: [Admin - Counter Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - counterNumber
 *               - counterName
 *             properties:
 *               counterNumber:
 *                 type: integer
 *                 example: 4
 *               counterName:
 *                 type: string
 *                 example: "Teller 4 - VIP"
 *     responses:
 *       201:
 *         description: Counter created successfully
 *       400:
 *         description: Counter number already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 * 
 *   get:
 *     summary: Retrieve all registered counters
 *     tags: [Admin - Counter Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all counters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   counterNumber:
 *                     type: integer
 *                   counterName:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 *                   activeStaff:
 *                     type: object
 *                     nullable: true
 */
router.post('/counters', handleCreateCounter);
router.get('/counters', handleGetAllCounters);

/**
 * @openapi
 * /api/v1/admin/counters/{id}/toggle:
 *   patch:
 *     summary: Enable or disable a service counter
 *     tags: [Admin - Counter Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique counter ID
 *     responses:
 *       200:
 *         description: Counter status toggled successfully
 *       404:
 *         description: Counter not found
 */
router.patch('/counters/:id/toggle', handleToggleCounter);

/**
 * @openapi
 * /api/v1/admin/counters/{id}/force-unbind:
 *   post:
 *     summary: Force unbind staff assigned to a counter
 *     tags: [Admin - Counter Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique counter ID
 *     responses:
 *       200:
 *         description: Active staff session terminated from counter
 *       400:
 *         description: Counter has no active staff bound
 *       404:
 *         description: Counter not found
 */
router.post('/counters/:id/force-unbind', handleForceUnbind);

/**
 * @openapi
 * /api/v1/admin/users:
 *   post:
 *     summary: Provision a new staff or admin user
 *     tags: [Admin - User Provisioning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - fullName
 *               - password
 *               - role
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: "STF-010"
 *               fullName:
 *                 type: string
 *                 example: "Jane Doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, STAFF]
 *                 example: "STAFF"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Employee ID already exists
 * 
 *   get:
 *     summary: List all system users
 *     tags: [Admin - User Provisioning]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of system users
 */
router.post('/users', handleCreateUser);
router.get('/users', handleGetAllUsers);

/**
 * @openapi
 * /api/v1/admin/users/{id}/reset-password:
 *   post:
 *     summary: Reset password for a specific user
 *     tags: [Admin - User Provisioning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *     responses:
 *       200:
 *         description: User password reset successfully
 *       404:
 *         description: User not found
 */
router.post('/users/:id/reset-password', handleResetPassword);

/**
 * @openapi
 * /api/v1/admin/tickets:
 *   get:
 *     summary: Retrieve all queue tickets across all states
 *     tags: [Admin - Queue Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Optional filter by status (e.g. WAITING, CALLED, COMPLETED, CANCELLED)
 *     responses:
 *       200:
 *         description: Array of queue tickets
 */
router.get('/tickets', handleGetAllTickets);

/**
 * @openapi
 * /api/v1/admin/tickets/priority:
 *   post:
 *     summary: Insert a high-priority ticket at the front of the queue
 *     tags: [Admin - Queue Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phoneNumber
 *               - priorityReason
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "Elderly Customer"
 *               phoneNumber:
 *                 type: string
 *                 example: "233240000000"
 *               priorityReason:
 *                 type: string
 *                 example: "Accessibility need"
 *     responses:
 *       201:
 *         description: Priority ticket generated and placed at head of queue
 */
router.post('/tickets/priority', handleCreatePriorityTicket);

/**
 * @openapi
 * /api/v1/admin/tickets/{id}/override:
 *   patch:
 *     summary: Forcefully override the status of a ticket
 *     tags: [Admin - Queue Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [WAITING, CALLED, IN_SERVICE, COMPLETED, SKIPPED, CANCELLED]
 *                 example: "CANCELLED"
 *     responses:
 *       200:
 *         description: Ticket status overridden successfully
 *       404:
 *         description: Ticket not found
 */
router.patch('/tickets/:id/override', handleOverrideTicketStatus);

/**
 * @openapi
 * /api/v1/admin/analytics/overview:
 *   get:
 *     summary: Get system-wide queue metrics and throughput
 *     tags: [Admin - Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily operational overview, wait times, and ticket totals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTicketsToday:
 *                   type: integer
 *                   example: 142
 *                 averageWaitTimeMinutes:
 *                   type: number
 *                   example: 12.4
 *                 activeWaitingCount:
 *                   type: integer
 *                   example: 8
 */
router.get('/analytics/overview', handleGetSystemAnalytics);

/**
 * @openapi
 * /api/v1/admin/analytics/staff-efficiency:
 *   get:
 *     summary: Get performance metrics for counter staff
 *     tags: [Admin - Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Staff efficiency metrics, completed ticket counts, and average service times
 */
router.get('/analytics/staff-efficiency', handleGetStaffEfficiency);

export default router;