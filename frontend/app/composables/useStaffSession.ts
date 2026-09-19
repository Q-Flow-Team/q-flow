import { apiGet, apiPost } from '~/utils/api'

export interface StaffCounter {
  id: string
  counterNumber: number
  counterName: string
  isActive: boolean
  currentStaffId: string | null
}

export interface StaffTicket {
  id: string
  ticketNumber: string
  customerName: string
  phoneNumber: string
  preferredChannel: string
  status: string
  initialPosition: number
  currentPosition: number
  estimatedWaitTimeMinutes: number
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

export interface ShiftOverview {
  counter: StaffCounter
  activeTicket: StaffTicket | null
  waitingCount: number
  waiting: StaffTicket[]
}

export function useStaffSession() {
  const overview = useState<ShiftOverview | null>('staff-overview', () => null)
  const sessionTickets = useState<StaffTicket[]>('staff-session-tickets', () => [])
  const history = useState<StaffTicket[]>('staff-history', () => [])
  const historyLoading = useState<boolean>('staff-history-loading', () => false)
  const loading = useState<boolean>('staff-overview-loading', () => false)
  const error = useState<string>('staff-overview-error', () => '')
  const shiftRequired = useState<boolean>('staff-shift-required', () => false)

  const trackTicket = (ticket?: StaffTicket | null) => {
    if (!ticket?.id) return
    const next = sessionTickets.value.filter((t) => t.id !== ticket.id)
    next.unshift(ticket)
    sessionTickets.value = next.slice(0, 50)
  }

  const refresh = async (silent = false) => {
    if (!silent) loading.value = true
    try {
      const res = await apiGet<ShiftOverview>('/staff/shift-overview')
      overview.value = res
      trackTicket(res.activeTicket)
      error.value = ''
      shiftRequired.value = false
    } catch (err: any) {
      // 400 is returned when no shift is bound or on other business errors
      if (/shift|bound|active counter/i.test(err?.message || '')) {
        shiftRequired.value = true
        overview.value = null
      }
      error.value = err?.message || 'Failed to load shift overview.'
    } finally {
      loading.value = false
    }
  }

  const fetchHistory = async (silent = false) => {
    if (!silent) historyLoading.value = true
    try {
      const res = await apiGet<{ tickets: StaffTicket[] }>('/staff/history')
      history.value = res.tickets || []
      if (sessionTickets.value.length === 0 && history.value.length > 0) {
        sessionTickets.value = [...history.value]
      }
    } catch (err: any) {
      // Non-fatal — the history tab simply stays empty.
    } finally {
      historyLoading.value = false
    }
  }

  const callNext = async () => {
    const res = await apiPost<{ message: string; data: { counter: StaffCounter; ticket: StaffTicket } }>(
      '/staff/call-next',
    )
    trackTicket(res.data?.ticket)
    await refresh(true)
    return res.data?.ticket
  }

  const serveTicket = async (id: string) => {
    const res = await apiPost<{ message: string; ticket: StaffTicket }>(`/staff/tickets/${id}/serve`)
    trackTicket(res.ticket)
    await refresh(true)
    return res.ticket
  }

  const startService = async (id: string) => {
    const res = await apiPost<{ message: string; ticket: StaffTicket }>(`/staff/tickets/${id}/start`)
    trackTicket(res.ticket)
    await refresh(true)
    return res.ticket
  }

  const completeService = async (id: string) => {
    const res = await apiPost<{ message: string; ticket: StaffTicket }>(`/staff/tickets/${id}/complete`)
    trackTicket(res.ticket)
    await refresh(true)
    return res.ticket
  }

  const skipTicket = async (id: string) => {
    const res = await apiPost<{ message: string; ticket: StaffTicket }>(`/staff/tickets/${id}/skip`)
    trackTicket(res.ticket)
    await refresh(true)
    return res.ticket
  }

  const reset = () => {
    overview.value = null
    sessionTickets.value = []
    history.value = []
    error.value = ''
    historyLoading.value = false
    shiftRequired.value = false
  }

  return {
    overview,
    sessionTickets,
    history,
    historyLoading,
    loading,
    error,
    shiftRequired,
    trackTicket,
    refresh,
    fetchHistory,
    callNext,
    serveTicket,
    startService,
    completeService,
    skipTicket,
    reset,
  }
}
