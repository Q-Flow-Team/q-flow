<script setup lang="ts">
import { MessageSquare, Phone, Bell } from 'lucide-vue-next'

definePageMeta({ layout: 'customer' })

const name = ref('')
const phone = ref('')
const channel = ref<'WhatsApp' | 'SMS' | 'None'>('WhatsApp')
const errors = ref<{ name?: string; phone?: string }>({})

const channels = [
  { id: 'WhatsApp' as const, icon: MessageSquare },
  { id: 'SMS' as const, icon: Phone },
  { id: 'None' as const, icon: Bell },
]

const handleSubmit = () => {
  const errs: typeof errors.value = {}
  if (!name.value.trim()) errs.name = 'Please enter your full name'
  if (!phone.value.trim()) errs.phone = 'Please enter your phone number'
  if (Object.keys(errs).length) { errors.value = errs; return }
  navigateTo('/customer/ticket')
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <QFlowLogo />
      <span class="text-xs text-muted-foreground tabular-nums">9:47 AM</span>
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
          <p class="text-sm font-bold text-foreground">Al-Noor Branch</p>
          <p class="text-xs font-semibold text-primary mt-0.5">Account Services</p>
        </div>
      </div>
    </div>

    <div class="mb-5">
      <h1 class="text-xl font-bold text-foreground">Enter Your Details</h1>
      <p class="text-sm text-muted-foreground mt-1">We'll use these to notify you when it's almost your turn.</p>
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

      <div>
        <label class="block text-sm font-semibold text-foreground mb-2">Notification Preference</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="ch in channels"
            :key="ch.id"
            type="button"
            @click="channel = ch.id"
            :class="[
              'flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border text-xs font-semibold transition-all',
              channel === ch.id
                ? 'border-primary bg-primary-light text-primary-dark-text'
                : 'border-border bg-card text-muted-foreground hover:border-primary-border hover:text-foreground'
            ]"
          >
            <component :is="ch.icon" class="w-4 h-4" />
            {{ ch.id }}
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base mt-1"
      >
        Join Queue
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  </div>
</template>