<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'

definePageMeta({ layout: false })

const state = useStateStore()
const sel = ref<{ id: string; name: string; active: boolean } | null>(null)

const activeCounters = computed(() => state.counters.filter(c => c.active))

const handleSelect = () => {
  if (sel.value) {
    state.selectedCounter = sel.value
    navigateTo('/staff')
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-page flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <div class="mb-7">
          <QFlowLogo />
          <h2 class="text-xl font-bold text-foreground mt-5">Select Your Counter</h2>
          <p class="text-sm text-muted-foreground mt-1">Choose the counter you'll operate today.</p>
        </div>
        <div class="space-y-2 mb-6">
          <button
            v-for="c in activeCounters"
            :key="c.id"
            @click="sel = c"
            :class="[
              'w-full flex items-center justify-between p-4 rounded-xl border transition-all',
              sel?.id === c.id ? 'border-primary bg-primary-lighter' : 'border-border hover:border-primary-border hover:bg-bg-page'
            ]"
          >
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm',
                  sel?.id === c.id ? 'bg-primary text-white' : 'bg-muted text-foreground'
                ]"
              >
                {{ c.id.replace('C', '') }}
              </div>
              <span :class="['font-semibold text-sm', sel?.id === c.id ? 'text-primary-dark-text' : 'text-foreground']">
                {{ c.name }}
              </span>
            </div>
            <svg v-if="sel?.id === c.id" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        <button
          :disabled="!sel"
          class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base"
          @click="handleSelect"
        >
          Start Shift
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>