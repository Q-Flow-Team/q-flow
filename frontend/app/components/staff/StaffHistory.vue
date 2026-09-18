<script setup lang="ts">
import { formatTime, formatDate } from '~/utils/format'

const { history, historyLoading, fetchHistory } = useStaffSession()
const filter = ref('')
const page = ref(1)
const PER = 8

const finalStatuses = ['SERVED', 'SKIPPED', 'CANCELLED', 'AUTO_CANCELLED']

const filtered = computed(() =>
  history.value
    .filter((t) => finalStatuses.includes(t.status))
    .filter((t) => !filter.value || t.status === filter.value),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER)))
const paginated = computed(() => filtered.value.slice((page.value - 1) * PER, page.value * PER))

watch(filter, () => (page.value = 1))

onMounted(() => fetchHistory())
</script>

<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-xl font-bold text-foreground">History</h2>
      <p class="text-sm text-muted-foreground mt-0.5">Tickets you have handled</p>
    </div>

    <div class="flex flex-wrap gap-3 items-center">
      <select v-model="filter" class="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        <option value="">All</option>
        <option value="SERVED">Served</option>
        <option value="SKIPPED">Skipped</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="AUTO_CANCELLED">Auto Cancelled</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <SkeletonTable v-if="historyLoading" :rows="8" :cols="6" />
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/40">
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Ticket</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Customer</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Phone</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Completed</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="paginated.length === 0">
              <td colspan="6" class="px-5 py-14 text-center text-muted-foreground">
                No completed tickets yet.
              </td>
            </tr>
            <tr v-for="t in paginated" :key="t.id" class="transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)]">
              <td class="px-5 py-3.5 font-extrabold text-primary tabular-nums">{{ t.ticketNumber }}</td>
              <td class="px-5 py-3.5 font-semibold text-foreground">{{ t.customerName }}</td>
              <td class="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{{ t.phoneNumber }}</td>
              <td class="px-5 py-3.5"><StatusPill :status="t.status" /></td>
              <td class="px-5 py-3.5 text-muted-foreground hidden md:table-cell tabular-nums">{{ formatDate(t.joinedAt) }}</td>
              <td class="px-5 py-3.5 text-muted-foreground tabular-nums">{{ formatTime(t.completedAt || t.skippedAt || t.cancelledAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!historyLoading && totalPages > 1" class="flex items-center justify-between px-5 py-3.5 border-t border-border">
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