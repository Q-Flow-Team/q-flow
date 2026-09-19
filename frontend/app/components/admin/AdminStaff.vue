<script setup lang="ts">
import { Loader2, Plus, KeyRound, X, Search, ShieldCheck, UserRound } from 'lucide-vue-next'
import { apiGet, apiPost } from '~/utils/api'
import { roleLabel, formatDate } from '~/utils/format'
import { trim, isValidEmail, isValidName, isValidEmployeeId, passwordIssues, emailMessage, nameMessage } from '~/utils/validate'

const showToast = inject<(msg: string) => void>('showToast', () => {})

interface AdminUser {
  id: string
  email: string
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
  email: '',
  employeeId: '',
  fullName: '',
  password: '',
  role: 'COUNTER_STAFF' as 'ADMIN' | 'COUNTER_STAFF',
})
const formErrors = ref({
  email: '',
  employeeId: '',
  fullName: '',
  password: '',
})
const touched = ref<Record<string, boolean>>({})

const validateForm = () => {
  const errors = { email: '', employeeId: '', fullName: '', password: '' }
  const ev = trim(form.value.email)
  if (!ev) errors.email = 'Email is required.'
  else if (!isValidEmail(ev)) errors.email = emailMessage(ev)
  if (!trim(form.value.fullName)) errors.fullName = 'Full name is required.'
  else if (!isValidName(form.value.fullName)) errors.fullName = nameMessage(form.value.fullName)
  if (!isValidEmployeeId(form.value.employeeId)) errors.employeeId = 'Employee ID must be 2–20 characters using letters, numbers, dashes or underscores.'
  if (!form.value.password) errors.password = 'Temporary password is required.'
  else errors.password = passwordIssues(form.value.password)[0] || ''
  formErrors.value = errors
  return !Object.values(errors).some(Boolean)
}

const validateField = (field: 'email' | 'employeeId' | 'fullName' | 'password') => {
  touched.value[field] = true
  validateForm()
}

const resetIssues = computed(() => (newPassword.value ? passwordIssues(newPassword.value) : []))

const createError = ref('')

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
      u.email.toLowerCase().includes(s) ||
      u.employeeId.toLowerCase().includes(s),
  )
})

const handleSubmit = async () => {
  createError.value = ''
  touched.value = { email: true, employeeId: true, fullName: true, password: true }
  if (!validateForm()) return
  creating.value = true
  try {
    const res = await apiPost<{ message: string; user: AdminUser }>('/admin/users', {
      email: form.value.email.trim().toLowerCase(),
      employeeId: form.value.employeeId.trim() || undefined,
      fullName: form.value.fullName.trim(),
      password: form.value.password,
      role: form.value.role,
    })
    users.value = [...users.value, { ...res.user, activeCounter: null }]
    showToast(`Account created for ${form.value.fullName}`)
    form.value = { email: '', employeeId: '', fullName: '', password: '', role: 'COUNTER_STAFF' }
    showForm.value = false
  } catch (err: any) {
    createError.value = err?.message || 'Failed to create account'
    showToast(createError.value)
  } finally {
    creating.value = false
  }
}

const openReset = (u: AdminUser) => {
  resetTarget.value = u
  newPassword.value = ''
}

const handleReset = async () => {
  if (!resetTarget.value || resetIssues.value.length > 0) return
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
    <div
      v-if="resetTarget"
      class="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-[2px]"
      @click.self="resetTarget = null"
    >
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="card relative w-full max-w-sm p-6 shadow-pop">
          <div class="mb-4 flex items-start justify-between">
            <div>
              <h3 class="text-base font-bold text-foreground">Reset Password</h3>
              <p class="mt-0.5 text-xs text-muted-foreground">{{ resetTarget.fullName }} · {{ resetTarget.employeeId }}</p>
            </div>
            <button class="cursor-pointer rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" @click="resetTarget = null">
              <X class="h-4 w-4" />
            </button>
          </div>
          <input
            v-model="newPassword"
            type="text"
            autocomplete="new-password"
            class="input"
            :class="resetIssues.length > 0 && 'border-danger'"
            placeholder="New password (min 8 chars, letter + number)"
          />
          <p
            v-if="resetIssues.length > 0"
            class="mt-1 text-xs text-danger"
          >
            {{ resetIssues[0] }}
          </p>
          <div class="mt-5 flex gap-3">
            <button class="btn btn-md btn-outline flex-1" @click="resetTarget = null">Cancel</button>
            <button
              :disabled="resetIssues.length > 0 || resetting"
              class="btn btn-md btn-primary flex-1"
              @click="handleReset"
            >
              <Loader2 v-if="resetting" class="h-4 w-4 animate-spin" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold tracking-tight text-foreground">Staff</h2>
      </div>
      <button class="btn btn-sm btn-primary" @click="showForm = true">
        <Plus class="h-4 w-4" />
        Create Account
      </button>
    </div>

    <!-- Create account modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-[2px]"
      @click.self="showForm = false"
    >
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="card relative w-full max-w-xl p-6 shadow-pop">
          <div class="mb-5 flex items-start justify-between">
            <div>
              <h3 class="text-base font-bold text-foreground">New Staff Account</h3>
              <p class="mt-0.5 text-xs text-muted-foreground">Create an account for a counter staff member or admin.</p>
            </div>
            <button class="cursor-pointer rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" @click="showForm = false">
              <X class="h-4 w-4" />
            </button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="label" for="emp-email">Email</label>
                <input id="emp-email" v-model="form.email" type="email" autocomplete="email" class="input" :class="touched.email && formErrors.email && 'border-danger'" placeholder="e.g. staff@qflow.com" @blur="validateField('email')" @input="touched.email && validateField('email')" />
                <p v-if="touched.email && formErrors.email" class="mt-1 text-xs text-danger">{{ formErrors.email }}</p>
              </div>
              <div>
                <label class="label" for="full-name">Full Name</label>
                <input id="full-name" v-model="form.fullName" autocomplete="name" class="input" :class="touched.fullName && formErrors.fullName && 'border-danger'" placeholder="Enter full name" @blur="validateField('fullName')" @input="touched.fullName && validateField('fullName')" />
                <p v-if="touched.fullName && formErrors.fullName" class="mt-1 text-xs text-danger">{{ formErrors.fullName }}</p>
              </div>
              <div>
                <label class="label" for="emp-id">Employee ID <span class="text-muted-foreground font-normal">(optional)</span></label>
                <input id="emp-id" v-model="form.employeeId" autocomplete="off" class="input" :class="touched.employeeId && formErrors.employeeId && 'border-danger'" placeholder="e.g. STF-004" @blur="validateField('employeeId')" @input="touched.employeeId && validateField('employeeId')" />
                <p v-if="touched.employeeId && formErrors.employeeId" class="mt-1 text-xs text-danger">{{ formErrors.employeeId }}</p>
              </div>
              <div>
                <label class="label" for="temp-pass">Password</label>
                <input id="temp-pass" v-model="form.password" type="text" autocomplete="new-password" class="input" :class="touched.password && formErrors.password && 'border-danger'" placeholder="Temporary password" @blur="validateField('password')" @input="touched.password && validateField('password')" />
                <p v-if="touched.password && formErrors.password" class="mt-1 text-xs text-danger">{{ formErrors.password }}</p>
              </div>
              <div>
                <label class="label" for="role">Role</label>
                <select id="role" v-model="form.role" class="input">
                  <option value="COUNTER_STAFF">Counter Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <p v-if="createError" class="mb-3 text-xs text-danger">{{ createError }}</p>
            <div class="flex flex-wrap gap-3">
              <button type="submit" :disabled="creating" class="btn btn-md btn-primary">
                <Loader2 v-if="creating" class="h-4 w-4 animate-spin" />
                Create Account
              </button>
              <button type="button" class="btn btn-md btn-outline" @click="showForm = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="relative sm:w-80">
      <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        v-model="search"
        class="input pl-9"
        placeholder="Search staff…"
      />
    </div>

    <p v-if="errorMsg" class="text-xs text-danger">{{ errorMsg }}</p>

    <!-- Table -->
    <div class="card overflow-hidden">
      <SkeletonTable v-if="loading" :rows="6" :cols="5" />
      <div v-else class="overflow-x-auto">
        <table class="table-gmail w-full text-sm">
          <thead class="bg-muted/40">
            <tr class="border-b border-border">
              <th class="th">Name</th>
              <th class="th">Email</th>
              <th class="th">Employee ID</th>
              <th class="th">Role</th>
              <th class="th">Counter</th>
              <th class="th">Created</th>
              <th class="th text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="px-5 py-14 text-center text-muted-foreground">No accounts found.</td>
            </tr>
            <tr v-for="m in filtered" :key="m.id">
              <td class="td whitespace-nowrap">
                <span class="block truncate font-semibold text-foreground">{{ m.fullName }}</span>
              </td>
              <td class="td text-muted-foreground whitespace-nowrap">{{ m.email }}</td>
              <td class="td text-muted-foreground whitespace-nowrap font-mono text-xs">{{ m.employeeId }}</td>
              <td class="td whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ring-black/5 dark:ring-white/10',
                    m.role === 'ADMIN' ? 'bg-warning-light text-warning' : 'bg-muted text-muted-foreground',
                  ]"
                >
                  <ShieldCheck v-if="m.role === 'ADMIN'" class="h-3 w-3" />
                  <UserRound v-else class="h-3 w-3" />
                  {{ roleLabel(m.role) }}
                </span>
              </td>
              <td class="td text-muted-foreground whitespace-nowrap">
                <span v-if="m.activeCounter">
                  {{ m.activeCounter.counterName }}
                  <span class="font-bold text-foreground tabular-nums">#{{ m.activeCounter.counterNumber }}</span>
                </span>
                <span v-else>Unassigned</span>
              </td>
              <td class="td text-muted-foreground whitespace-nowrap tabular-nums">{{ formatDate(m.createdAt) }}</td>
              <td class="td text-right whitespace-nowrap">
                <button
                  class="inline-flex cursor-pointer items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-gray-900"
                  title="Reset password"
                  @click="openReset(m)"
                >
                  <KeyRound class="h-3.5 w-3.5" />
                  Reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>