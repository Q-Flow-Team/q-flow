import { prisma } from '../config/db.js';
import { TicketStatus, NotificationTrigger, NotificationChannel } from '@qflow/database/client';
import { broadcastQueueEvent, SOCKET_EVENTS } from '../sockets/queue.socket.js';
import { sendSMSNotification } from './notification.service.js';

/**
 * 1. Helper to record notification logs
 */
async function logNotification(
  ticketId: string,
  channel: NotificationChannel,
  trigger: NotificationTrigger,
  message: string,
  phoneNumber: string
) {
  let delivered = false;

  if (channel === 'SMS') {
    delivered = await sendSMSNotification({ recipient: phoneNumber, message });
  } else if (channel === 'WHATSAPP') {
    // delivered = await sendWhatsAppNotification({ recipient: phoneNumber, message });
  }

  await prisma.notificationLog.create({
    data: { ticketId, channel, trigger, message },
  });

  return delivered;
}

/**
 * 2. Ticket Service Functions
 */

//----------------Join Queue (Customer check-in)--------------
export async function createTicket(data: {
  customerName: string;
  phoneNumber: string;
  preferredChannel?: 'WHATSAPP' | 'SMS' | 'NONE';
}) {
  // Generate daily ticket sequence number (e.g., "A-001")
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const countToday = await prisma.ticket.count({
    where: {
      joinedAt: { gte: todayStart },
    },
  });

  const ticketNumber = `A-${String(countToday + 1).padStart(3, '0')}`;

  // Calculate current waiting count for position and EWT
  const waitingCount = await prisma.ticket.count({
    where: { status: 'WAITING' },
  });

  const position = waitingCount + 1;
  const estimatedWaitTimeMinutes = position * 3; // Approx 3 mins per ticket

  const ticket = await prisma.ticket.create({
    data: {
      ticketNumber,
      customerName: data.customerName,
      phoneNumber: data.phoneNumber,
      preferredChannel: data.preferredChannel || 'WHATSAPP',
      status: TicketStatus.WAITING,
      initialPosition: position,
      currentPosition: position,
      estimatedWaitTimeMinutes,
    },
  });

  // Log initial join notification event
  await logNotification(ticket.id, ticket.preferredChannel, 'INITIAL_JOIN', `Your ticket ${ticketNumber} is confirmed. Initial position: ${position}.`, ticket.phoneNumber);

  return ticket;
}


//-------------Get Live Ticket Status for Customer View--------------

export async function getTicketStatus(ticketId: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: {
      id: true,
      ticketNumber: true,
      customerName: true,
      status: true,
      currentPosition: true,
      estimatedWaitTimeMinutes: true,
      skipCount: true,
      counter: {
        select: {
          counterNumber: true,
          counterName: true,
        },
      },
    },
  });

  if (!ticket) {
    throw new Error('Ticket not found.');
  }

  return ticket;
}

//-------------Customer Self-Cancellation--------------
export async function cancelCustomerTicket(ticketId: string) {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  if (!ticket) {
    throw new Error('Ticket not found.');
  }

  if (ticket.status !== TicketStatus.WAITING && ticket.status !== TicketStatus.CALLED) {
    throw new Error('Only WAITING or CALLED tickets can be cancelled.');
  }

  const cancelledTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: TicketStatus.CANCELLED,
      cancelledAt: new Date(),
      currentPosition: 0,
    },
  });

  // Shift waiting positions for everyone behind this ticket
  if (ticket.status === TicketStatus.WAITING && ticket.currentPosition > 0) {
    await prisma.ticket.updateMany({
      where: {
        status: TicketStatus.WAITING,
        currentPosition: { gt: ticket.currentPosition },
      },
      data: { currentPosition: { decrement: 1 } },
    });
  }

  // 📡 Real-time broadcast
  broadcastQueueEvent(SOCKET_EVENTS.QUEUE_UPDATED, {
    ticketId: cancelledTicket.id,
    ticketNumber: cancelledTicket.ticketNumber,
    status: cancelledTicket.status,
  });

  return cancelledTicket;
}




/**
 * 3. Staff Actions on tickets
 */

//--------- Call Next Ticket for Assigned Counter----------
export async function callNextTicket(staffId: string) {
  // Find the active counter bound to this staff member
  const counter = await prisma.counter.findUnique({
    where: { currentStaffId: staffId },
  });

  if (!counter || !counter.isActive) {
    throw new Error('Staff member is not bound to an active counter shift.');
  }

  // Find the oldest WAITING ticket
  const nextTicket = await prisma.ticket.findFirst({
    where: { status: TicketStatus.WAITING },
    orderBy: { joinedAt: 'asc' },
  });

  if (!nextTicket) {
    throw new Error('No customers currently waiting in the queue.');
  }

  // Update ticket state to CALLED and bind to counter
  const updatedTicket = await prisma.ticket.update({
    where: { id: nextTicket.id },
    data: {
      status: TicketStatus.CALLED,
      calledAt: new Date(),
      counterId: counter.id,
      servicedByStaffId: staffId,
      currentPosition: 0, // Position 0 at counter
    },
  });

  // Log counter call notification
  await logNotification(
    updatedTicket.id, 
    updatedTicket.preferredChannel, 
    'COUNTER_CALL', 
    `It's your turn! Please proceed to ${counter.counterName}.`,
    updatedTicket.phoneNumber
  );

  return { counter, ticket: updatedTicket };
}

//-----------------Skip Ticket (Applies 3-Skip Auto-Cancellation Rule)--------------
export async function skipTicket(ticketId: string, staffId: string) {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) throw new Error('Ticket not found.');

  const newSkipCount = ticket.skipCount + 1;

  if (newSkipCount >= 3) {
    // 3-Skip Rule Triggered: Auto-cancel ticket
    const autoCancelledTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        skipCount: newSkipCount,
        status: TicketStatus.AUTO_CANCELLED,
        cancelledAt: new Date(),
        currentPosition: 0,
      },
    });

    await logNotification(
      ticketId,
      ticket.preferredChannel,
      'INITIAL_JOIN',
      `Your ticket ${ticket.ticketNumber} has been automatically cancelled after 3 skipped calls.`,
      ticket.phoneNumber
    );

    return autoCancelledTicket;
  }

  // Otherwise, re-queue ticket at the back of the waiting line
  const waitingCount = await prisma.ticket.count({ where: { status: 'WAITING' } });
  
  const requeuedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      skipCount: newSkipCount,
      status: TicketStatus.WAITING,
      skippedAt: new Date(),
      counterId: null,
      currentPosition: waitingCount + 1,
    },
  });

  return requeuedTicket;
}



//-------------Mark Ticket as IN_SERVICE (Customer arrives at register)---------------

export async function markTicketInService(ticketId: string, staffId: string) {
  const updatedTicket = await prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket || ticket.status !== TicketStatus.CALLED) {
      throw new Error('Ticket must be in CALLED status to start service.');
    }

    return tx.ticket.update({
      where: { id: ticketId },
      data: {
        status: TicketStatus.IN_SERVICE,
        servicedAt: new Date(),
        servicedByStaffId: staffId,
      },
    });
  });

  // 📡 Real-time broadcast
  broadcastQueueEvent(SOCKET_EVENTS.QUEUE_UPDATED, {
    ticketId: updatedTicket.id,
    ticketNumber: updatedTicket.ticketNumber,
    status: updatedTicket.status,
  });

  return updatedTicket;
}


//-------------Mark Ticket as SERVED (Completed transaction)---------------

export async function markTicketServed(ticketId: string) {
  const updatedTicket = await prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket || ticket.status !== TicketStatus.IN_SERVICE) {
      throw new Error('Ticket must be IN_SERVICE to mark as served.');
    }

    return tx.ticket.update({
      where: { id: ticketId },
      data: {
        status: TicketStatus.SERVED,
        completedAt: new Date(),
        currentPosition: 0,
      },
    });
  });

  // 📡 Real-time broadcast
  broadcastQueueEvent(SOCKET_EVENTS.QUEUE_UPDATED, {
    ticketId: updatedTicket.id,
    ticketNumber: updatedTicket.ticketNumber,
    status: updatedTicket.status,
  });

  return updatedTicket;
}


//-------------Get Active Shift & Queue Overview for Counter Staff---------------
export async function getStaffShiftOverview(staffId: string) {
  const counter = await prisma.counter.findUnique({
    where: { currentStaffId: staffId },
  });

  if (!counter) {
    throw new Error('No active shift bound to this staff account.');
  }

  const currentCalledTicket = await prisma.ticket.findFirst({
    where: {
      counterId: counter.id,
      status: { in: [TicketStatus.CALLED, TicketStatus.IN_SERVICE] },
    },
  });

  const waitingCount = await prisma.ticket.count({
    where: { status: TicketStatus.WAITING },
  });

  return {
    counter,
    activeTicket: currentCalledTicket,
    waitingCount,
  };
}