<script setup lang="ts">
import { MessageSquare, Phone, Bell, Loader2 } from 'lucide-vue-next'
import { formatTime, formatDateTime, channelLabel } from '~/utils/format'

defineEmits<{ back: [] }>()

const { overview, sessionTickets, startService, completeService, skipTicket } = useStaffSession()
const showToast = inject<(msg: string) => void>('showToast', () => {})
const selectedTicketId = inject<Ref<string | null>>('selectedTicketId', ref(null))

const ticket = computed(() => {
  if (!selectedTicketId.value) return null
  if (overview.value?.activeTicket?.id === selectedTicketId.value) return overview.value.activeTicket
  return sessionTickets.value.find((t) => t.id === selectedTicketId.value) ?? null
})

const acting = ref(false)
const errorMsg = ref('')

watch(ticket, () => { errorMsg.value = '' })

const channelIcon = computed(() => {
  if (ticket.value?.preferredChannel === 'WHATSAPP') return MessageSquare
  if (ticket.value?.preferredChannel === 'SMS') return Phone
  return Bell
})

const run = async (fn: (id: string) => Promise<any>, message: (t: any) => string) => {
  if (!ticket.value) return
  acting.value = true
  errorMsg.value = ''
  try {
    const updated = await fn(ticket.value.id)
    showToast(message(updated))
  } catch (err: any) {
    errorMsg.value = err?.message || 'Action failed.'
    showToast(errorMsg.value)
  } finally {
    acting.value = false
  }
}

const handleStart = () => run(startService, (t) => `Service started for ${t.ticketNumber}`)
const handleComplete = () => run(completeService, (t) => `${t.ticketNumber} completed`)
const handleSkip = () => run(skipTicket, (t) => `${t.ticketNumber} skipped`)
</script>

<template>
  <div v-if="ticket" class="space-y-5">
    <button @click="$emit('back')" class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Queue
    </button>

    <div class="bg-card border border-border rounded-xl p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ticket</p>
          <div class="text-[52px] font-extrabold text-foreground leading-none tabular-nums mt-1">{{ ticket.ticketNumber }}</div>
          <p class="text-sm text-muted-foreground mt-2">Joined at {{ formatTime(ticket.joinedAt) }}</p>
        </div>
        <StatusPill :status="ticket.status" />
      </div>
    </div>

    <div class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Customer</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Name</span>
          <span class="text-sm font-semibold text-foreground">{{ ticket.customerName }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Phone</span>
          <span class="text-sm font-semibold text-foreground">{{ ticket.phoneNumber }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Notifications</span>
          <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <component :is="channelIcon" class="w-4 h-4" />
            {{ channelLabel(ticket.preferredChannel) }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Estimated Wait</span>
          <span class="text-sm font-semibold text-foreground">{{ ticket.estimatedWaitTimeMinutes }} min</span>
        </div>
        <div v-if="ticket.skipCount > 0" class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Skip Count</span>
          <span class="text-sm font-semibold text-danger">{{ ticket.skipCount }} / 3</span>
        </div>
      </div>
    </div>

    <div v-if="ticket.calledAt || ticket.servicedAt || ticket.completedAt" class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Timeline</h3>
      <div class="space-y-2 text-sm">
        <div v-if="ticket.calledAt" class="flex justify-between">
          <span class="text-muted-foreground">Called</span>
          <span class="text-foreground">{{ formatDateTime(ticket.calledAt) }}</span>
        </div>
        <div v-if="ticket.servicedAt" class="flex justify-between">
          <span class="text-muted-foreground">Service started</span>
          <span class="text-foreground">{{ formatDateTime(ticket.servicedAt) }}</span>
        </div>
        <div v-if="ticket.skippedAt" class="flex justify-between">
          <span class="text-muted-foreground">Skipped</span>
          <span class="text-foreground">{{ formatDateTime(ticket.skippedAt) }}</span>
        </div>
        <div v-if="ticket.completedAt" class="flex justify-between">
          <span class="text-muted-foreground">Completed</span>
          <span class="text-foreground">{{ formatDateTime(ticket.completedAt) }}</span>
        </div>
      </div>
    </div>

    <div class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Actions</h3>

      <template v-if="ticket.status === 'CALLED'">
        <div class="flex gap-3">
          <button
            :disabled="acting"
            class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover px-4 py-2.5 text-sm disabled:opacity-50"
            @click="handleStart"
          >
            <Loader2 v-if="acting" class="w-4 h-4 animate-spin" />
            Start Service
          </button>
          <button
            :disabled="acting"
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted border border-border px-4 py-2.5 text-sm disabled:opacity-50"
            @click="handleSkip"
          >
            Skip
          </button>
        </div>
      </template>

      <template v-else-if="ticket.status === 'IN_SERVICE'">
        <div class="flex gap-3">
          <button
            :disabled="acting"
            class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover px-4 py-2.5 text-sm disabled:opacity-50"
            @click="handleComplete"
          >
            <Loader2 v-if="acting" class="w-4 h-4 animate-spin" />
            Complete Service
          </button>
          <button
            :disabled="acting"
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-danger border border-danger-border hover:bg-danger-light px-4 py-2.5 text-sm disabled:opacity-50"
            @click="handleSkip"
          >
            Skip
          </button>
        </div>
      </template>

      <template v-else-if="ticket.status === 'WAITING'">
        <p class="text-sm text-muted-foreground">
          This ticket is waiting in the queue. Use “Call Next” on the overview to bring them to your counter.
        </p>
      </template>

      <template v-else>
        <div class="flex items-center gap-2.5 p-3.5 bg-muted rounded-lg">
          <svg class="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-muted-foreground">No further actions available for this ticket.</p>
        </div>
      </template>

      <p v-if="errorMsg" class="text-xs text-danger mt-3">{{ errorMsg }}</p>
    </div>
  </div>

  <div v-else class="space-y-5">
    <button @click="$emit('back')" class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Queue
    </button>
    <div class="bg-card border border-border rounded-xl p-10 text-center text-sm text-muted-foreground">
      No ticket selected.
    </div>
  </div>
</template>
