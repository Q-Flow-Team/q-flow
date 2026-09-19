<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  body: string
  confirmLabel?: string
}>(), { confirmLabel: 'Yes, Delete' })

defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px]" @click="$emit('cancel')" />
    <div class="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-sm p-7 flex flex-col items-center text-center">
      <div class="w-14 h-14 rounded-full bg-danger-light border border-danger-light-border flex items-center justify-center mb-5">
        <svg class="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h3 class="text-base font-bold text-foreground mb-2">{{ title }}</h3>
      <p class="text-sm text-muted-foreground leading-relaxed mb-7">{{ body }}</p>
      <div class="flex gap-3 w-full">
        <button
          class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-none transition-all duration-150 px-4 py-2.5 text-sm bg-transparent text-foreground hover:bg-muted active:bg-border border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          @click="$emit('cancel')"
        >
          No, Cancel
        </button>
        <button
          class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-none transition-all duration-150 px-4 py-2.5 text-sm bg-danger text-white hover:bg-danger-hover active:bg-danger-active focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          @click="$emit('confirm')"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>