<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'

const state = useStateStore()
const showToast = inject<(msg: string) => void>('showToast', () => {})
const counters = computed(() => state.counters)
const showForm = ref(false)
const newName = ref('')

const handleToggle = (c: { id: string; name: string; active: boolean }) => {
  state.toggleCounter(c.id)
  showToast(`${c.name} ${c.active ? 'deactivated' : 'activated'}`)
}

const handleCreate = () => {
  if (newName.value.trim()) {
    showToast(`Counter "${newName.value}" added`)
    newName.value = ''
    showForm.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-foreground">Counters</h2>
        <p class="text-sm text-muted-foreground mt-0.5">{{ counters.length }} counters configured</p>
      </div>
      <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs" @click="showForm = !showForm">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Counter
      </button>
    </div>

    <div v-if="showForm" class="bg-card border border-border rounded-xl p-5">
      <h3 class="text-sm font-bold text-foreground mb-3">New Counter</h3>
      <div class="flex gap-2.5">
        <input
          v-model="newName"
          class="flex-1 px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Counter name, e.g. Counter 5"
        />
        <button
          :disabled="!newName.trim()"
          class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          @click="handleCreate"
        >Create</button>
        <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-1.5 text-xs border border-border" @click="showForm = false">
          Cancel
        </button>
      </div>
    </div>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <div class="divide-y divide-border">
        <div v-for="c in counters" :key="c.id" class="flex items-center justify-between px-5 py-4">
          <div class="flex items-center gap-3">
            <div :class="['w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm', c.active ? 'bg-primary-light text-primary' : 'bg-muted text-muted-foreground']">
              {{ c.id.replace('C', '') }}
            </div>
            <div>
              <p class="text-sm font-semibold text-foreground">{{ c.name }}</p>
              <p :class="['text-xs font-semibold', c.active ? 'text-success' : 'text-muted-foreground']">
                {{ c.active ? 'Active' : 'Inactive' }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              role="switch"
              :aria-checked="c.active"
              @click="handleToggle(c)"
              :class="['relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 cursor-pointer', c.active ? 'bg-primary' : 'bg-border']"
            >
              <span :class="['absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200', c.active ? 'translate-x-5' : 'translate-x-0']" />
            </button>
            <button class="p-1.5 rounded-md hover:bg-muted transition-colors">
              <svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>