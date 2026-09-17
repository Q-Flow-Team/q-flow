<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'
import { MessageSquare, Phone, Bell } from 'lucide-vue-next'

defineEmits<{ back: [] }>()

const state = useStateStore()
const showToast = inject<(msg: string) => void>('showToast', () => {})
const selectedTicketId = inject<Ref<string | null>>('selectedTicketId', ref(null))

const ticket = computed(() => state.tickets.find(t => t.id === selectedTicketId.value) ?? null)
const note = ref('')
const notes = ref<string[]>(ticket.value?.notes ?? [])
const skipConfirm = ref(false)
const noShowConfirm = ref(false)

watch(ticket, (t) => { if (t) notes.value = [...t.notes] }, { immediate: true })

const channelIcon = computed(() => {
  if (ticket.value?.channel === 'WhatsApp') return MessageSquare
  if (ticket.value?.channel === 'SMS') return Phone
  return Bell
})

const addNote = () => {
  if (note.value.trim()) {
    notes.value = [...notes.value, note.value.trim()]
    note.value = ''
  }
}

const handleCall = () => {
  if (ticket.value) {
    state.updateTicketStatus(ticket.value.id, 'Now Serving')
    showToast(`Calling ticket #${ticket.value.number}`)
  }
}

const handleComplete = () => {
  if (ticket.value) {
    state.updateTicketStatus(ticket.value.id, 'Served')
    showToast(`Ticket #${ticket.value.number} completed`)
  }
}

const handleSkip = () => {
  if (ticket.value) {
    state.updateTicketStatus(ticket.value.id, 'Skipped')
    showToast(`Ticket #${ticket.value.number} skipped`)
    skipConfirm.value = false
  }
}

const handleNoShow = () => {
  if (ticket.value) {
    state.updateTicketStatus(ticket.value.id, 'Skipped')
    showToast(`Ticket #${ticket.value.number} — no show`)
    noShowConfirm.value = false
  }
}

const handleReopen = () => {
  if (ticket.value) {
    state.updateTicketStatus(ticket.value.id, 'Waiting')
    showToast(`Ticket #${ticket.value.number} reopened`)
  }
}
</script>

<template>
  <div v-if="ticket" class="space-y-5">
    <ConfirmModal
      v-if="skipConfirm"
      title="Skip this customer?"
      :body="`Ticket #${ticket.number} (${ticket.customer}) will be marked as Skipped and removed from the active queue.`"
      confirmLabel="Yes, Skip"
      @confirm="handleSkip"
      @cancel="skipConfirm = false"
    />
    <ConfirmModal
      v-if="noShowConfirm"
      title="Mark as No-Show?"
      :body="`This will mark ticket #${ticket.number} (${ticket.customer}) as no-show and close the ticket.`"
      confirmLabel="Yes, No-Show"
      @confirm="handleNoShow"
      @cancel="noShowConfirm = false"
    />

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
          <div class="text-[56px] font-extrabold text-foreground leading-none tabular-nums mt-1">#{{ ticket.number }}</div>
          <p class="text-sm text-muted-foreground mt-2">{{ ticket.service }} &middot; Joined at {{ ticket.joined }}</p>
        </div>
        <StatusPill :status="ticket.status" />
      </div>
    </div>

    <div class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Customer</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Name</span>
          <span class="text-sm font-semibold text-foreground">{{ ticket.customer }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Phone</span>
          <span class="text-sm font-semibold text-foreground">{{ ticket.phone }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Notifications</span>
          <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <component :is="channelIcon" class="w-4 h-4" />
            {{ ticket.channel }}
          </span>
        </div>
        <div v-if="ticket.counter" class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Counter</span>
          <span class="text-sm font-semibold text-foreground">{{ ticket.counter }}</span>
        </div>
      </div>
    </div>

    <div class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Actions</h3>
      <template v-if="ticket.status === 'Waiting' || ticket.status === 'Near Turn'">
        <div class="flex gap-3">
          <button class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-4 py-2.5 text-sm" @click="handleCall">
            Call Customer
          </button>
          <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-4 py-2.5 text-sm border border-border" @click="skipConfirm = true">
            Skip
          </button>
        </div>
      </template>
      <template v-else-if="ticket.status === 'Now Serving'">
        <div class="flex gap-3">
          <button class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-4 py-2.5 text-sm" @click="handleComplete">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Complete Service
          </button>
          <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-danger border border-danger-border hover:bg-danger-light px-4 py-2.5 text-sm" @click="noShowConfirm = true">
            No-Show
          </button>
        </div>
      </template>
      <template v-else-if="ticket.status === 'Skipped'">
        <button class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary-light text-primary-dark-text hover:bg-primary-border px-4 py-2.5 text-sm" @click="handleReopen">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reopen Ticket
        </button>
      </template>
      <template v-else-if="ticket.status === 'Served'">
        <div class="flex items-center gap-2.5 p-3.5 bg-muted rounded-lg">
          <svg class="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-muted-foreground">This ticket has been completed.</p>
        </div>
      </template>
    </div>

    <div class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Notes</h3>
      <div v-if="notes.length === 0" class="text-sm text-muted-foreground mb-3">No notes yet.</div>
      <div v-else class="space-y-2 mb-3">
        <div v-for="(n, i) in notes" :key="i" class="text-sm text-foreground bg-muted rounded-lg px-3 py-2">{{ n }}</div>
      </div>
      <div class="flex gap-2">
        <input
          v-model="note"
          class="flex-1 px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Add a note…"
          @keydown.enter="addNote"
        />
        <button
          :disabled="!note.trim()"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          @click="addNote"
        >Add</button>
      </div>
    </div>
  </div>
</template>