<script setup lang="ts">
import { Loader2, Eye, EyeOff } from 'lucide-vue-next'
import { trim, isValidEmployeeId, employeeIdMessage } from '~/utils/validate'

definePageMeta({ layout: false })

const employeeId = ref('')
const pw = ref('')
const showPw = ref(false)
const err = ref('')
const fieldErrors = ref<{ employeeId?: string; pw?: string }>({})
const touched = ref<{ employeeId?: boolean; pw?: boolean }>({})
const loading = ref(false)

const validateEmployeeId = () => {
  const v = trim(employeeId.value)
  if (!v) return 'Employee ID is required.'
  return isValidEmployeeId(v) ? '' : employeeIdMessage(v)
}

const validateField = (field: 'employeeId' | 'pw') => {
  touched.value[field] = true
  if (field === 'employeeId') {
    fieldErrors.value.employeeId = validateEmployeeId() || undefined
  } else {
    fieldErrors.value.pw = !trim(pw.value) ? 'Password is required.' : undefined
  }
}

const handleSubmit = async () => {
  const errors: typeof fieldErrors.value = {}
  const employeeIdErr = validateEmployeeId()
  if (employeeIdErr) errors.employeeId = employeeIdErr
  if (!trim(pw.value)) errors.pw = 'Password is required.'
  fieldErrors.value = errors
  touched.value = { employeeId: true, pw: true }
  if (Object.keys(errors).length) return
  err.value = ''
  loading.value = true
  try {
    const { login } = useAuth()
    const res = await login(trim(employeeId.value), pw.value)
    if (res.user.role === 'ADMIN') {
      navigateTo('/admin')
    } else {
      navigateTo(res.user.activeCounter ? '/staff' : '/staff/counter')
    }
  } catch (e: any) {
    err.value = e?.message || 'Sign in failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-page flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-sm mx-auto">
      <div class="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <div class="mb-8">
          <QFlowLogo size="lg" />
          <h2 class="text-xl font-bold text-foreground mt-5">Sign In</h2>
          <p class="text-sm text-muted-foreground mt-1">Access your Q-Flow dashboard</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Employee ID</label>
            <input
              v-model="employeeId"
              type="text"
              autocomplete="username"
              :class="['w-full px-3 py-2.5 rounded-md border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm', fieldErrors.employeeId ? 'border-danger' : 'border-border']"
              placeholder="e.g. ADM-001"
              @blur="validateField('employeeId')"
              @input="touched.employeeId && validateField('employeeId')"
            />
            <p v-if="fieldErrors.employeeId" class="text-xs text-danger mt-1">{{ fieldErrors.employeeId }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Password</label>
            <div class="relative">
              <input
                v-model="pw"
                :type="showPw ? 'text' : 'password'"
                autocomplete="current-password"
                :class="['w-full px-3 py-2.5 rounded-md border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm pr-10', fieldErrors.pw ? 'border-danger' : 'border-border']"
                placeholder="Enter your password"
                @blur="validateField('pw')"
                @input="touched.pw && validateField('pw')"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                :aria-label="showPw ? 'Hide password' : 'Show password'"
                @click="showPw = !showPw"
              >
                <component :is="showPw ? EyeOff : Eye" class="h-4 w-4" />
              </button>
            </div>
            <p v-if="fieldErrors.pw" class="text-xs text-danger mt-1">{{ fieldErrors.pw }}</p>
          </div>
          <div v-if="err" class="flex items-start gap-2.5 p-3 bg-danger-light border border-danger-light-border rounded-md">
            <svg class="w-4 h-4 text-danger flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p class="text-sm text-danger">{{ err }}</p>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full inline-flex cursor-pointer items-center justify-center gap-2 font-semibold rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            {{ loading ? 'Signing in…' : 'Sign In' }}
            <svg v-if="!loading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>