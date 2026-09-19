<script setup lang="ts">
import {
  Users,
  Ticket,
  CheckCircle2,
} from 'lucide-vue-next'
import { apiGet } from '~/utils/api'

interface OverviewStats {
  totalToday: number
  servedToday: number
  waitingNow: number
  activeCounters: number
  countersTotal: number
  staffTotal: number
  staffOnShift: number
  servedTotal: number
  avgWaitMin: number
}

interface OverviewCounter {
  id: string
  counterNumber: number
  counterName: string
  isActive: boolean
  currentStaff: { id: string; employeeId: string; fullName: string; role: string } | null
}

const stats = ref<OverviewStats | null>(null)
const counters = ref<OverviewCounter[]>([])
const loading = ref(true)
const errorMsg = ref('')

let timer: ReturnType<typeof setInterval> | null = null

const load = async (silent = false) => {
  if (!silent) loading.value = true
  try {
    const res = await apiGet<{ stats: OverviewStats; counters: OverviewCounter[] }>('/admin/overview')
    stats.value = res.stats
    counters.value = res.counters || []
    errorMsg.value = ''
  } catch (err: any) {
    if (!silent) errorMsg.value = err?.message || 'Failed to load overview.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
  timer = setInterval(() => load(true), 10000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-xl font-extrabold tracking-tight text-foreground">Overview</h2>
      <p class="mt-0.5 text-sm text-muted-foreground">
        Live metrics for today's branch activity
      </p>
    </div>

    <p v-if="errorMsg" class="text-xs text-danger">{{ errorMsg }}</p>

    <!-- KPI row -->
    <div v-if="loading && !stats" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton v-for="i in 3" :key="i" class="h-32" />
    </div>
    <div v-else-if="stats" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Waiting Now" :value="stats.waitingNow" sub="customers in queue" :icon="Users" tone="neutral" />
      <StatCard label="Total Today" :value="stats.totalToday" sub="tickets issued" :icon="Ticket" tone="neutral" />
      <StatCard label="Served Today" :value="stats.servedToday" sub="tickets completed" :icon="CheckCircle2" tone="success" />
    </div>

    <!-- Counters -->
    <div class="card overflow-hidden">
      <div class="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h3 class="text-sm font-bold text-foreground">Counters</h3>
        <span v-if="stats" class="text-xs font-semibold text-muted-foreground tabular-nums">
          {{ stats.activeCounters }} / {{ stats.countersTotal }} active
        </span>
      </div>
      <div v-if="loading && !stats" class="p-5"><Skeleton class="h-56" /></div>
      <div v-else-if="counters.length === 0" class="px-5 py-14 text-center text-sm text-muted-foreground">
        No counters configured yet.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="table-gmail w-full text-sm">
          <thead class="bg-muted/40">
            <tr class="border-b border-border">
              <th class="th">Counter</th>
              <th class="th">Status</th>
              <th class="th hidden md:table-cell">Staff</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="c in counters" :key="c.id">
              <td class="td">
                <div class="flex items-center gap-3">
                  <span class="text-sm font-bold text-foreground tabular-nums">
                    {{ String(c.counterNumber).padStart(2, '0') }}
                  </span>
                  <span class="truncate font-semibold text-foreground">{{ c.counterName }}</span>
                </div>
              </td>
              <td class="td">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                    c.isActive ? 'bg-success-light text-success' : 'bg-muted text-muted-foreground',
                  ]"
                >
                  <span :class="['h-1.5 w-1.5 rounded-full', c.isActive ? 'bg-success' : 'bg-muted-foreground']" />
                  {{ c.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="td text-muted-foreground hidden md:table-cell font-mono text-xs">
                {{ c.currentStaff ? c.currentStaff.employeeId : 'Unassigned' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>