<script setup lang="ts">
import { Users, MonitorPlay, CheckCircle2, ArrowRight } from 'lucide-vue-next'

defineEmits<{ goToQueue: [] }>()

const { overview, sessionTickets, loading } = useStaffSession()

const waiting = computed(() => overview.value?.waitingCount ?? 0)
const activeTicket = computed(() => overview.value?.activeTicket ?? null)
const servedCount = computed(() => sessionTickets.value.filter((t) => t.status === 'SERVED').length)
const handledCount = computed(() => sessionTickets.value.filter((t) => !['WAITING', 'CALLED'].includes(t.status)).length)
const counterLabel = computed(() => overview.value?.counter?.counterName || 'No counter bound')
const siteName = import.meta.client ? (localStorage.getItem('qflow_site_name') || 'Al-Noor Branch') : 'Al-Noor Branch'
const greeting = ref('')

onMounted(() => {
  const h = new Date().getHours()
  greeting.value = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
})

const queueLoad = computed(() => Math.min(100, Math.round((waiting.value / 20) * 100)))
const completionRate = computed(() =>
  handledCount.value + waiting.value + (activeTicket.value ? 1 : 0) > 0
    ? Math.round((servedCount.value / (handledCount.value + waiting.value + (activeTicket.value ? 1 : 0))) * 100)
    : 0,
)
</script>

<template>
  <div v-if="loading && !overview" class="space-y-6">
    <div class="space-y-2">
      <Skeleton class="h-7 w-52" />
      <Skeleton class="h-4 w-64" />
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Skeleton v-for="i in 3" :key="i" class="h-32 rounded-2xl" />
    </div>
  </div>

  <div v-else class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="text-xl font-extrabold tracking-tight text-foreground">{{ greeting }}</h2>
        <p class="mt-0.5 text-sm text-muted-foreground">
          Operating <span class="font-semibold text-foreground">{{ counterLabel }}</span> &middot; {{ siteName }}
        </p>
      </div>
      <button
        class="btn btn-sm btn-outline gap-1.5"
        @click="$emit('goToQueue')"
      >
        Manage queue
        <ArrowRight class="h-3.5 w-3.5" />
      </button>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Waiting" :value="waiting" sub="customers in queue" :icon="Users" tone="primary" :progress="queueLoad" />
      <StatCard
        label="At Counter"
        :value="activeTicket ? 1 : 0"
        sub="being served right now"
        :icon="MonitorPlay"
        tone="warning"
        :progress="activeTicket ? 100 : 0"
      />
      <StatCard label="Served" :value="servedCount" sub="this session" :icon="CheckCircle2" tone="success" :progress="completionRate" />
    </div>
  </div>
</template>