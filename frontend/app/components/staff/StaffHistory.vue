<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'

const state = useStateStore()
const from = ref('2024-01-15')
const to = ref('2024-01-15')
const filter = ref('All')
const page = ref(1)
const PER = 5
const statuses = ['All', 'Served', 'Skipped']

const filtered = computed(() => state.tickets.filter(t =>
  (t.status === 'Served' || t.status === 'Skipped') && (filter.value === 'All' || t.status === filter.value)
))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER)))
const paginated = computed(() => filtered.value.slice((page.value - 1) * PER, page.value * PER))
</script>

<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-xl font-bold text-foreground">History</h2>
      <p class="text-sm text-muted-foreground mt-0.5">Past tickets for your counter</p>
    </div>
    <div class="flex flex-wrap gap-3 items-center">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <input type="date" v-model="from" class="pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <span class="text-sm text-muted-foreground">to</span>
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <input type="date" v-model="to" class="pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <select v-model="filter" @change="page = 1" class="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        <option v-for="s in statuses" :key="s">{{ s }}</option>
      </select>
    </div>
    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/40">
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">#</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Customer</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Service</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Counter</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="paginated.length === 0">
              <td colspan="6" class="px-5 py-14 text-center text-muted-foreground">No records found.</td>
            </tr>
            <tr v-for="t in paginated" :key="t.id" class="transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)]">
              <td class="px-5 py-3.5 font-extrabold text-primary tabular-nums">#{{ t.number }}</td>
              <td class="px-5 py-3.5 font-semibold text-foreground">{{ t.customer }}</td>
              <td class="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{{ t.service }}</td>
              <td class="px-5 py-3.5"><StatusPill :status="t.status" /></td>
              <td class="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{{ t.counter || '—' }}</td>
              <td class="px-5 py-3.5 text-muted-foreground tabular-nums">{{ t.joined }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="totalPages > 1" class="flex items-center justify-between px-5 py-3.5 border-t border-border">
        <p class="text-xs text-muted-foreground">Showing {{ (page - 1) * PER + 1 }}–{{ Math.min(page * PER, filtered.length) }} of {{ filtered.length }}</p>
        <div class="flex items-center gap-1">
          <button class="p-1.5 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed" @click="page = Math.max(1, page - 1)" :disabled="page === 1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            @click="page = p"
            :class="['w-7 h-7 rounded text-xs font-bold transition-colors', page === p ? 'bg-primary text-white' : 'hover:bg-muted text-muted-foreground']"
          >
            {{ p }}
          </button>
          <button class="p-1.5 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed" @click="page = Math.min(totalPages, page + 1)" :disabled="page === totalPages">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>