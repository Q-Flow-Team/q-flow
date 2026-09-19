<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { apiPost } from '~/utils/api'
import { trim, isValidEmail, isValidName, passwordIssues, emailMessage, nameMessage } from '~/utils/validate'

definePageMeta({ layout: false, middleware: 'auth' })

const email = ref('')
const fullName = ref('')
const pw = ref('')
const confirmPw = ref('')
const err = ref('')
const fieldErrors = ref<{ email: string; fullName: string; pw: string; confirmPw: string }>({
  email: '',
  fullName: '',
  pw: '',
  confirmPw: '',
})
const touched = ref<Record<string, boolean>>({})
const loading = ref(false)

const validate = (field: string) => {
  const errors: typeof fieldErrors.value = { email: '', fullName: '', pw: '', confirmPw: '' }
  const ev = trim(email.value)
  if (!ev) errors.email = 'Email is required.'
  else if (!isValidEmail(ev)) errors.email = emailMessage(ev)
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
  const errors = validate('email')
  touched.value = { email: true, fullName: true, pw: true, confirmPw: true }
  if (Object.values(errors).some(Boolean)) return
  err.value = ''
  loading.value = true
  try {
    await apiPost('/admin/users', {
      email: trim(email.value).toLowerCase(),
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
  <div class="min-h-screen bg-bg-page flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-sm mx-auto">
      <div class="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <div class="mb-8">
          <QFlowLogo size="lg" />
          <h2 class="text-xl font-bold text-foreground mt-5">Create Admin Account</h2>
          <p class="text-sm text-muted-foreground mt-1">Sign up to manage the enterprise queue</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Email</label>
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              :class="['w-full px-3 py-2.5 rounded-md border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm', touched.email && fieldErrors.email ? 'border-danger' : 'border-border']"
              placeholder="e.g. admin@qflow.com"
              @blur="validateField('email')"
              @input="touched.email && validateField('email')"
            />
            <p v-if="touched.email && fieldErrors.email" class="text-xs text-danger">{{ fieldErrors.email }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Full Name</label>
            <input
              v-model="fullName"
              autocomplete="name"
              :class="['w-full px-3 py-2.5 rounded-md border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm', touched.fullName && fieldErrors.fullName ? 'border-danger' : 'border-border']"
              placeholder="Your full name"
              @blur="validateField('fullName')"
              @input="touched.fullName && validateField('fullName')"
            />
            <p v-if="touched.fullName && fieldErrors.fullName" class="text-xs text-danger">{{ fieldErrors.fullName }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Password</label>
            <input
              v-model="pw"
              type="password"
              autocomplete="new-password"
              :class="['w-full px-3 py-2.5 rounded-md border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm', touched.pw && fieldErrors.pw ? 'border-danger' : 'border-border']"
              placeholder="At least 8 chars, one letter and one number"
              @blur="validateField('pw')"
              @input="touched.pw && validateField('pw')"
            />
            <p v-if="touched.pw && fieldErrors.pw" class="text-xs text-danger">{{ fieldErrors.pw }}</p>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Confirm Password</label>
            <input
              v-model="confirmPw"
              type="password"
              autocomplete="new-password"
              :class="['w-full px-3 py-2.5 rounded-md border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm', touched.confirmPw && fieldErrors.confirmPw ? 'border-danger' : 'border-border']"
              placeholder="Re-enter password"
              @blur="validateField('confirmPw')"
              @input="touched.confirmPw && validateField('confirmPw')"
            />
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
      <p class="text-sm text-muted-foreground mt-6 text-center">
        <NuxtLink to="/admin" class="font-semibold text-primary hover:text-primary-hover">Back to dashboard</NuxtLink>
      </p>
    </div>
  </div>
</template>