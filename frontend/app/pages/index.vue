<script setup lang="ts">
import { Loader2, LogIn } from 'lucide-vue-next'
import { apiPost } from '~/utils/api'

definePageMeta({ layout: 'customer' })

const route = useRoute()
const siteName = computed(() => {
  const site = route.query.site
  return typeof site === 'string' && site.trim() ? site.trim() : 'Al-Noor Branch'
})

const name = ref('')
const phone = ref('')
const errors = ref<{ name?: string; phone?: string }>({})
const loading = ref(false)
const serverError = ref('')

const handleSubmit = async () => {
  serverError.value = ''
  const errs: typeof errors.value = {}
  if (!name.value.trim()) errs.name = 'Please enter your full name'
  if (!phone.value.trim()) errs.phone = 'Please enter your phone number'
  if (Object.keys(errs).length) {
    errors.value = errs
    return
  }

  loading.value = true
  try {
    const res = await apiPost<{ message: string; ticket: any }>('/tickets/check-in', {
      customerName: name.value.trim(),
      phoneNumber: phone.value.trim(),
      preferredChannel: 'SMS',
    })

    const ticket = res.ticket
    if (import.meta.client && ticket?.id) {
      localStorage.setItem('qflow_current_ticket', ticket.id)
      localStorage.setItem(`qflow_ticket_${ticket.id}`, JSON.stringify(ticket))
    }
    navigateTo(`/customer/ticket/${ticket.id}`)
  } catch (err: any) {
    serverError.value = err?.message || 'We could not add you to the queue. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <QFlowLogo />
      <div class="flex items-center gap-3">
        <span class="text-xs text-muted-foreground tabular-nums hidden sm:inline">Live Queue</span>
        <NuxtLink
          to="/login"
          class="inline-flex items-center gap-1.5 text-xs font-bold rounded-lg px-3 py-1.5 bg-primary-light text-primary hover:bg-primary-lighter transition-colors"
        >
          <LogIn class="w-3.5 h-3.5" />
          Sign In
        </NuxtLink>
      </div>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <div class="w-5 h-5 rounded-full bg-success-light flex items-center justify-center flex-shrink-0">
        <svg class="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span class="text-xs font-bold text-success">QR Code Scanned Successfully</span>
    </div>

    <div class="bg-bg-page border border-border rounded-xl p-4 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <div class="min-w-0">
          <p class="text-xs text-muted-foreground font-medium">You are joining</p>
          <p class="text-sm font-bold text-foreground">{{ siteName }}</p>
          <p class="text-xs font-semibold text-primary mt-0.5">Account Services</p>
        </div>
      </div>
    </div>

    <div class="mb-5">
      <h1 class="text-xl font-bold text-foreground">Enter Your Details</h1>
      <p class="text-sm text-muted-foreground mt-1">We'll text you when it's almost your turn.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-foreground">Full Name</label>
        <input
          v-model="name"
          class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
          placeholder="Your full name"
        />
        <p v-if="errors.name" class="text-xs text-danger mt-1">{{ errors.name }}</p>
      </div>

      <div class="space-y-1.5">
        <label class="block text-sm font-semibold text-foreground">Phone Number</label>
        <input
          v-model="phone"
          type="tel"
          class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
          placeholder="+971 50 000 0000"
        />
        <p v-if="errors.phone" class="text-xs text-danger mt-1">{{ errors.phone }}</p>
      </div>

      <div v-if="serverError" class="flex items-start gap-2.5 p-3 bg-danger-light border border-danger-light-border rounded-lg">
        <svg class="w-4 h-4 text-danger flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p class="text-sm text-danger">{{ serverError }}</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base mt-1"
      >
        <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
        {{ loading ? 'Joining…' : 'Join Queue' }}
        <svg v-if="!loading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  </div>
</template>