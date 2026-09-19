<script setup lang="ts">
import type { Component } from 'vue'

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    sub?: string
    icon?: Component
    tone?: Tone
    trend?: string
    trendUp?: boolean
  }>(),
  { tone: 'primary', trendUp: true },
)

const tones: Record<Tone, { chip: string; bar: string }> = {
  primary: { chip: 'bg-primary-light text-primary', bar: 'bg-primary' },
  success: { chip: 'bg-success-light text-success', bar: 'bg-success' },
  warning: { chip: 'bg-warning-light text-warning', bar: 'bg-warning' },
  danger: { chip: 'bg-danger-light text-danger', bar: 'bg-danger' },
  neutral: { chip: 'bg-muted text-muted-foreground', bar: 'bg-muted-foreground' },
}

const style = computed(() => tones[props.tone])
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-border/70 hover:shadow-card-hover"
  >
    <span :class="['absolute inset-x-0 top-0 h-1 opacity-80', style.bar]" aria-hidden="true" />

    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-xs font-bold uppercase tracking-wider text-muted-foreground">{{ label }}</p>
        <p class="mt-2 text-3xl font-extrabold leading-none tracking-tight text-foreground tabular-nums">
          {{ value }}
        </p>
      </div>
      <span
        v-if="icon"
        :class="[
          'grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105',
          style.chip,
        ]"
      >
        <component :is="icon" class="h-5 w-5" />
      </span>
    </div>

    <div v-if="sub || trend" class="mt-3 flex items-center gap-2">
      <span
        v-if="trend"
        :class="[
          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold',
          trendUp ? 'bg-success-light text-success' : 'bg-danger-light text-danger',
        ]"
      >
        <svg
          class="h-3 w-3"
          :class="trendUp ? '' : 'rotate-180'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        {{ trend }}
      </span>
      <span v-if="sub" class="truncate text-xs text-muted-foreground">{{ sub }}</span>
    </div>
  </div>
</template>
