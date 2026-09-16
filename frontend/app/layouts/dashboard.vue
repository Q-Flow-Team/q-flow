<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  navItems: { key: string; label: string; icon: Component }[]
  activePage: string
  userName: string
  userRole: string
}>()

const emit = defineEmits<{ navigate: [key: string]; signOut: [] }>()

const navOpen = ref(false)
const profileOpen = ref(false)

const handleNav = (key: string) => {
  emit('navigate', key)
  navOpen.value = false
}

const closeProfile = () => { profileOpen.value = false }

onMounted(() => document.addEventListener('click', closeProfile))
onUnmounted(() => document.removeEventListener('click', closeProfile))
</script>

<template>
  <div class="min-h-screen bg-bg-page">
    <header class="sticky top-0 z-30 bg-card border-b border-border">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        <QFlowLogo />
        <div class="flex-1" />
        <div class="relative">
          <button
            @click.stop="profileOpen = !profileOpen"
            :aria-expanded="profileOpen"
            :aria-label="profileOpen ? 'Close user menu' : 'Open user menu'"
            class="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-primary hover:text-white"
          >
            {{ userName.charAt(0) }}
          </button>

          <Transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div
              v-if="profileOpen"
              @click.stop
              class="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
            >
              <div class="flex items-center gap-3 px-4 py-4">
                <div class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                  {{ userName.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-bold text-foreground truncate">{{ userName }}</p>
                  <p class="text-xs text-muted-foreground truncate">{{ userRole }}</p>
                </div>
              </div>
              <div class="border-t border-border p-2">
                <button
                  @click="$emit('signOut')"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-danger hover:bg-danger-light transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                >
                  <span class="w-5 h-5 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                  Sign Out
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav class="relative flex items-start mb-7 min-h-10" aria-label="Dashboard navigation">
        <button
          @click="navOpen = !navOpen"
          :aria-expanded="navOpen"
          :aria-label="navOpen ? 'Close navigation' : 'Open navigation'"
          class="relative w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-primary-lighter group"
          :style="{ color: navOpen ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line
              x1="2" y1="4" x2="16" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              :style="{ transformOrigin: '9px 4px', transform: navOpen ? 'translateY(5px) rotate(45deg)' : 'none', transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1)' }"
            />
            <line
              x1="2" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              :style="{ transformOrigin: '9px 9px', opacity: navOpen ? 0 : 1, transform: navOpen ? 'scaleX(0)' : 'none', transition: 'opacity 0.15s ease, transform 0.18s ease' }"
            />
            <line
              x1="2" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              :style="{ transformOrigin: '9px 14px', transform: navOpen ? 'translateY(-5px) rotate(-45deg)' : 'none', transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1)' }"
            />
          </svg>
        </button>

        <div
          class="hidden sm:block self-center flex-shrink-0 w-px h-6 bg-border mx-3 rounded-full transition-opacity duration-200"
          :style="{ opacity: navOpen ? 1 : 0 }"
          aria-hidden="true"
        />

        <div
          class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0 pl-1 sm:pl-0 sm:self-center"
        >
          <div
            v-for="(item, i) in navItems"
            :key="item.key"
            :class="[
              'flex-shrink-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
              navOpen ? 'max-w-32 sm:max-w-45 opacity-100' : 'max-w-0 opacity-0'
            ]"
            :style="{ transitionDelay: `${i * 55}ms` }"
          >
            <button
              @click="handleNav(item.key)"
              :tabindex="navOpen ? 0 : -1"
              :class="[
                'whitespace-nowrap inline-flex items-center gap-2 pl-2.5 pr-3 h-8 sm:h-9 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                activePage === item.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-primary-lighter hover:text-primary'
              ]"
            >
              <span
                :class="[
                  'w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 [&_svg]:w-3.5 [&_svg]:h-3.5 transition-colors',
                  activePage === item.key ? 'bg-white/20 text-white' : 'bg-primary-light text-primary'
                ]"
              >
                <component :is="item.icon" />
              </span>
              {{ item.label }}
            </button>
          </div>
        </div>
      </nav>

      <slot />
    </main>
  </div>
</template>