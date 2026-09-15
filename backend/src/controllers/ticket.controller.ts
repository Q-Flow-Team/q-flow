import type { Request, Response } from 'express';
import { createTicket, callNextTicket, skipTicket } from '../services/ticket.service.js';

const VALID_CHANNELS = ['WHATSAPP', 'SMS', 'NONE'] as const;
type NotificationChannel = (typeof VALID_CHANNELS)[number];

/**
 * POST /api/tickets/check-in
 * Customer checks into the queue
 */
export async function handleCheckIn(req: Request, res: Response): Promise<void> {
  try {
    const { customerName, phoneNumber, preferredChannel } = req.body;

    if (!customerName || !phoneNumber) {
      res.status(400).json({ error: 'Customer name and phone number are required.' });
      return;
    }

    if (preferredChannel !== undefined && !VALID_CHANNELS.includes(preferredChannel)) {
      res.status(400).json({
        error: `Invalid preferredChannel. Must be one of: ${VALID_CHANNELS.join(', ')}.`,
      });
      return;
    }

    const ticket = await createTicket({
      customerName,
      phoneNumber,
      preferredChannel: preferredChannel as NotificationChannel | undefined,
    });
    res.status(201).json({ message: 'Check-in successful', ticket });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to process check-in.' });
  }
}

/**
 * POST /api/tickets/call-next
 * Counter staff requests the next waiting customer
 */
export async function handleCallNext(req: Request, res: Response): Promise<void> {
  try {
    const { staffId } = req.body;

    if (!staffId) {
      res.status(400).json({ error: 'staffId is required.' });
      return;
    }

    const result = await callNextTicket(staffId);
    res.status(200).json({ message: 'Customer called successfully', ...result });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Unable to call next customer.' });
  }
}

/**
 * POST /api/tickets/:id/skip
 * Counter staff skips a non-responsive customer (applies 3-skip auto-cancel)
 */
export async function handleSkip(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { staffId } = req.body;

    if (typeof id !== 'string' || !id || !staffId) {
      res.status(400).json({ error: 'Ticket ID and staffId are required.' });
      return;
    }

    const ticket = await skipTicket(id, staffId);
    res.status(200).json({ message: 'Ticket updated', ticket });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to skip ticket.' });
  }
}