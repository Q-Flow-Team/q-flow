<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'

defineEmits<{ goToQueue: []; goToTicket: [id: string] }>()

const state = useStateStore()
const showToast = inject<(msg: string) => void>('showToast', () => {})

const selectedCounter = computed(() => state.selectedCounter)
const tickets = computed(() => state.tickets)
const waiting = computed(() => tickets.value.filter(t => t.status === 'Waiting').length)
const serving = computed(() => tickets.value.filter(t => t.status === 'Now Serving').length)
const served = computed(() => tickets.value.filter(t => t.status === 'Served').length)
const next = computed(() => tickets.value.find(t => t.status === 'Waiting'))

const handleCallNext = () => {
  const called = state.callNext()
  if (called) showToast(`Calling ticket #${called.number} — ${called.customer}`)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-foreground">Overview</h2>
      <p class="text-sm text-muted-foreground mt-0.5">
        {{ selectedCounter ? `Operating ${selectedCounter.name}` : 'No counter selected' }} &middot; Al-Noor Branch
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard label="Waiting" :value="waiting" sub="in queue" />
      <StatCard label="Now Serving" :value="serving" sub="at counters" />
      <StatCard label="Served Today" :value="served" sub="completed" />
    </div>

    <div class="bg-card border border-border rounded-xl p-6">
      <div class="flex items-start justify-between mb-5 gap-4">
        <div>
          <h3 class="font-bold text-foreground">Next in Queue</h3>
          <p v-if="next" class="text-sm text-muted-foreground mt-0.5">
            Ticket #{{ next.number }} &middot; {{ next.customer }} &middot; {{ next.service }}
          </p>
          <p v-else class="text-sm text-muted-foreground mt-0.5">Queue is empty</p>
        </div>
        <div v-if="next" class="text-4xl font-extrabold text-primary tabular-nums flex-shrink-0">#{{ next.number }}</div>
      </div>
      <button
        :disabled="!next"
        class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base"
        @click="handleCallNext"
      >
        Call Next Customer
      </button>
    </div>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <h3 class="text-sm font-bold text-foreground">Queue</h3>
        <button @click="$emit('goToQueue')" class="text-sm text-primary hover:text-primary-hover font-bold flex items-center gap-1">
          View All
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="divide-y divide-border">
        <button
          v-for="t in tickets.slice(0, 6)"
          :key="t.id"
          @click="$emit('goToTicket', t.id)"
          class="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors text-left"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-sm font-extrabold text-primary w-10 tabular-nums flex-shrink-0">#{{ t.number }}</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-foreground truncate">{{ t.customer }}</p>
              <p class="text-xs text-muted-foreground">{{ t.service }}</p>
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