<script setup lang="ts">
definePageMeta({ layout: 'customer' })

const state = ref<'waiting' | 'near-turn' | 'called'>('waiting')
const confirmLeave = ref(false)

const isNear = computed(() => state.value === 'near-turn')
const isCalled = computed(() => state.value === 'called')
const position = computed(() => state.value === 'waiting' ? 5 : state.value === 'near-turn' ? 1 : 0)
const waitMin = computed(() => state.value === 'waiting' ? 15 : state.value === 'near-turn' ? 3 : 0)
const nowServing = computed(() => state.value === 'waiting' ? 19 : state.value === 'near-turn' ? 23 : 24)
</script>

<template>
  <div>
    <div :class="['px-5 pt-5 pb-5 transition-colors', isCalled ? 'bg-bg-called' : isNear ? 'bg-primary-lighter' : 'bg-card border-b border-border']">
      <div class="flex items-center justify-between mb-5">
        <QFlowLogo />
        <div
          :class="[
            'flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full',
            isCalled ? 'bg-white/20 text-white' : 'bg-primary-light text-primary'
          ]"
        >
          <div :class="['w-1.5 h-1.5 rounded-full animate-pulse', isCalled ? 'bg-white' : 'bg-primary']" />
          Live
        </div>
      </div>
      <div v-if="isCalled">
        <p class="text-lg font-bold text-white">It's Your Turn!</p>
        <p class="text-sm text-white/80 mt-0.5">Please proceed to Counter 1 now</p>
      </div>
      <div v-else-if="isNear">
        <p class="text-lg font-bold text-primary-dark-text">You're Almost Up!</p>
        <p class="text-sm text-primary mt-0.5">Please get ready and head to the counter area.</p>
      </div>
      <div v-else>
        <p class="text-base font-bold text-foreground">You're in the queue</p>
        <p class="text-sm text-muted-foreground mt-0.5">We'll notify you when it's almost your turn.</p>
      </div>
    </div>

    <div :class="['flex flex-col items-center py-8 border-b border-border', (isNear || isCalled) && 'bg-bg-ticket']">
      <p class="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Your Ticket</p>
      <div :class="['text-8xl font-extrabold leading-none tracking-tight tabular-nums', (isNear || isCalled) ? 'text-primary' : 'text-foreground']">
        24
      </div>
      <div v-if="!isCalled" class="w-full px-6 mt-6">
        <div class="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Now serving #{{ nowServing }}</span>
          <span>Your turn #24</span>
        </div>
        <div class="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            class="h-full bg-primary rounded-full transition-all duration-700"
            :style="{ width: isNear ? '91%' : '72%' }"
          />
        </div>
      </div>
    </div>

    <div v-if="isCalled" class="flex items-center gap-3 px-5 py-4 bg-primary-lighter border-b border-border">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-bold text-foreground">Counter 1 is ready for you</p>
        <p class="text-xs text-muted-foreground">Please approach the counter now</p>
      </div>
    </div>
    <div v-else class="grid grid-cols-2 divide-x divide-border border-b border-border">
      <div class="p-4 text-center">
        <p class="text-xs font-semibold text-muted-foreground">Position</p>
        <p class="text-2xl font-extrabold text-foreground mt-0.5 tabular-nums">{{ position }}</p>
        <p class="text-xs text-muted-foreground">ahead of you</p>
      </div>
      <div class="p-4 text-center">
        <p class="text-xs font-semibold text-muted-foreground">Est. Wait</p>
        <p class="text-2xl font-extrabold text-foreground mt-0.5 tabular-nums">~{{ waitMin }}</p>
        <p class="text-xs text-muted-foreground">minutes</p>
      </div>
    </div>

    <div class="flex items-center justify-between px-5 py-3 border-b border-border">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span class="text-xs text-muted-foreground font-medium">Now serving</span>
      </div>
      <span class="text-sm font-extrabold text-primary tabular-nums">#{{ nowServing }}</span>
    </div>

    <div class="p-5 space-y-4">
      <div>
        <p class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Demo States</p>
        <div class="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            v-for="s in (['waiting', 'near-turn', 'called'] as const)"
            :key="s"
            @click="state = s"
            :class="[
              'flex-1 py-1.5 rounded-md text-xs font-bold transition-all',
              state === s ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            ]"
          >
            {{ s === 'waiting' ? 'Waiting' : s === 'near-turn' ? 'Near Turn' : 'Called' }}
          </button>
        </div>
      </div>

      <div v-if="!isCalled">
        <div v-if="confirmLeave" class="bg-muted border border-border rounded-xl p-4 space-y-3">
          <p class="text-sm font-bold text-foreground">Leave the queue?</p>
          <p class="text-xs text-muted-foreground">You'll lose your position and need to rejoin.</p>
          <div class="flex gap-2">
            <button
              class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 px-3 py-1.5 text-xs bg-danger text-white hover:bg-danger-hover"
              @click="navigateTo('/customer/join')"
            >Yes, Leave</button>
            <button
              class="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 px-3 py-1.5 text-xs bg-transparent text-foreground hover:bg-muted border border-border"
              @click="confirmLeave = false"
            >Cancel</button>
          </div>
        </div>
        <button
          v-else
          class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 px-3 py-1.5 text-xs bg-transparent text-foreground hover:bg-muted active:bg-border"
          @click="confirmLeave = true"
        >Leave Queue</button>
      </div>
    </div>
  </div>
</template>