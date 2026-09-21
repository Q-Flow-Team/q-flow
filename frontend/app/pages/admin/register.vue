<script setup lang="ts">
import { Loader2, Eye, EyeOff, IdCard, Lock, UserRound } from 'lucide-vue-next'
import { apiPost } from '~/utils/api'
import { trim, isValidEmployeeId, isValidName, passwordIssues, employeeIdMessage, nameMessage } from '~/utils/validate'

definePageMeta({ layout: false })

const { init } = useTheme()
onMounted(init)

const employeeId = ref('')
const fullName = ref('')
const pw = ref('')
const confirmPw = ref('')
const showPw = ref(false)
const showConfirmPw = ref(false)
const err = ref('')
const fieldErrors = ref<{ employeeId: string; fullName: string; pw: string; confirmPw: string }>({
  employeeId: '',
  fullName: '',
  pw: '',
  confirmPw: '',
})
const touched = ref<Record<string, boolean>>({})
const loading = ref(false)

const validate = (field: string) => {
  const errors: typeof fieldErrors.value = { employeeId: '', fullName: '', pw: '', confirmPw: '' }
  const ev = trim(employeeId.value)
  if (!ev) errors.employeeId = 'Employee ID is required.'
  else if (!isValidEmployeeId(ev)) errors.employeeId = employeeIdMessage(ev)
  if (!trim(fullName.value)) errors.fullName = 'Full name is required.'
  else if (!isValidName(fullName.value)) errors.fullName = nameMessage(fullName.value)
  const pwIssues = passwordIssues(pw.value)
  errors.pw = pwIssues[0] || ''
  if (confirmPw.value && pw.value !== confirmPw.value) errors.confirmPw = 'Passwords do not match.'
  else if (pwIssues.length === 0 && !confirmPw.value) errors.confirmPw = 'Please confirm your password.'
  fieldErrors.value = errors
  return errors
}

const validateField = (field: string) => {
  touched.value[field] = true
  validate(field)
}

const handleSubmit = async () => {
  const errors = validate('employeeId')
  touched.value = { employeeId: true, fullName: true, pw: true, confirmPw: true }
  if (Object.values(errors).some(Boolean)) return
  err.value = ''
  loading.value = true
  try {
    await apiPost('/admin/users', {
      employeeId: trim(employeeId.value),
      fullName: trim(fullName.value),
      password: pw.value,
      role: 'ADMIN',
    })
    navigateTo('/admin')
  } catch (e: any) {
    err.value = e?.message || 'Sign up failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-customer flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-sm mx-auto">
      <div class="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div class="gradient-brand bg-grid px-8 pt-8 pb-9 text-center">
          <QFlowLogo size="lg" tone="light" />
          <p class="mt-2.5 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">Queue Management System</p>
        </div>

        <div class="px-8 pb-8 pt-7">
          <h2 class="text-xl font-bold text-foreground">Create Admin Account</h2>
          <p class="text-sm text-muted-foreground mt-1">Sign up to manage the enterprise queue</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Employee ID</label>
            <div class="relative">
              <IdCard class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                v-model="employeeId"
                type="text"
                autocomplete="username"
                :class="['w-full rounded-lg border bg-input-bg py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent', touched.employeeId && fieldErrors.employeeId ? 'border-danger' : 'border-border']"
                placeholder="e.g. ADM-002"
                @blur="validateField('employeeId')"
                @input="touched.employeeId && validateField('employeeId')"
              />
            </div>
            <p v-if="touched.employeeId && fieldErrors.employeeId" class="text-xs text-danger">{{ fieldErrors.employeeId }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Full Name</label>
            <div class="relative">
              <UserRound class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                v-model="fullName"
                autocomplete="name"
                :class="['w-full rounded-lg border bg-input-bg py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent', touched.fullName && fieldErrors.fullName ? 'border-danger' : 'border-border']"
                placeholder="Your full name"
                @blur="validateField('fullName')"
                @input="touched.fullName && validateField('fullName')"
              />
            </div>
            <p v-if="touched.fullName && fieldErrors.fullName" class="text-xs text-danger">{{ fieldErrors.fullName }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Password</label>
            <div class="relative">
              <Lock class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                v-model="pw"
                :type="showPw ? 'text' : 'password'"
                autocomplete="new-password"
                :class="['w-full rounded-lg border bg-input-bg py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent', touched.pw && fieldErrors.pw ? 'border-danger' : 'border-border']"
                placeholder="At least 8 chars, one letter and one number"
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
            <p v-if="touched.pw && fieldErrors.pw" class="text-xs text-danger">{{ fieldErrors.pw }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Confirm Password</label>
            <div class="relative">
              <Lock class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                v-model="confirmPw"
                :type="showConfirmPw ? 'text' : 'password'"
                autocomplete="new-password"
                :class="['w-full rounded-lg border bg-input-bg py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent', touched.confirmPw && fieldErrors.confirmPw ? 'border-danger' : 'border-border']"
                placeholder="Re-enter password"
                @blur="validateField('confirmPw')"
                @input="touched.confirmPw && validateField('confirmPw')"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                :aria-label="showConfirmPw ? 'Hide password' : 'Show password'"
                @click="showConfirmPw = !showConfirmPw"
              >
                <component :is="showConfirmPw ? EyeOff : Eye" class="h-4 w-4" />
              </button>
            </div>
            <p v-if="touched.confirmPw && fieldErrors.confirmPw" class="text-xs text-danger">{{ fieldErrors.confirmPw }}</p>
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
            {{ loading ? 'Creating account…' : 'Sign Up' }}
            <svg v-if="!loading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
      <p class="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink to="/" class="font-semibold text-primary transition-colors hover:text-primary-hover">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>