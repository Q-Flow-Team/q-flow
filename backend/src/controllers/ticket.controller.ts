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

