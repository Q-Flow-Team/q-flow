<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'

const state = useStateStore()
const showToast = inject<(msg: string) => void>('showToast', () => {})
const selected = ref(state.qrQueues[0])
</script>

<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-xl font-bold text-foreground">QR Codes</h2>
      <p class="text-sm text-muted-foreground mt-0.5">Manage queue entry QR codes for customers</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div class="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
        <div class="px-4 py-3.5 border-b border-border">
          <h3 class="text-sm font-bold text-foreground">Queues &amp; Services</h3>
        </div>
        <div class="divide-y divide-border">
          <button
            v-for="q in qrQueues"
            :key="q.id"
            @click="selected = q"
            :class="['w-full flex items-center justify-between px-4 py-4 text-left transition-colors', selected.id === q.id ? 'bg-primary-lighter' : 'hover:bg-muted/50']"
          >
            <div>
              <p :class="['text-sm font-semibold', selected.id === q.id ? 'text-primary' : 'text-foreground']">{{ q.name }}</p>
              <p class="text-xs text-muted-foreground mt-0.5">Created {{ q.created }}</p>
            </div>
            <span :class="['text-xs px-2 py-0.5 rounded-full font-bold', q.status === 'Active' ? 'bg-success-light text-success' : 'bg-muted text-muted-foreground']">
              {{ q.status }}
            </span>
          </button>
        </div>
      </div>

      <div class="lg:col-span-3 bg-card border border-border rounded-xl p-6">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="font-bold text-foreground">{{ selected.name }}</h3>
            <p class="text-xs text-muted-foreground mt-0.5">Al-Noor Branch &middot; {{ selected.id }}</p>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full font-bold', selected.status === 'Active' ? 'bg-success-light text-success' : 'bg-muted text-muted-foreground']">
            {{ selected.status }}
          </span>
        </div>
        <div class="flex justify-center mb-6">
          <div class="p-5 bg-white border border-border rounded-2xl shadow-sm inline-block">
            <QrCodeSvg :seed="selected.id" :size="176" />
          </div>
        </div>
        <div class="text-center mb-6">
          <p class="text-sm font-bold text-foreground">Al-Noor Branch</p>
          <p class="text-xs text-muted-foreground mt-0.5">Sheikh Zayed Road, Dubai, UAE</p>
          <p class="text-sm font-bold text-primary mt-1">{{ selected.name }}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs" @click="showToast('QR code regenerated')">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
          <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary-light text-primary-dark-text hover:bg-primary-border px-3 py-1.5 text-xs" @click="showToast('Downloading…')">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary-light text-primary-dark-text hover:bg-primary-border px-3 py-1.5 text-xs" @click="showToast('Link copied!')">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Link
          </button>
          <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-1.5 text-xs border border-border" @click="showToast('Opening print dialog…')">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>