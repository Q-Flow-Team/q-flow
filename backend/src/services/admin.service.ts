import QRCode from 'qrcode';
import { prisma } from '../config/db.js';
import bcrypt from 'bcrypt';
import { UserRole, TicketStatus, NotificationChannel  } from '@qflow/database/client';
import { broadcastQueueEvent, SOCKET_EVENTS } from '../sockets/queue.socket.js';


/**
 * Generates static QR code assets (Base64 Data URL and SVG String)
 * pointing to the customer self-service check-in URL.
 */
export async function generateStaticBranchQRCode(targetUrl: string) {
  try {
    // 1. Generate High-Res PNG Data URL (for UI previews and standard image downloads)
    const pngDataUrl = await QRCode.toDataURL(targetUrl, {
      errorCorrectionLevel: 'H', // High fault tolerance (30% damage/obscuration recovery)
      margin: 2,
      width: 1024, // High resolution for crisp printing
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // 2. Generate Vector SVG String (for professional printing & signage scaling)
    const svgString = await QRCode.toString(targetUrl, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
    });

    return {
      targetUrl,
      pngDataUrl,
      svgString,
    };
  } catch (error) {
    console.error('QR code generation failed:', error);
    throw new Error('Failed to render static QR code assets.');
    }
}



/**
 *  Create a new service counter
 */
export async function createCounter(counterNumber: number, counterName: string) {
  const existingCounter = await prisma.counter.findUnique({
    where: { counterNumber },
  });

  if (existingCounter) {
    throw new Error(`Counter number ${counterNumber} already exists.`);
  }

  return await prisma.counter.create({
    data: {
      counterNumber,
      counterName,
      isActive: true,
    },
  });
}



/**
 *  List all counters with active staff binding details
 */
export async function getAllCounters() {
  return await prisma.counter.findMany({
    orderBy: { counterNumber: 'asc' },
    include: {
      currentStaff: {
        select: {
          id: true,
          employeeId: true,
          fullName: true,
          role: true,
        },
      },
    },
  });
}



/**
 *  Toggle Counter Active Status (Activate/Deactivate)
 */
export async function toggleCounterStatus(counterId: string, isActive: boolean) {
  const counter = await prisma.counter.findUnique({ where: { id: counterId } });
  if (!counter) throw new Error('Counter not found.');

  // If deactivating, force-unbind any attached staff member
  const dataToUpdate: any = { isActive };
  if (!isActive) {
    dataToUpdate.currentStaffId = null;
  }

  return await prisma.counter.update({
    where: { id: counterId },
    data: dataToUpdate,
  });
}



/**
 *  Forcefully Unbind Staff Shift from a Counter
 */
export async function forceUnbindCounterShift(counterId: string) {
  const counter = await prisma.counter.findUnique({ where: { id: counterId } });
  if (!counter) throw new Error('Counter not found.');

  return await prisma.counter.update({
    where: { id: counterId },
    data: { currentStaffId: null },
  });
}




/**
 * 1. Provision a new user (Staff or Admin)
 */
export async function createUser(data: {
  employeeId: string;
  fullName: string;
  password: string;
  role?: UserRole;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { employeeId: data.employeeId },
  });

  if (existingUser) {
    throw new Error(`Employee ID ${data.employeeId} is already registered.`);
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      employeeId: data.employeeId,
      fullName: data.fullName,
      passwordHash,
      role: data.role || UserRole.COUNTER_STAFF,
    },
    select: {
      id: true,
      employeeId: true,
      fullName: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}



/**
 * 2. List all staff/admin users with their active shift status
 */
export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      employeeId: true,
      fullName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      activeCounter: {
        select: {
          id: true,
          counterNumber: true,
          counterName: true,
        },
      },
    },
  });
}



/**
 * 3. Reset a user's password
 */
export async function resetUserPassword(userId: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found.');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  return { message: `Password successfully reset for employee ID: ${user.employeeId}` };
}



/**
 * 1. Insert VIP / Priority Ticket at the head of the WAITING queue (Position 1)
 */
export async function createPriorityTicket(data: {
  customerName: string;
  phoneNumber: string;
  preferredChannel?: NotificationChannel;
}) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const priorityTicket = await prisma.$transaction(async (tx) => {
    const countToday = await tx.ticket.count({
      where: { joinedAt: { gte: todayStart } },
    });

    const ticketNumber = `VIP-${String(countToday + 1).padStart(3, '0')}`;

    // Shift current WAITING tickets down by 1 position
    await tx.ticket.updateMany({
      where: { status: TicketStatus.WAITING },
      data: { currentPosition: { increment: 1 } },
    });

    // Create VIP ticket at currentPosition = 1
    return tx.ticket.create({
      data: {
        ticketNumber,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        preferredChannel: data.preferredChannel || NotificationChannel.WHATSAPP,
        status: TicketStatus.WAITING,
        initialPosition: 1,
        currentPosition: 1,
        estimatedWaitTimeMinutes: 1, // High priority estimate
      },
    });
  });

  // Broadcast real-time queue update
  broadcastQueueEvent(SOCKET_EVENTS.TICKET_CREATED, {
    ticketId: priorityTicket.id,
    ticketNumber: priorityTicket.ticketNumber,
    isPriority: true,
    position: 1,
  });

  return priorityTicket;
}



/**
 * 2. Manual Ticket State Override (Cancel, Re-queue, Force Complete, etc.)
 */
export async function overrideTicketStatus(
  ticketId: string,
  newStatus: TicketStatus,
  reason?: string
) {
  const updatedTicket = await prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new Error('Ticket not found.');

    const updateData: any = {
      status: newStatus,
    };

    // State-specific timestamps and position resets
    switch (newStatus) {
      case TicketStatus.CANCELLED:
      case TicketStatus.AUTO_CANCELLED:
        updateData.cancelledAt = new Date();
        updateData.currentPosition = 0;
        break;
      case TicketStatus.SERVED:
        updateData.completedAt = new Date();
        updateData.currentPosition = 0;
        break;
      case TicketStatus.SKIPPED:
        updateData.skippedAt = new Date();
        updateData.currentPosition = 0;
        break;
      case TicketStatus.CALLED:
        updateData.calledAt = new Date();
        updateData.currentPosition = 0;
        break;
      case TicketStatus.IN_SERVICE:
        updateData.servicedAt = new Date();
        updateData.currentPosition = 0;
        break;
      case TicketStatus.WAITING: {
        // Re-queue ticket at the end of the line
        const waitingCount = await tx.ticket.count({ where: { status: TicketStatus.WAITING } });
        updateData.currentPosition = waitingCount + 1;
        updateData.skipCount = 0; // Reset skips on manual admin re-queue
        break;
      }
    }

    return tx.ticket.update({
      where: { id: ticketId },
      data: updateData,
    });
  });

  // Broadcast update to display boards
  broadcastQueueEvent(SOCKET_EVENTS.QUEUE_UPDATED, {
    ticketNumber: updatedTicket.ticketNumber,
    status: updatedTicket.status,
    reason: reason || 'Admin override executed',
  });

  return updatedTicket;
}