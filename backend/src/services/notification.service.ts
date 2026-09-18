import axios from 'axios';
import { prisma } from '../config/db.js';
import { NotificationChannel, NotificationTrigger } from '@qflow/database/client';

interface SMSPayload {
  recipient: string; // e.g., "0241234567" or "233241234567"
  message: string;
}

interface TicketLike {
  id: string;
  ticketNumber: string;
  customerName?: string;
  phoneNumber: string;
  preferredChannel?: string;
}

// Normalize a phone number into the international digit format expected by the SMS API.
export function normalizePhone(phone?: string | null): string {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  // Local Ghanaian format "02XXXXXXXX" -> "233XXXXXXXXX"
  if (digits.length === 10 && digits.startsWith('0')) {
    return `233${digits.slice(1)}`;
  }
  return digits;
}

export function isSMSConfigured(): boolean {
  return Boolean(process.env.SMS_API_KEY || process.env.BMS_API_KEY);
}

function smsEndpoint(): string {
  return process.env.SMS_API_URL || 'https://api.bms.africa/v1/sms/quick';
}

function smsApiKey(): string {
  return process.env.SMS_API_KEY || process.env.BMS_API_KEY || '';
}

function smsSenderId(): string {
  return process.env.SMS_SENDER_ID || process.env.BMS_SENDER_ID || 'QFlow';
}

export async function sendSMSNotification({ recipient, message }: SMSPayload): Promise<boolean> {
  const apiKey = smsApiKey();
  if (!apiKey) {
    console.warn('[SMS] No SMS_API_KEY/BMS_API_KEY configured — skipping send.');
    return false;
  }

  const normalized = normalizePhone(recipient);
  if (!normalized) {
    console.warn('[SMS] Invalid recipient phone number, skipping send.');
    return false;
  }

  try {
    const response = await axios.post(
      smsEndpoint(),
      {
        recipient: [normalized],
        sender: smsSenderId(),
        message,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.data && (response.data.status === 'success' || response.data.success)) {
      return true;
    }

    console.warn('[SMS] Provider response was not a success:', response.data);
    return false;
  } catch (error: any) {
    console.error('[SMS] Send error:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Log a notification event for a ticket and send the actual SMS to the customer's
 * phone number. Customers have no channel preference — SMS is always used.
 * NEVER throws — notification failures must not break ticket operations.
 */
export async function notifyTicket(
  ticket: TicketLike,
  trigger: NotificationTrigger,
  message: string
): Promise<boolean> {
  try {
    await prisma.notificationLog.create({
      data: {
        ticketId: ticket.id,
        channel: NotificationChannel.SMS,
        trigger,
        message,
      },
    });

    if (!isSMSConfigured()) {
      return false;
    }

    return await sendSMSNotification({ recipient: ticket.phoneNumber, message });
  } catch (error) {
    console.error('[SMS] Failed to record/send notification:', error);
    return false;
  }
}

/** Deduplicate alert-style notifications (e.g. "you're next") for a ticket. */
export async function hasTriggerBeenSent(
  ticketId: string,
  trigger: NotificationTrigger
): Promise<boolean> {
  const existing = await prisma.notificationLog.findFirst({
    where: { ticketId, trigger },
    select: { id: true },
  });
  return Boolean(existing);
}