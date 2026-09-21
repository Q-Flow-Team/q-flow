import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import {
  callNextTicket,
  skipTicket,
  markTicketInService,
  markTicketServed,
  getStaffShiftOverview,
  getStaffHistory,
  getCountersForStaff,
} from '../services/ticket.service.js';
import { getSafeErrorMessage } from '../utils/errorHandler.js';

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
    console.error('Get shift overview failed:', error);
    res.status(400).json({ error: getSafeErrorMessage(error, 'Failed to retrieve shift overview.') });
  }
}

// GET /api/staff/counters
export async function handleGetCounters(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const counters = await getCountersForStaff();
    res.status(200).json({ counters });
  } catch (error: any) {
    console.error('Get counters failed:', error);
    res.status(500).json({ error: getSafeErrorMessage(error, 'Failed to retrieve counters.') });
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

    const tickets = await getStaffHistory(staffId);
    res.status(200).json({ tickets });
  } catch (error: any) {
    console.error('Get staff history failed:', error);
    res.status(400).json({ error: getSafeErrorMessage(error, 'Failed to retrieve ticket history.') });
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
    console.error('Call next failed:', error);
    res.status(400).json({ error: getSafeErrorMessage(error, 'Failed to call next customer.') });
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
    console.error('Start service failed:', error);
    res.status(400).json({ error: getSafeErrorMessage(error, 'Failed to start service.') });
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
    console.error('Complete service failed:', error);
    res.status(400).json({ error: getSafeErrorMessage(error, 'Failed to complete service.') });
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
    console.error('Skip ticket failed:', error);
    res.status(400).json({ error: getSafeErrorMessage(error, 'Failed to skip ticket.') });
  }
}