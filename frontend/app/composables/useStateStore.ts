import { reactive } from 'vue'

type TicketStatus = 'Waiting' | 'Near Turn' | 'Now Serving' | 'Skipped' | 'Served'
type Channel = 'WhatsApp' | 'SMS' | 'None'
type StaffRole = 'Counter Staff' | 'Admin'

interface Ticket {
  id: string
  number: number
  customer: string
  phone: string
  channel: Channel
  status: TicketStatus
  counter: string
  service: string
  joined: string
  waitMin: number
  notes: string[]
}

interface Counter {
  id: string
  name: string
  active: boolean
}

interface StaffMember {
  id: string
  name: string
  email: string
  role: StaffRole
  counter: string
  active: boolean
}

const INITIAL_TICKETS: Ticket[] = [
  { id: 'T001', number: 1, customer: 'Ahmed Al-Rashid', phone: '+971 50 123 4567', channel: 'WhatsApp', status: 'Served', counter: 'Counter 1', service: 'Account Services', joined: '09:04', waitMin: 0, notes: [] },
  { id: 'T002', number: 2, customer: 'Sara Al-Mansoori', phone: '+971 55 234 5678', channel: 'SMS', status: 'Served', counter: 'Counter 2', service: 'Card Services', joined: '09:11', waitMin: 0, notes: [] },
  { id: 'T003', number: 3, customer: 'Khalid Ibrahim', phone: '+971 54 345 6789', channel: 'WhatsApp', status: 'Now Serving', counter: 'Counter 1', service: 'Loan Inquiries', joined: '09:18', waitMin: 0, notes: ['Requested Arabic-speaking agent'] },
  { id: 'T004', number: 4, customer: 'Fatima Al-Zahra', phone: '+971 50 456 7890', channel: 'None', status: 'Near Turn', counter: '', service: 'Account Services', joined: '09:25', waitMin: 4, notes: [] },
  { id: 'T005', number: 5, customer: 'Omar Youssef', phone: '+971 56 567 8901', channel: 'SMS', status: 'Waiting', counter: '', service: 'General Inquiries', joined: '09:31', waitMin: 12, notes: [] },
  { id: 'T006', number: 6, customer: 'Aisha Nasser', phone: '+971 50 678 9012', channel: 'WhatsApp', status: 'Waiting', counter: '', service: 'Card Services', joined: '09:37', waitMin: 17, notes: [] },
  { id: 'T007', number: 7, customer: 'Tariq Hassan', phone: '+971 55 789 0123', channel: 'None', status: 'Waiting', counter: '', service: 'Loan Inquiries', joined: '09:42', waitMin: 22, notes: [] },
  { id: 'T008', number: 8, customer: 'Maryam Al-Hashimi', phone: '+971 54 890 1234', channel: 'WhatsApp', status: 'Waiting', counter: '', service: 'Account Services', joined: '09:48', waitMin: 27, notes: [] },
  { id: 'T009', number: 9, customer: 'Yousef Saleh', phone: '+971 50 901 2345', channel: 'SMS', status: 'Skipped', counter: 'Counter 2', service: 'General Inquiries', joined: '09:52', waitMin: 0, notes: ['No-show after 5 min'] },
  { id: 'T010', number: 10, customer: 'Nour Al-Deen', phone: '+971 56 012 3456', channel: 'WhatsApp', status: 'Waiting', counter: '', service: 'Card Services', joined: '09:55', waitMin: 31, notes: [] },
]

const INITIAL_COUNTERS: Counter[] = [
  { id: 'C1', name: 'Counter 1', active: true },
  { id: 'C2', name: 'Counter 2', active: true },
  { id: 'C3', name: 'Counter 3', active: false },
  { id: 'C4', name: 'Counter 4', active: false },
]

const INITIAL_STAFF: StaffMember[] = [
  { id: 'EMP001', name: 'Mohammed Al-Rashid', email: 'mohammed@branch.ae', role: 'Counter Staff', counter: 'Counter 1', active: true },
  { id: 'EMP002', name: 'Layla Al-Farsi', email: 'layla@branch.ae', role: 'Counter Staff', counter: 'Counter 2', active: true },
  { id: 'EMP003', name: 'Samir Khalil', email: 'samir@branch.ae', role: 'Counter Staff', counter: 'Counter 3', active: false },
  { id: 'EMP004', name: 'Dana Al-Wakeel', email: 'dana@branch.ae', role: 'Admin', counter: '—', active: true },
  { id: 'EMP005', name: 'Rami Barakat', email: 'rami@branch.ae', role: 'Counter Staff', counter: 'Counter 4', active: false },
]

const QR_QUEUES = [
  { id: 'Q1', name: 'Account Services', status: 'Active', created: 'Jan 10, 2024' },
  { id: 'Q2', name: 'Loan Inquiries', status: 'Active', created: 'Jan 10, 2024' },
  { id: 'Q3', name: 'Card Services', status: 'Active', created: 'Jan 12, 2024' },
  { id: 'Q4', name: 'General Inquiries', status: 'Inactive', created: 'Jan 15, 2024' },
]

export const useStateStore = () => {
  const tickets = useState('tickets', () => structuredClone(INITIAL_TICKETS))
  const counters = useState('counters', () => structuredClone(INITIAL_COUNTERS))
  const staffList = useState('staff-list', () => structuredClone(INITIAL_STAFF))
  const selectedCounter = useState<Counter | null>('selected-counter', () => null)

  return reactive({
    tickets,
    counters,
    staffList,
    qrQueues: QR_QUEUES,
    selectedCounter,

    updateTicketStatus: (id: string, status: TicketStatus) => {
      tickets.value = tickets.value.map(t => t.id === id ? { ...t, status } : t)
    },

    toggleCounter: (id: string) => {
      counters.value = counters.value.map(c => c.id === id ? { ...c, active: !c.active } : c)
    },

    addStaff: (m: Omit<StaffMember, 'id'>) => {
      staffList.value = [...staffList.value, { ...m, id: `EMP${String(staffList.value.length + 1).padStart(3, '0')}` }]
    },

    removeStaff: (id: string) => {
      staffList.value = staffList.value.filter(s => s.id !== id)
    },

    callNext: () => {
      const next = tickets.value.find(t => t.status === 'Waiting')
      if (next) {
        tickets.value = tickets.value.map(t => t.id === next.id ? { ...t, status: 'Now Serving' as const } : t)
        return next
      }
      return null
    },
  })
}

export type { Ticket, Counter, StaffMember, TicketStatus, Channel, StaffRole }