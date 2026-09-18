<script setup lang="ts">
import { Loader2, Unlink, Copy, Check, Plus } from 'lucide-vue-next'
import { apiGet, apiPost, apiPatch } from '~/utils/api'

const showToast = inject<(msg: string) => void>('showToast', () => {})

interface Counter {
  id: string
  counterNumber: number
  counterName: string
  isActive: boolean
  currentStaffId: string | null
  currentStaff: { id: string; employeeId: string; fullName: string; role: string } | null
}

const counters = ref<Counter[]>([])
const loading = ref(true)
const errorMsg = ref('')
const showForm = ref(false)
const newNumber = ref<number | null>(null)
const newName = ref('')
const creating = ref(false)
const busyId = ref<string | null>(null)
const copiedId = ref<string | null>(null)

const load = async () => {
  loading.value = true
  try {
    const res = await apiGet<{ counters: Counter[] }>('/admin/counters')
    counters.value = res.counters || []
    errorMsg.value = ''
  } catch (err: any) {
    errorMsg.value = err?.message || 'Failed to load counters.'
  } finally {
    loading.value = false
  }
}

onMounted(load)

const handleCreate = async () => {
  if (!newNumber.value || !newName.value.trim()) return
  creating.value = true
  try {
    const res = await apiPost<{ message: string; counter: Counter }>('/admin/counters', {
      counterNumber: Number(newNumber.value),
      counterName: newName.value.trim(),
    })
    const created = { ...res.counter, currentStaff: null, currentStaffId: null }
    counters.value = [...counters.value, created].sort((a, b) => a.counterNumber - b.counterNumber)
    showToast('Counter created successfully')
    newNumber.value = null
    newName.value = ''
    showForm.value = false
  } catch (err: any) {
    showToast(err?.message || 'Failed to create counter')
  } finally {
    creating.value = false
  }
}

const handleToggle = async (c: Counter) => {
  busyId.value = c.id
  try {
    const res = await apiPatch<{ message: string; counter: Counter }>(`/admin/counters/${c.id}/toggle`, { isActive: !c.isActive })
    const idx = counters.value.findIndex((x) => x.id === c.id)
    if (idx !== -1) {
      counters.value[idx] = {
        ...counters.value[idx],
        isActive: res.counter.isActive,
        currentStaffId: res.counter.isActive ? counters.value[idx].currentStaffId : null,
        currentStaff: res.counter.isActive ? counters.value[idx].currentStaff : null,
      }
    }
    showToast(`${c.counterName} ${c.isActive ? 'deactivated' : 'activated'}`)
  } catch (err: any) {
    showToast(err?.message || 'Failed to update counter')
  } finally {
    busyId.value = null
  }
}

const handleForceUnbind = async (c: Counter) => {
  busyId.value = c.id
  try {
    const res = await apiPost<{ message: string; counter: Counter }>(`/admin/counters/${c.id}/force-unbind`)
    const idx = counters.value.findIndex((x) => x.id === c.id)
    if (idx !== -1) {
      counters.value[idx] = { ...counters.value[idx], currentStaffId: null, currentStaff: null }
    }
    showToast(`${c.currentStaff?.fullName || 'Staff'} unbound from ${c.counterName}`)
  } catch (err: any) {
    showToast(err?.message || 'Failed to unbind staff')
  } finally {
    busyId.value = null
  }
}

const copyId = async (c: Counter) => {
  try {
    await navigator.clipboard.writeText(c.id)
    copiedId.value = c.id
    showToast('Counter ID copied')
    setTimeout(() => (copiedId.value = null), 1500)
  } catch {
    showToast('Unable to copy')
  }
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-foreground">Counters</h2>
        <p class="text-sm text-muted-foreground mt-0.5">{{ counters.length }} counters configured</p>
      </div>
      <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs" @click="showForm = !showForm">
        <Plus class="w-4 h-4" />
        Add Counter
      </button>
    </div>

    <div v-if="showForm" class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-sm font-bold text-foreground mb-3">New Counter</h3>
      <div class="flex flex-col sm:flex-row gap-2.5">
        <input
          v-model.number="newNumber"
          type="number"
          min="1"
          class="w-full sm:w-28 px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="No."
        />
        <input
          v-model="newName"
          class="flex-1 px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Counter name, e.g. VIP / Priority Desk"
          @keydown.enter="handleCreate"
        />
        <button
          :disabled="!newName.trim() || !newNumber || creating"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-2.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          @click="handleCreate"
        >
          <Loader2 v-if="creating" class="w-3.5 h-3.5 animate-spin" />
          Create
        </button>
        <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-2.5 text-xs border border-border" @click="showForm = false">
          Cancel
        </button>
      </div>
    </div>

    <p v-if="errorMsg" class="text-xs text-danger">{{ errorMsg }}</p>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <SkeletonTable v-if="loading" :rows="counters.length || 5" :cols="3" />
      <div v-else-if="counters.length === 0" class="py-14 text-center text-sm text-muted-foreground">
        No counters configured yet.
      </div>
      <div v-else class="divide-y divide-border">
        <div v-for="c in counters" :key="c.id" class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)]">
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0', c.isActive ? 'bg-primary-light text-primary' : 'bg-muted text-muted-foreground']">
              {{ c.counterNumber }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-foreground truncate">{{ c.counterName }}</p>
              <p :class="['text-xs font-semibold', c.isActive ? 'text-success' : 'text-muted-foreground']">
                {{ c.isActive ? 'Active' : 'Inactive' }}
                <span v-if="c.currentStaff" class="text-muted-foreground font-normal">
                  &middot; {{ c.currentStaff.fullName }} ({{ c.currentStaff.employeeId }})
                </span>
              </p>
              <button class="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors" @click="copyId(c)">
                <component :is="copiedId === c.id ? Check : Copy" class="w-3 h-3" />
                {{ c.id }}
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              v-if="c.currentStaff"
              :disabled="busyId === c.id"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-danger border border-danger-border hover:bg-danger-light rounded-lg px-2.5 py-1.5 transition-colors disabled:opacity-50"
              @click="handleForceUnbind(c)"
            >
              <Loader2 v-if="busyId === c.id" class="w-3.5 h-3.5 animate-spin" />
              <Unlink v-else class="w-3.5 h-3.5" />
              Force Unbind
            </button>
            <button
              role="switch"
              :aria-checked="c.isActive"
              :disabled="busyId === c.id"
              @click="handleToggle(c)"
              :class="['relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 cursor-pointer disabled:opacity-50', c.isActive ? 'bg-primary' : 'bg-border']"
            >
              <span :class="['absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200', c.isActive ? 'translate-x-5' : 'translate-x-0']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
