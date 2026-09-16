<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'

defineEmits<{ selectTicket: [id: string] }>()

const state = useStateStore()
const tickets = computed(() => state.tickets)
const search = ref('')
const filter = ref<string>('All')
const statuses = ['All', 'Waiting', 'Near Turn', 'Now Serving', 'Skipped', 'Served']

const filtered = computed(() => tickets.value.filter(t => {
  const s = search.value.toLowerCase()
  return (!s || t.customer.toLowerCase().includes(s) || String(t.number).includes(s))
    && (filter.value === 'All' || t.status === filter.value)
}))
</script>

<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-xl font-bold text-foreground">Queue</h2>
      <p class="text-sm text-muted-foreground mt-0.5">{{ tickets.length }} tickets today</p>
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
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Joined</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Wait</th>
              <th class="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="px-5 py-14 text-center text-muted-foreground">No customers in queue right now.</td>
            </tr>
            <tr
              v-for="t in filtered"
              :key="t.id"
              class="transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)] cursor-pointer"
              @click="$emit('selectTicket', t.id)"
            >
              <td class="px-5 py-3.5 font-extrabold text-primary tabular-nums">#{{ t.number }}</td>
              <td class="px-5 py-3.5">
                <p class="font-semibold text-foreground">{{ t.customer }}</p>
                <p class="text-xs text-muted-foreground">{{ t.phone }}</p>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{{ t.service }}</td>
              <td class="px-5 py-3.5"><StatusPill :status="t.status" /></td>
              <td class="px-5 py-3.5 text-muted-foreground hidden md:table-cell tabular-nums">{{ t.joined }}</td>
              <td class="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">
                {{ t.status === 'Waiting' || t.status === 'Near Turn' ? `~${t.waitMin} min` : '—' }}
              </td>
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