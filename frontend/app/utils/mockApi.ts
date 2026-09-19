type Role = 'ADMIN' | 'COUNTER_STAFF'

type TicketStatus =
  | 'WAITING'
  | 'CALLED'
  | 'IN_SERVICE'
  | 'SERVED'
  | 'SKIPPED'
  | 'CANCELLED'
  | 'AUTO_CANCELLED'

export interface MockUser {
  id: string
  email: string
  employeeId: string
  fullName: string
  role: Role
  password: string
  createdAt: string
  activeCounterId: string | null
}

export interface MockCounter {
  id: string
  counterNumber: number
  counterName: string
  isActive: boolean
  currentStaffId: string | null
}

export interface MockTicket {
  id: string
  ticketNumber: string
  customerName: string
  phoneNumber: string
  preferredChannel: string
  status: TicketStatus
  priority: boolean
  initialPosition: number
  skipCount: number
  joinedAt: string
  calledAt: string | null
  servicedAt: string | null
  completedAt: string | null
  skippedAt: string | null
  cancelledAt: string | null
  counterId: string | null
  servicedByStaffId: string | null
}

interface MockDb {
  users: MockUser[]
  counters: MockCounter[]
  tickets: MockTicket[]
}

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

const STORAGE_KEY = 'qflow_mock_db_v2'
const AVG_SERVICE_MINUTES = 3
const MAX_SKIPS = 3

let serverDb: MockDb | null = null

const nowIso = () => new Date().toISOString()
const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000).toISOString()
const uid = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function httpError(status: number, message: string): Error {
  const err = new Error(message) as Error & { status: number }
  err.status = status
  return err
}

function seedDb(): MockDb {
  const users: MockUser[] = [
    {
      id: 'usr_admin_1',
      email: 'admin@qflow.com',
      employeeId: 'ADM-001',
      fullName: 'Ama Mensah',
      role: 'ADMIN',
      password: 'admin123',
      createdAt: minutesAgo(60 * 24 * 40),
      activeCounterId: null,
    },
    {
      id: 'usr_staff_1',
      email: 'staff@qflow.com',
      employeeId: 'STF-001',
      fullName: 'Kofi Boateng',
      role: 'COUNTER_STAFF',
      password: 'staff123',
      createdAt: minutesAgo(60 * 24 * 30),
      activeCounterId: 'ctr_1',
    },
    {
      id: 'usr_staff_2',
      email: 'akosua@qflow.com',
      employeeId: 'STF-002',
      fullName: 'Akosua Owusu',
      role: 'COUNTER_STAFF',
      password: 'staff123',
      createdAt: minutesAgo(60 * 24 * 22),
      activeCounterId: null,
    },
    {
      id: 'usr_staff_3',
      email: 'yaw@qflow.com',
      employeeId: 'STF-003',
      fullName: 'Yaw Addo',
      role: 'COUNTER_STAFF',
      password: 'staff123',
      createdAt: minutesAgo(60 * 24 * 12),
      activeCounterId: null,
    },
  ]

  const counters: MockCounter[] = [
    { id: 'ctr_1', counterNumber: 1, counterName: 'General Services', isActive: true, currentStaffId: 'usr_staff_1' },
    { id: 'ctr_2', counterNumber: 2, counterName: 'Account Services', isActive: true, currentStaffId: null },
    { id: 'ctr_3', counterNumber: 3, counterName: 'VIP / Priority Desk', isActive: true, currentStaffId: null },
    { id: 'ctr_4', counterNumber: 4, counterName: 'Enquiries', isActive: false, currentStaffId: null },
  ]

  const ticketSeed: Array<Partial<MockTicket> & { ticketNumber: string; customerName: string; phoneNumber: string; joinedAt: string }> = [
    { ticketNumber: 'A-101', customerName: 'Kwame Asante', phoneNumber: '+233 24 111 2233', joinedAt: minutesAgo(14) },
    { ticketNumber: 'A-102', customerName: 'Efua Sarpong', phoneNumber: '+233 20 555 6677', joinedAt: minutesAgo(11) },
    { ticketNumber: 'A-103', customerName: 'Nana Ansah', phoneNumber: '+233 27 888 9900', joinedAt: minutesAgo(7) },
    { ticketNumber: 'A-104', customerName: 'Adwoa Frimpong', phoneNumber: '+233 26 222 3344', joinedAt: minutesAgo(4) },
    { ticketNumber: 'A-105', customerName: 'Kojo Danso', phoneNumber: '+233 24 777 8899', joinedAt: minutesAgo(1) },
  ]

  const waiting: MockTicket[] = ticketSeed.map((t, i) => ({
    id: uid('tkt'),
    ticketNumber: t.ticketNumber,
    customerName: t.customerName,
    phoneNumber: t.phoneNumber,
    preferredChannel: 'SMS',
    status: 'WAITING',
    priority: false,
    initialPosition: i + 1,
    skipCount: 0,
    joinedAt: t.joinedAt,
    calledAt: null,
    servicedAt: null,
    completedAt: null,
    skippedAt: null,
    cancelledAt: null,
    counterId: null,
    servicedByStaffId: null,
  }))

  const history: MockTicket[] = [
    {
      id: uid('tkt'),
      ticketNumber: 'A-099',
      customerName: 'Mensah Aboagye',
      phoneNumber: '+233 24 000 1122',
      preferredChannel: 'SMS',
      status: 'SERVED',
      priority: false,
      initialPosition: 1,
      skipCount: 0,
      joinedAt: minutesAgo(52),
      calledAt: minutesAgo(40),
      servicedAt: minutesAgo(39),
      completedAt: minutesAgo(34),
      skippedAt: null,
      cancelledAt: null,
      counterId: 'ctr_1',
      servicedByStaffId: 'usr_staff_1',
    },
    {
      id: uid('tkt'),
      ticketNumber: 'A-098',
      customerName: 'Abena Nyarko',
      phoneNumber: '+233 20 333 4455',
      preferredChannel: 'WHATSAPP',
      status: 'SERVED',
      priority: false,
      initialPosition: 2,
      skipCount: 1,
      joinedAt: minutesAgo(70),
      calledAt: minutesAgo(58),
      servicedAt: minutesAgo(56),
      completedAt: minutesAgo(49),
      skippedAt: minutesAgo(60),
      cancelledAt: null,
      counterId: 'ctr_1',
      servicedByStaffId: 'usr_staff_1',
    },
  ]

  return { users, counters, tickets: [...waiting, ...history] }
}

function loadDb(): MockDb {
  if (import.meta.server) {
    if (!serverDb) serverDb = seedDb()
    return serverDb
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as MockDb
  } catch {
    // fall through to a fresh seed
  }
  const fresh = seedDb()
  saveDb(fresh)
  return fresh
}

function saveDb(db: MockDb) {
  if (import.meta.server) {
    serverDb = db
    return
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    // storage unavailable — mutations stay in memory for this request
  }
}

const findUser = (db: MockDb, id: string) => db.users.find((u) => u.id === id) ?? null
const findCounter = (db: MockDb, id: string) => db.counters.find((c) => c.id === id) ?? null

function resolveUser(db: MockDb, token?: string | null): MockUser | null {
  if (!token?.startsWith('mock.')) return null
  return findUser(db, token.slice('mock.'.length))
}

function requireUser(user: MockUser | null): MockUser {
  if (!user) throw httpError(401, 'Your session has expired. Please sign in again.')
  return user
}

function requireAdmin(user: MockUser | null): MockUser {
  const u = requireUser(user)
  if (u.role !== 'ADMIN') throw httpError(403, 'Administrator access required.')
  return u
}

function authUser(db: MockDb, u: MockUser) {
  const counter = u.activeCounterId ? findCounter(db, u.activeCounterId) : null
  return {
    id: u.id,
    email: u.email,
    employeeId: u.employeeId,
    fullName: u.fullName,
    role: u.role,
    activeCounter: counter
      ? {
          id: counter.id,
          counterNumber: counter.counterNumber,
          counterName: counter.counterName,
          isActive: counter.isActive,
          currentStaffId: counter.currentStaffId,
        }
      : null,
  }
}

function counterView(db: MockDb, c: MockCounter) {
  const staff = c.currentStaffId ? findUser(db, c.currentStaffId) : null
  return {
    id: c.id,
    counterNumber: c.counterNumber,
    counterName: c.counterName,
    isActive: c.isActive,
    currentStaffId: c.currentStaffId,
    currentStaff: staff
      ? { id: staff.id, employeeId: staff.employeeId, fullName: staff.fullName, role: staff.role }
      : null,
  }
}

function userView(db: MockDb, u: MockUser) {
  const counter = u.activeCounterId ? findCounter(db, u.activeCounterId) : null
  return {
    id: u.id,
    email: u.email,
    employeeId: u.employeeId,
    fullName: u.fullName,
    role: u.role,
    createdAt: u.createdAt,
    activeCounter: counter
      ? {
          id: counter.id,
          counterNumber: counter.counterNumber,
          counterName: counter.counterName,
          isActive: counter.isActive,
        }
      : null,
  }
}

function waitingQueue(db: MockDb): MockTicket[] {
  return db.tickets
    .filter((t) => t.status === 'WAITING')
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority ? -1 : 1
      return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
    })
}

function ticketView(db: MockDb, t: MockTicket, position = 0) {
  const counter = t.counterId ? findCounter(db, t.counterId) : null
  const currentPosition = t.status === 'WAITING' ? position : 0
  return {
    ...t,
    currentPosition,
    estimatedWaitTimeMinutes:
      t.status === 'WAITING' ? Math.max(0, currentPosition * AVG_SERVICE_MINUTES) : 0,
    counter: counter
      ? { counterNumber: counter.counterNumber, counterName: counter.counterName }
      : null,
  }
}

function nextTicketNumber(db: MockDb): string {
  const max = db.tickets
    .map((t) => Number.parseInt(t.ticketNumber.replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n))
    .reduce((a, b) => Math.max(a, b), 100)
  return `A-${max + 1}`
}

function newTicket(
  db: MockDb,
  data: { customerName: string; phoneNumber: string; preferredChannel?: string; priority?: boolean },
): MockTicket {
  const priority = Boolean(data.priority)
  const position = priority ? 1 : waitingQueue(db).length + 1
  const ticket: MockTicket = {
    id: uid('tkt'),
    ticketNumber: nextTicketNumber(db),
    customerName: data.customerName,
    phoneNumber: data.phoneNumber,
    preferredChannel: data.preferredChannel || 'SMS',
    status: 'WAITING',
    priority,
    initialPosition: position,
    skipCount: 0,
    joinedAt: nowIso(),
    calledAt: null,
    servicedAt: null,
    completedAt: null,
    skippedAt: null,
    cancelledAt: null,
    counterId: null,
    servicedByStaffId: null,
  }
  db.tickets.push(ticket)
  return ticket
}

function staffCounterFor(user: MockUser, db: MockDb): MockCounter {
  const counter = user.activeCounterId ? findCounter(db, user.activeCounterId) : null
  if (!counter || !counter.isActive) {
    throw httpError(400, 'No active counter bound to your shift. Please select a counter first.')
  }
  return counter
}

function activeTicketFor(db: MockDb, counterId: string): MockTicket | null {
  return (
    db.tickets.find(
      (t) => t.counterId === counterId && (t.status === 'CALLED' || t.status === 'IN_SERVICE'),
    ) ?? null
  )
}

export async function handleMockRequest<T = any>(
  path: string,
  method: HttpMethod = 'GET',
  body?: any,
  _query?: Record<string, any>,
  token?: string | null,
): Promise<T> {
  await delay(120)

  const db = loadDb()
  const segments = path
    .split('?')[0]
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
  const m = (method || 'GET').toUpperCase()
  const user = resolveUser(db, token)

  const p0 = segments[0]
  const p1 = segments[1]
  const p2 = segments[2]
  const p3 = segments[3]

  // ---- Auth ----
  if (p0 === 'auth' && p1 === 'login' && m === 'POST') {
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '')
    const found = db.users.find(
      (u) => u.email.toLowerCase() === email && u.password === password,
    )
    if (!found) throw httpError(401, 'Invalid email or password.')
    return { token: `mock.${found.id}`, user: authUser(db, found) } as T
  }

  if (p0 === 'auth' && p1 === 'bind-shift' && m === 'POST') {
    const me = requireUser(user)
    const counterId = String(body?.counterId || '')
    const counter = findCounter(db, counterId)
    if (!counter) throw httpError(404, 'Counter not found.')
    if (!counter.isActive) throw httpError(400, 'That counter is currently inactive.')
    if (counter.currentStaffId && counter.currentStaffId !== me.id) {
      throw httpError(400, 'That counter is already occupied by another staff member.')
    }
    if (me.activeCounterId && me.activeCounterId !== counter.id) {
      const previous = findCounter(db, me.activeCounterId)
      if (previous) previous.currentStaffId = null
    }
    me.activeCounterId = counter.id
    counter.currentStaffId = me.id
    saveDb(db)
    return {
      message: `Bound to ${counter.counterName}`,
      counter: {
        id: counter.id,
        counterNumber: counter.counterNumber,
        counterName: counter.counterName,
        isActive: counter.isActive,
        currentStaffId: counter.currentStaffId,
      },
    } as T
  }

  if (p0 === 'auth' && p1 === 'unbind-shift' && m === 'POST') {
    const me = user
    if (me && me.activeCounterId) {
      const counter = findCounter(db, me.activeCounterId)
      if (counter) counter.currentStaffId = null
      me.activeCounterId = null
      saveDb(db)
    }
    return { message: 'Shift ended.' } as T
  }

  // ---- Customer tickets ----
  if (p0 === 'tickets' && p1 === 'check-in' && m === 'POST') {
    const customerName = String(body?.customerName || '').trim()
    const phoneNumber = String(body?.phoneNumber || '').trim()
    if (!customerName || !phoneNumber) {
      throw httpError(400, 'Customer name and phone number are required.')
    }
    const ticket = newTicket(db, {
      customerName,
      phoneNumber,
      preferredChannel: body?.preferredChannel,
    })
    saveDb(db)
    return { message: 'Added to the queue.', ticket: ticketView(db, ticket, ticket.initialPosition) } as T
  }

  if (p0 === 'tickets' && p2 === 'status' && m === 'GET') {
    const ticket = db.tickets.find((t) => t.id === p1)
    if (!ticket) throw httpError(404, 'Ticket not found.')
    const position = ticket.status === 'WAITING' ? waitingQueue(db).findIndex((t) => t.id === ticket.id) + 1 : 0
    return { ticket: ticketView(db, ticket, position) } as T
  }

  if (p0 === 'tickets' && p2 === 'cancel' && m === 'POST') {
    const ticket = db.tickets.find((t) => t.id === p1)
    if (!ticket) throw httpError(404, 'Ticket not found.')
    if (!['WAITING', 'CALLED'].includes(ticket.status)) {
      throw httpError(400, 'This ticket can no longer be cancelled.')
    }
    ticket.status = 'CANCELLED'
    ticket.cancelledAt = nowIso()
    ticket.counterId = null
    saveDb(db)
    return { message: 'Ticket cancelled.' } as T
  }

  // ---- Staff ----
  if (p0 === 'staff' && p1 === 'shift-overview' && m === 'GET') {
    const me = requireUser(user)
    const counter = staffCounterFor(me, db)
    const waiting = waitingQueue(db)
    const active = activeTicketFor(db, counter.id)
    return {
      counter: {
        id: counter.id,
        counterNumber: counter.counterNumber,
        counterName: counter.counterName,
        isActive: counter.isActive,
        currentStaffId: counter.currentStaffId,
      },
      activeTicket: active ? ticketView(db, active) : null,
      waitingCount: waiting.length,
      waiting: waiting.map((t, i) => ticketView(db, t, i + 1)),
    } as T
  }

  if (p0 === 'staff' && p1 === 'history' && m === 'GET') {
    const me = requireUser(user)
    const terminal = (t: MockTicket) =>
      ['SERVED', 'SKIPPED', 'CANCELLED', 'AUTO_CANCELLED'].includes(t.status)
    let tickets = db.tickets.filter((t) => t.servicedByStaffId === me.id && terminal(t))
    if (tickets.length === 0) {
      tickets = db.tickets.filter(terminal).map((t) => ({ ...t, servicedByStaffId: me.id }))
    }
    const sorted = tickets
      .sort(
        (a, b) =>
          new Date(b.completedAt || b.cancelledAt || b.joinedAt).getTime() -
          new Date(a.completedAt || a.cancelledAt || a.joinedAt).getTime(),
      )
      .map((t) => ticketView(db, t))
    return { tickets: sorted } as T
  }

  if (p0 === 'staff' && p1 === 'call-next' && m === 'POST') {
    const me = requireUser(user)
    const counter = staffCounterFor(me, db)
    if (activeTicketFor(db, counter.id)) {
      throw httpError(400, 'A customer is already at your counter. Complete or skip them first.')
    }
    const next = waitingQueue(db)[0]
    if (!next) throw httpError(400, 'The queue is empty.')
    next.status = 'CALLED'
    next.calledAt = nowIso()
    next.counterId = counter.id
    next.servicedByStaffId = me.id
    saveDb(db)
    return {
      message: `Now calling ${next.ticketNumber}`,
      data: {
        counter: {
          id: counter.id,
          counterNumber: counter.counterNumber,
          counterName: counter.counterName,
          isActive: counter.isActive,
          currentStaffId: counter.currentStaffId,
        },
        ticket: ticketView(db, next),
      },
    } as T
  }

  if (p0 === 'staff' && p1 === 'tickets' && p2 === 'priority' && m === 'POST') {
    requireUser(user)
    const ticket = newTicket(db, {
      customerName: String(body?.customerName || '').trim(),
      phoneNumber: String(body?.phoneNumber || '').trim(),
      preferredChannel: body?.preferredChannel,
      priority: true,
    })
    saveDb(db)
    return { message: 'Priority ticket issued.', ticket: ticketView(db, ticket, 1) } as T
  }

  if (p0 === 'staff' && p1 === 'tickets' && p3 && m === 'POST') {
    const me = requireUser(user)
    const ticket = db.tickets.find((t) => t.id === p2)
    if (!ticket) throw httpError(404, 'Ticket not found.')

    if (p3 === 'serve') {
      if (ticket.status === 'SERVED') {
        return { message: `${ticket.ticketNumber} already served`, ticket: ticketView(db, ticket) } as T
      }
      if (!['WAITING', 'CALLED', 'IN_SERVICE'].includes(ticket.status)) {
        throw httpError(400, 'This ticket cannot be served.')
      }
      ticket.status = 'SERVED'
      ticket.completedAt = nowIso()
      if (!ticket.counterId && me.activeCounterId) ticket.counterId = me.activeCounterId
      ticket.servicedByStaffId = me.id
      saveDb(db)
      return { message: `${ticket.ticketNumber} served`, ticket: ticketView(db, ticket) } as T
    }

    if (p3 === 'start') {
      if (ticket.status !== 'CALLED') throw httpError(400, 'Only a called ticket can be started.')
      ticket.status = 'IN_SERVICE'
      ticket.servicedAt = nowIso()
      if (!ticket.counterId && me.activeCounterId) ticket.counterId = me.activeCounterId
      ticket.servicedByStaffId = me.id
      saveDb(db)
      return { message: `Service started for ${ticket.ticketNumber}`, ticket: ticketView(db, ticket) } as T
    }

    if (p3 === 'complete') {
      if (ticket.status !== 'IN_SERVICE') throw httpError(400, 'Only an in-service ticket can be completed.')
      ticket.status = 'SERVED'
      ticket.completedAt = nowIso()
      ticket.servicedByStaffId = me.id
      saveDb(db)
      return { message: `${ticket.ticketNumber} completed`, ticket: ticketView(db, ticket) } as T
    }

    if (p3 === 'skip') {
      if (!['CALLED', 'IN_SERVICE'].includes(ticket.status)) {
        throw httpError(400, 'Only a called or in-service ticket can be skipped.')
      }
      ticket.skipCount += 1
      ticket.skippedAt = nowIso()
      ticket.servicedByStaffId = me.id
      if (ticket.skipCount >= MAX_SKIPS) {
        ticket.status = 'CANCELLED'
        ticket.cancelledAt = nowIso()
        ticket.counterId = null
      } else {
        ticket.status = 'WAITING'
        ticket.counterId = null
        ticket.priority = false
        ticket.joinedAt = nowIso()
      }
      saveDb(db)
      return { message: `${ticket.ticketNumber} skipped`, ticket: ticketView(db, ticket) } as T
    }
  }

  // ---- Admin: overview ----
  if (p0 === 'admin' && p1 === 'overview' && m === 'GET') {
    requireAdmin(user)
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const tickets = db.tickets
    const isToday = (iso?: string | null) => !!iso && new Date(iso) >= startOfToday

    const servedTickets = tickets.filter((t) => t.status === 'SERVED' && t.joinedAt && t.completedAt)
    const avgWaitMin = servedTickets.length
      ? Math.round(
          servedTickets.reduce(
            (sum, t) =>
              sum +
              (new Date(t.completedAt!).getTime() - new Date(t.joinedAt!).getTime()) / 60000,
            0,
          ) / servedTickets.length,
        )
      : 0

    const recent = [...tickets]
      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
      .slice(0, 8)
      .map((t, i) => ticketView(db, t, t.status === 'WAITING' ? waitingQueue(db).findIndex((x) => x.id === t.id) + 1 : 0))

    return {
      stats: {
        totalToday: tickets.filter((t) => isToday(t.joinedAt)).length,
        servedToday: tickets.filter((t) => t.status === 'SERVED' && isToday(t.completedAt)).length,
        waitingNow: waitingQueue(db).length,
        activeCounters: db.counters.filter((c) => c.isActive).length,
        countersTotal: db.counters.length,
        staffTotal: db.users.filter((u) => u.role === 'COUNTER_STAFF').length,
        staffOnShift: db.users.filter((u) => u.activeCounterId).length,
        servedTotal: tickets.filter((t) => t.status === 'SERVED').length,
        avgWaitMin,
      },
      recent,
      counters: db.counters
        .sort((a, b) => a.counterNumber - b.counterNumber)
        .map((c) => counterView(db, c)),
    } as T
  }

  // ---- Admin: counters ----
  if (p0 === 'admin' && p1 === 'counters') {
    if (m === 'GET' && !p2) {
      requireUser(user)
      const counters = [...db.counters]
        .sort((a, b) => a.counterNumber - b.counterNumber)
        .map((c) => counterView(db, c))
      return { counters } as T
    }

    if (m === 'POST' && !p2) {
      requireAdmin(user)
      const counterNumber = Number(body?.counterNumber)
      const counterName = String(body?.counterName || '').trim()
      if (!counterNumber || !counterName) {
        throw httpError(400, 'Counter number and name are required.')
      }
      if (db.counters.some((c) => c.counterNumber === counterNumber)) {
        throw httpError(409, `Counter ${counterNumber} already exists.`)
      }
      const counter: MockCounter = {
        id: uid('ctr'),
        counterNumber,
        counterName,
        isActive: true,
        currentStaffId: null,
      }
      db.counters.push(counter)
      saveDb(db)
      return { message: 'Counter created.', counter: counterView(db, counter) } as T
    }

    if (m === 'PATCH' && p3 === 'toggle') {
      requireAdmin(user)
      const counter = findCounter(db, p2)
      if (!counter) throw httpError(404, 'Counter not found.')
      const isActive = body?.isActive !== undefined ? Boolean(body.isActive) : !counter.isActive
      counter.isActive = isActive
      if (!isActive && counter.currentStaffId) {
        const staff = findUser(db, counter.currentStaffId)
        if (staff) staff.activeCounterId = null
        counter.currentStaffId = null
      }
      saveDb(db)
      return { message: 'Counter updated.', counter: counterView(db, counter) } as T
    }

    if (m === 'POST' && p3 === 'force-unbind') {
      requireAdmin(user)
      const counter = findCounter(db, p2)
      if (!counter) throw httpError(404, 'Counter not found.')
      if (counter.currentStaffId) {
        const staff = findUser(db, counter.currentStaffId)
        if (staff) staff.activeCounterId = null
        counter.currentStaffId = null
      }
      saveDb(db)
      return { message: 'Staff unbound.', counter: counterView(db, counter) } as T
    }
  }

  // ---- Admin: users ----
  if (p0 === 'admin' && p1 === 'users') {
    if (m === 'GET' && !p2) {
      requireAdmin(user)
      const users = db.users
        .map((u) => userView(db, u))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return { users } as T
    }

    if (m === 'POST' && !p2) {
      requireAdmin(user)
      const email = String(body?.email || '').trim().toLowerCase()
      const employeeId = String(body?.employeeId || '').trim()
      const fullName = String(body?.fullName || '').trim()
      const password = String(body?.password || '')
      const role: Role = body?.role === 'ADMIN' ? 'ADMIN' : 'COUNTER_STAFF'
      if (!email || !fullName || !password) {
        throw httpError(400, 'Email, full name and password are required.')
      }
      if (db.users.some((u) => u.email.toLowerCase() === email)) {
        throw httpError(409, `Email ${email} is already in use.`)
      }
      if (employeeId && db.users.some((u) => u.employeeId.toLowerCase() === employeeId.toLowerCase())) {
        throw httpError(409, `Employee ID ${employeeId} is already in use.`)
      }
      const newUser: MockUser = {
        id: uid('usr'),
        email,
        employeeId: employeeId || 'STF-000',
        fullName,
        role,
        password,
        createdAt: nowIso(),
        activeCounterId: null,
      }
      db.users.push(newUser)
      saveDb(db)
      return { message: 'Account created.', user: userView(db, newUser) } as T
    }

    if (m === 'POST' && p3 === 'reset-password') {
      requireAdmin(user)
      const target = findUser(db, p2)
      if (!target) throw httpError(404, 'User not found.')
      const newPassword = String(body?.newPassword || '')
      if (newPassword.length < 6) {
        throw httpError(400, 'Password must be at least 6 characters.')
      }
      target.password = newPassword
      saveDb(db)
      return { message: 'Password reset.' } as T
    }
  }

  throw httpError(404, `Mock endpoint not implemented: ${m} /${segments.join('/')}`)
}
