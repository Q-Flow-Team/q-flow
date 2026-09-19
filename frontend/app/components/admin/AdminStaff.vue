<script setup lang="ts">
import { Loader2, Plus, KeyRound, X } from 'lucide-vue-next'
import { apiGet, apiPost } from '~/utils/api'
import { roleLabel, formatDate } from '~/utils/format'

const showToast = inject<(msg: string) => void>('showToast', () => {})

interface AdminUser {
  id: string
  employeeId: string
  fullName: string
  role: 'ADMIN' | 'COUNTER_STAFF'
  createdAt: string
  activeCounter: { id: string; counterNumber: number; counterName: string; isActive: boolean } | null
}

const users = ref<AdminUser[]>([])
const loading = ref(true)
const errorMsg = ref('')
const search = ref('')
const showForm = ref(false)
const creating = ref(false)
const form = ref({
  employeeId: '',
  fullName: '',
  password: '',
  role: 'COUNTER_STAFF' as 'ADMIN' | 'COUNTER_STAFF',
})

const resetTarget = ref<AdminUser | null>(null)
const newPassword = ref('')
const resetting = ref(false)

const load = async () => {
  loading.value = true
  try {
    const res = await apiGet<{ users: AdminUser[] }>('/admin/users')
    users.value = res.users || []
    errorMsg.value = ''
  } catch (err: any) {
    errorMsg.value = err?.message || 'Failed to load users.'
  } finally {
    loading.value = false
  }
}

onMounted(load)

const filtered = computed(() => {
  const s = search.value.toLowerCase()
  return users.value.filter(
    (u) =>
      !s ||
      u.fullName.toLowerCase().includes(s) ||
      u.employeeId.toLowerCase().includes(s),
  )
})

const handleSubmit = async () => {
  if (!form.value.employeeId.trim() || !form.value.fullName.trim() || !form.value.password) return
  creating.value = true
  try {
    const res = await apiPost<{ message: string; user: AdminUser }>('/admin/users', {
      employeeId: form.value.employeeId.trim(),
      fullName: form.value.fullName.trim(),
      password: form.value.password,
      role: form.value.role,
    })
    users.value = [...users.value, { ...res.user, activeCounter: null }]
    showToast(`Account created for ${form.value.fullName}`)
    form.value = { employeeId: '', fullName: '', password: '', role: 'COUNTER_STAFF' }
    showForm.value = false
  } catch (err: any) {
    showToast(err?.message || 'Failed to create account')
  } finally {
    creating.value = false
  }
}

const openReset = (u: AdminUser) => {
  resetTarget.value = u
  newPassword.value = ''
}

const handleReset = async () => {
  if (!resetTarget.value || !newPassword.value) return
  resetting.value = true
  try {
    await apiPost(`/admin/users/${resetTarget.value.id}/reset-password`, {
      newPassword: newPassword.value,
    })
    showToast(`Password reset for ${resetTarget.value.employeeId}`)
    resetTarget.value = null
    newPassword.value = ''
  } catch (err: any) {
    showToast(err?.message || 'Failed to reset password')
  } finally {
    resetting.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- Reset password modal -->
    <div v-if="resetTarget" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px]" @click="resetTarget = null" />
      <div class="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-base font-bold text-foreground">Reset Password</h3>
            <p class="text-xs text-muted-foreground mt-0.5">{{ resetTarget.fullName }} · {{ resetTarget.employeeId }}</p>
          </div>
          <button class="p-1 rounded hover:bg-muted" @click="resetTarget = null"><X class="w-4 h-4 text-muted-foreground" /></button>
        </div>
        <input
          v-model="newPassword"
          type="text"
          class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="New password (min 6 characters)"
          @keydown.enter="handleReset"
        />
        <div class="flex gap-3 mt-5">
          <button class="flex-1 inline-flex items-center justify-center font-semibold rounded-lg px-4 py-2.5 text-sm bg-transparent text-foreground hover:bg-muted border border-border" @click="resetTarget = null">Cancel</button>
          <button
            :disabled="newPassword.length < 6 || resetting"
            class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-4 py-2.5 text-sm bg-primary text-white hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
            @click="handleReset"
          >
            <Loader2 v-if="resetting" class="w-4 h-4 animate-spin" />
            Reset
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-foreground">Staff</h2>
        <p class="text-sm text-muted-foreground mt-0.5">{{ users.length }} accounts</p>
      </div>
      <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs" @click="showForm = !showForm">
        <Plus class="w-4 h-4" />
        Create Account
      </button>
    </div>

    <div v-if="showForm" class="bg-card border border-border rounded-2xl shadow-card p-6">
      <h3 class="text-sm font-bold text-foreground mb-5">New Staff Account</h3>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Employee ID</label>
            <input v-model="form.employeeId" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm" placeholder="e.g. STF-004" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Full Name</label>
            <input v-model="form.fullName" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm" placeholder="Enter full name" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Password</label>
            <input v-model="form.password" type="text" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm" placeholder="Temporary password" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Role</label>
            <select v-model="form.role" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="COUNTER_STAFF">Counter Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3">
          <button type="submit" :disabled="creating" class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs disabled:opacity-40">
            <Loader2 v-if="creating" class="w-3.5 h-3.5 animate-spin" />
            Create Account
          </button>
          <button type="button" class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-1.5 text-xs border border-border" @click="showForm = false">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        v-model="search"
        class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        placeholder="Search staff…"
      />
    </div>

    <p v-if="errorMsg" class="text-xs text-danger">{{ errorMsg }}</p>

    <div class="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <SkeletonTable v-if="loading" :rows="6" :cols="5" />
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/40">
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Name</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Employee ID</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Role</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Counter</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Created</th>
              <th class="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="px-5 py-14 text-center text-muted-foreground">No accounts found.</td>
            </tr>
            <tr v-for="m in filtered" :key="m.id" class="transition-colors duration-150 hover:bg-muted/50">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{{ m.fullName.charAt(0) }}</div>
                  <span class="font-semibold text-foreground">{{ m.fullName }}</span>
                </div>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{{ m.employeeId }}</td>
              <td class="px-5 py-3.5">
                <span :class="['inline-flex items-center px-2 py-0.5 rounded text-xs font-bold', m.role === 'ADMIN' ? 'bg-primary-light text-primary-dark-text' : 'bg-muted text-muted-foreground']">
                  {{ roleLabel(m.role) }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                {{ m.activeCounter ? `${m.activeCounter.counterName} (#${m.activeCounter.counterNumber})` : '—' }}
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden lg:table-cell tabular-nums">{{ formatDate(m.createdAt) }}</td>
              <td class="px-5 py-3.5 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary-lighter rounded-md px-2 py-1.5 transition-colors" title="Reset password" @click="openReset(m)">
                    <KeyRound class="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
