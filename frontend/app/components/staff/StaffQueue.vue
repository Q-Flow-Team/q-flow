<script setup lang="ts">
import { Loader2, UserCheck, Zap } from 'lucide-vue-next'
import { formatTime, channelLabel } from '~/utils/format'

const emit = defineEmits<{ selectTicket: [id: string] }>()

const { overview, loading, callNext, issuePriority, trackTicket, error } = useStaffSession()
const showToast = inject<(msg: string) => void>('showToast', () => {})
const search = ref('')
const filter = ref('')
const calling = ref(false)

const issuing = ref(false)
const issueOpen = ref(false)
const issueForm = ref({ customerName: '', phoneNumber: '' })
const issueError = ref('')

const activeTicket = computed(() => overview.value?.activeTicket ?? null)
const waitingCount = computed(() => overview.value?.waitingCount ?? 0)

const rows = computed(() => {
  const list = [...(overview.value?.waiting ?? [])]
  const s = search.value.toLowerCase()
  return list.filter((t) => {
    const matchesSearch =
      !s || t.customerName.toLowerCase().includes(s) || t.ticketNumber.toLowerCase().includes(s)
    const matchesFilter = !filter.value || t.status === filter.value
    return matchesSearch && matchesFilter
  })
})

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

const handleSelect = (t: any) => {
  trackTicket(t)
  emit('selectTicket', t.id)
}

const openIssue = () => {
  issueForm.value = { customerName: '', phoneNumber: '' }
  issueError.value = ''
  issueOpen.value = true
}

const handleIssuePriority = async () => {
  issueError.value = ''
  if (!issueForm.value.customerName.trim() || !issueForm.value.phoneNumber.trim()) {
    issueError.value = 'Customer name and phone number are required.'
    return
  }
  issuing.value = true
  try {
    await issuePriority({
      customerName: issueForm.value.customerName.trim(),
      phoneNumber: issueForm.value.phoneNumber.trim(),
      preferredChannel: 'SMS',
    })
    showToast('Priority ticket issued at position 1')
    issueOpen.value = false
  } catch (err: any) {
    issueError.value = err?.message || 'Failed to issue priority ticket.'
  } finally {
    issuing.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 class="text-xl font-bold text-foreground">Queue</h2>
        <p class="text-sm text-muted-foreground mt-0.5">
          {{ waitingCount }} waiting
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary-light text-primary-dark-text hover:bg-primary-lighter px-3 py-2 text-xs"
          @click="openIssue"
        >
          <Zap class="w-3.5 h-3.5" />
          Issue Priority
        </button>
        <button
          :disabled="calling || waitingCount === 0"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover px-3 py-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          @click="handleCallNext"
        >
          <Loader2 v-if="calling" class="w-4 h-4 animate-spin" />
          <UserCheck v-else class="w-4 h-4" />
          {{ calling ? 'Calling…' : 'Call Next' }}
        </button>
      </div>
    </div>

    <div v-if="issueOpen" class="bg-card border border-border rounded-xl p-6">
      <h3 class="text-sm font-bold text-foreground mb-1">Issue VIP / Priority Ticket</h3>
      <p class="text-xs text-muted-foreground mb-5">Inserted at position 1 — all waiting customers shift down.</p>
      <form @submit.prevent="handleIssuePriority" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="block text-sm font-semibold text-foreground">Customer Name</label>
          <input
            v-model="issueForm.customerName"
            class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            placeholder="e.g. Executive Guest"
            required
          />
        </div>
        <div class="space-y-1.5">
          <label class="block text-sm font-semibold text-foreground">Phone Number</label>
          <input
            v-model="issueForm.phoneNumber"
            type="tel"
            class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            placeholder="+233 20 0000 000"
            required
          />
        </div>
        <p v-if="issueError" class="text-xs text-danger sm:col-span-2">{{ issueError }}</p>
        <div class="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            :disabled="issuing"
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-2 text-xs disabled:opacity-40"
          >
            <Loader2 v-if="issuing" class="w-3.5 h-3.5 animate-spin" />
            {{ issuing ? 'Issuing…' : 'Issue Priority Ticket' }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-2 text-xs border border-border"
            @click="issueOpen = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div v-if="activeTicket" class="bg-primary-lighter border border-primary-border rounded-xl p-4 flex items-center justify-between">
      <div>
        <p class="text-xs font-bold text-primary uppercase tracking-wider">At your counter</p>
        <p class="text-lg font-extrabold text-foreground mt-0.5">
          {{ activeTicket.ticketNumber }} &middot; {{ activeTicket.customerName }}
        </p>
      </div>
      <StatusPill :status="activeTicket.status" />
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="search"
          class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Search by name or ticket number…"
        />
      </div>
      <select
        v-model="filter"
        class="px-3 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Statuses</option>
        <option value="WAITING">Waiting</option>
      </select>
    </div>

    <p v-if="error" class="text-xs text-danger">{{ error }}</p>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <SkeletonTable v-if="loading && !overview" :rows="7" :cols="5" />
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/40">
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Ticket</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Customer</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Channel</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Position</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Joined</th>
              <th class="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="rows.length === 0">
              <td colspan="6" class="px-5 py-14 text-center text-muted-foreground">
                {{ waitingCount > 0 ? 'Use “Call Next” to bring the next customer to your counter.' : 'No customers in queue right now.' }}
              </td>
            </tr>
            <tr
              v-for="t in rows"
              :key="t.id"
              class="transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)] cursor-pointer"
              @click="handleSelect(t)"
            >
              <td class="px-5 py-3.5 font-extrabold text-primary tabular-nums">{{ t.ticketNumber }}</td>
              <td class="px-5 py-3.5">
                <p class="font-semibold text-foreground">{{ t.customerName }}</p>
                <p class="text-xs text-muted-foreground">{{ t.phoneNumber }}</p>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{{ channelLabel(t.preferredChannel) }}</td>
              <td class="px-5 py-3.5 text-muted-foreground tabular-nums">
                {{ t.currentPosition > 0 ? t.currentPosition : '—' }}
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden md:table-cell tabular-nums">{{ formatTime(t.joinedAt) }}</td>
              <td class="px-5 py-3.5 text-right">
                <span class="text-primary text-xs font-bold hover:underline">Details</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>