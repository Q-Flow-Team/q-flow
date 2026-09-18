import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import {
  callNextTicket,
  skipTicket,
  markTicketInService,
  markTicketServed,
  getStaffShiftOverview,
  getStaffQueue,
  getStaffTicketHistory,
} from '../services/ticket.service.js';
import { createPriorityTicket } from '../services/admin.service.js';

// GET /api/staff/shift-overview
export async function handleGetShiftOverview(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const staffId = req.user?.userId;
    if (!staffId) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const overview = await getStaffShiftOverview(staffId);
    res.status(200).json(overview);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to retrieve shift overview.' });
  }
}

// GET /api/staff/queue
export async function handleGetStaffQueue(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const staffId = req.user?.userId;
    if (!staffId) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const queue = await getStaffQueue(staffId);
    res.status(200).json({ queue });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to retrieve queue.' });
  }
}

// GET /api/staff/history
export async function handleGetStaffHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const staffId = req.user?.userId;
    if (!staffId) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const tickets = await getStaffTicketHistory(staffId);
    res.status(200).json({ tickets });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to retrieve ticket history.' });
  }
}

// POST /api/staff/tickets/priority
export async function handleCreateStaffPriorityTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { customerName, phoneNumber, preferredChannel } = req.body;

    if (!customerName || !phoneNumber) {
      res.status(400).json({ error: 'customerName and phoneNumber are required.' });
      return;
    }

    const VALID_CHANNELS = ['WHATSAPP', 'SMS', 'NONE'];
    if (preferredChannel !== undefined && !VALID_CHANNELS.includes(preferredChannel)) {
      res.status(400).json({
        error: `Invalid preferredChannel. Must be one of: ${VALID_CHANNELS.join(', ')}.`,
      });
      return;
    }

    const priorityTicket = await createPriorityTicket({
      customerName,
      phoneNumber,
      preferredChannel,
    });

    res.status(201).json({
      message: 'Priority ticket issued at position 1.',
      ticket: priorityTicket,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to issue priority ticket.' });
  }
}

// POST /api/staff/call-next
export async function handleCallNext(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const staffId = req.user?.userId;
    if (!staffId) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const result = await callNextTicket(staffId);
    res.status(200).json({ message: 'Next customer called.', data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to call next customer.' });
  }
}

// POST /api/staff/tickets/:id/start
export async function handleStartService(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const staffId = req.user?.userId;

    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ticket ID.' });
      return;
    }

    if (!staffId) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const ticket = await markTicketInService(id, staffId);
    res.status(200).json({ message: 'Service started.', ticket });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to start service.' });
  }
}

// POST /api/staff/tickets/:id/complete
export async function handleCompleteService(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ticket ID.' });
      return;
    }

    const ticket = await markTicketServed(id);
    res.status(200).json({ message: 'Service completed.', ticket });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to complete service.' });
  }
}

// POST /api/staff/tickets/:id/skip
export async function handleSkipTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const staffId = req.user?.userId;

    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ticket ID.' });
      return;
    }

    if (!staffId) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const ticket = await skipTicket(id, staffId);
    res.status(200).json({ message: 'Ticket skipped.', ticket });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to skip ticket.' });
  }
}