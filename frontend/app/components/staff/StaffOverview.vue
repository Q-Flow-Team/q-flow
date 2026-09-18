<script setup lang="ts">
import { Loader2, UserCheck, Play, CheckCircle2, SkipForward } from 'lucide-vue-next'

defineEmits<{ goToQueue: []; goToTicket: [id: string] }>()

const { overview, sessionTickets, loading, error, refresh, callNext, startService, completeService, skipTicket } =
  useStaffSession()
const showToast = inject<(msg: string) => void>('showToast', () => {})

const waiting = computed(() => overview.value?.waitingCount ?? 0)
const activeTicket = computed(() => overview.value?.activeTicket ?? null)
const servedCount = computed(() => sessionTickets.value.filter((t) => t.status === 'SERVED').length)
const counterLabel = computed(() => overview.value?.counter?.counterName || 'No counter bound')
const siteName = import.meta.client ? (localStorage.getItem('qflow_site_name') || 'Al-Noor Branch') : 'Al-Noor Branch'
const calling = ref(false)
const acting = ref(false)

const handleCallNext = async () => {
  calling.value = true
  try {
    const ticket = await callNext()
    if (ticket) showToast(`Calling ${ticket.ticketNumber} — ${ticket.customerName}`)
  } catch (err: any) {
    showToast(err?.message || 'Failed to call next customer')
  } finally {
    calling.value = false
  }
}

const handleStart = async () => {
  if (!activeTicket.value) return
  acting.value = true
  try {
    await startService(activeTicket.value.id)
    showToast(`Service started for ${activeTicket.value.ticketNumber}`)
  } catch (err: any) {
    showToast(err?.message || 'Failed to start service')
  } finally {
    acting.value = false
  }
}

const handleComplete = async () => {
  if (!activeTicket.value) return
  acting.value = true
  try {
    await completeService(activeTicket.value.id)
    showToast(`${activeTicket.value.ticketNumber} completed`)
  } catch (err: any) {
    showToast(err?.message || 'Failed to complete service')
  } finally {
    acting.value = false
  }
}

const handleSkip = async () => {
  if (!activeTicket.value) return
  acting.value = true
  try {
    await skipTicket(activeTicket.value.id)
    showToast(`${activeTicket.value.ticketNumber} skipped`)
  } catch (err: any) {
    showToast(err?.message || 'Failed to skip ticket')
  } finally {
    acting.value = false
  }
}

const recent = computed(() => sessionTickets.value.slice(0, 6))
</script>

<template>
  <div v-if="loading && !overview" class="space-y-6">
    <div class="space-y-2">
      <Skeleton class="h-6 w-40" />
      <Skeleton class="h-4 w-56" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Skeleton v-for="i in 3" :key="i" class="h-28 rounded-xl" />
    </div>
    <Skeleton class="h-72 rounded-xl" />
    <Skeleton class="h-56 rounded-xl" />
  </div>

  <div v-else class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-foreground">Overview</h2>
      <p class="text-sm text-muted-foreground mt-0.5">
        Operating {{ counterLabel }} &middot; {{ siteName }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard label="Waiting" :value="waiting" sub="in queue" />
      <StatCard label="At Counter" :value="activeTicket ? 1 : 0" sub="being served" />
      <StatCard label="Served" :value="servedCount" sub="this session" />
    </div>

    <div class="bg-card border border-border rounded-xl p-6">
      <div class="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 class="font-bold text-foreground">Now Calling</h3>
          <p v-if="activeTicket" class="text-sm text-muted-foreground mt-0.5">
            {{ activeTicket.ticketNumber }} &middot; {{ activeTicket.customerName }}
          </p>
          <p v-else class="text-sm text-muted-foreground mt-0.5">
            {{ waiting > 0 ? `${waiting} customer${waiting === 1 ? '' : 's'} waiting` : 'Queue is empty' }}
          </p>
        </div>
        <div v-if="activeTicket" class="text-3xl font-extrabold text-primary tabular-nums flex-shrink-0">
          {{ activeTicket.ticketNumber }}
        </div>
        <div v-else class="text-3xl font-extrabold text-muted-foreground tabular-nums flex-shrink-0">—</div>
      </div>

      <div v-if="activeTicket" class="mb-4 flex items-center gap-2">
        <StatusPill :status="activeTicket.status" />
        <span class="text-xs text-muted-foreground">{{ activeTicket.preferredChannel }}</span>
      </div>

      <div v-if="activeTicket" class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        <button
          v-if="activeTicket.status === 'CALLED'"
          :disabled="acting"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover px-4 py-2.5 text-sm disabled:opacity-50"
          @click="handleStart"
        >
          <Play class="w-4 h-4" /> Start Service
        </button>
        <button
          v-if="activeTicket.status === 'IN_SERVICE'"
          :disabled="acting"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover px-4 py-2.5 text-sm disabled:opacity-50"
          @click="handleComplete"
        >
          <CheckCircle2 class="w-4 h-4" /> Complete
        </button>
        <button
          v-if="activeTicket.status === 'CALLED' || activeTicket.status === 'IN_SERVICE'"
          :disabled="acting"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground border border-border hover:bg-muted px-4 py-2.5 text-sm disabled:opacity-50"
          @click="handleSkip"
        >
          <SkipForward class="w-4 h-4" /> Skip
        </button>
      </div>

      <button
        :disabled="calling || waiting === 0"
        class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base"
        @click="handleCallNext"
      >
        <Loader2 v-if="calling" class="w-4 h-4 animate-spin" />
        <UserCheck v-else class="w-4 h-4" />
        {{ calling ? 'Calling…' : 'Call Next Customer' }}
      </button>

      <p v-if="error" class="text-xs text-danger mt-3">{{ error }}</p>
    </div>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <h3 class="text-sm font-bold text-foreground">Session Activity</h3>
        <button @click="$emit('goToQueue')" class="text-sm text-primary hover:text-primary-hover font-bold flex items-center gap-1">
          View All
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="divide-y divide-border">
        <p v-if="recent.length === 0" class="px-5 py-8 text-center text-sm text-muted-foreground">
          No tickets handled yet this session.
        </p>
        <button
          v-for="t in recent"
          :key="t.id"
          @click="$emit('goToTicket', t.id)"
          class="w-full flex items-center justify-between px-5 py-3.5 transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)] text-left"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-sm font-extrabold text-primary w-16 tabular-nums flex-shrink-0">{{ t.ticketNumber }}</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-foreground truncate">{{ t.customerName }}</p>
              <p class="text-xs text-muted-foreground">{{ t.phoneNumber }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0 ml-3">
            <StatusPill :status="t.status" />
            <svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
