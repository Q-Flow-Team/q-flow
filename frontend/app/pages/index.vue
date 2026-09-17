<script setup lang="ts">
import { Smartphone, Monitor, Shield } from 'lucide-vue-next'

const cards = [
  {
    to: '/customer/join',
    icon: Smartphone,
    tag: 'Mobile',
    title: 'Customer App',
    desc: 'Simulates scanning a QR code at the branch. Fill in details and track your queue position live.',
    cta: 'Simulate QR Scan',
  },
  {
    to: '/staff/login',
    icon: Monitor,
    tag: 'Desktop',
    title: 'Staff Dashboard',
    desc: 'Manage the queue, call customers, skip no-shows, and view your service history.',
    cta: 'Open Staff View',
  },
  {
    to: '/admin/login',
    icon: Shield,
    tag: 'Admin',
    title: 'Admin Dashboard',
    desc: 'Configure counters, manage staff accounts, generate QR codes, and review analytics.',
    cta: 'Open Admin View',
  },
]
</script>

<template>
  <div class="min-h-screen bg-bg-page flex flex-col">
    <div class="bg-card border-b border-border h-16 flex items-center px-6">
      <div class="max-w-5xl mx-auto w-full">
        <QFlowLogo size="lg" />
      </div>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center px-4 py-16">
      <div class="max-w-5xl w-full flex flex-col items-center">
      <div class="text-center max-w-xl mb-14">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold mb-6">
          <div class="w-1.5 h-1.5 rounded-full bg-primary" />
          Interactive Prototype
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-foreground leading-[1.15] tracking-tight">
          Queue Management,<br />
          <span class="text-primary">Simplified.</span>
        </h1>
        <p class="text-base text-muted-foreground mt-5 leading-relaxed">
          Q-Flow connects customers, staff, and administrators through a single real-time queue.
          Select a surface to explore.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <NuxtLink
          v-for="card in cards"
          :key="card.to"
          :to="card.to"
          class="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary-border hover:shadow-lg transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div class="flex items-center justify-between mb-5">
            <div class="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
              <component :is="card.icon" class="w-5 h-5" />
            </div>
            <span class="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{{ card.tag }}</span>
          </div>
          <h3 class="font-bold text-foreground mb-2">{{ card.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed mb-5">{{ card.desc }}</p>
          <div class="flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-200">
            {{ card.cta }}
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
    </div>

    <div class="border-t border-border py-4 px-6 text-center">
      <p class="text-xs text-muted-foreground">Q-Flow Queue Management &mdash; Al-Noor Branch, Dubai</p>
    </div>
  </div>
</template>