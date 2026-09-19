<script setup lang="ts">
defineProps<{ message: string; visible: boolean }>()
</script>

<template>
  <div
    :class="[
      'fixed bottom-5 right-5 z-[100] flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-sm font-medium rounded-2xl shadow-pop ring-1 ring-white/10 pointer-events-none transition-all duration-200',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
    ]"
  >
    <svg class="w-4 h-4 text-success-check flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    {{ message }}
  </div>
</template>