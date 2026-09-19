<script setup lang="ts">
import type { Component } from 'vue'
import {
  Menu,
  X,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
} from 'lucide-vue-next'

const props = defineProps<{
  navItems: { key: string; label: string; icon: Component }[]
  activePage: string
  userName: string
  userRole: string
}>()

const emit = defineEmits<{ navigate: [key: string]; signOut: [] }>()

const { init: initTheme } = useTheme()

const navOpen = ref(false)
const collapsed = ref(false)

const activeItem = computed(() => props.navItems.find((i) => i.key === props.activePage))
const initials = computed(() => (props.userName || '?').trim().charAt(0).toUpperCase())

const handleNav = (key: string) => {
  emit('navigate', key)
  navOpen.value = false
}

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
  if (import.meta.client) localStorage.setItem('qflow-sidebar-collapsed', String(collapsed.value))
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') navOpen.value = false
}

watch(navOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  initTheme()
  collapsed.value = localStorage.getItem('qflow-sidebar-collapsed') === 'true'
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen bg-bg-page text-foreground">
    <!-- Mobile backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="navOpen"
        class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
        @click="navOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col border-r border-border bg-sidebar transition-[width,transform] duration-300 ease-out',
        collapsed ? 'lg:w-[80px]' : 'lg:w-[264px]',
        'lg:translate-x-0',
        navOpen ? 'translate-x-0 shadow-pop' : '-translate-x-full',
      ]"
      aria-label="Primary navigation"
    >
      <!-- Brand -->
      <div class="flex h-16 flex-shrink-0 items-center gap-2.5 border-b border-border px-4">
        <NuxtLink
          to="/"
          class="flex min-w-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span
            class="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-primary text-base font-extrabold text-white shadow-glow"
          >
            Q
          </span>
          <span
            v-if="!collapsed"
            class="truncate text-[17px] font-extrabold leading-none tracking-tight text-foreground"
          >
            Q<span class="text-primary">Flow</span>
          </span>
        </NuxtLink>
        <button
          type="button"
          class="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-label="Close navigation"
          @click="navOpen = false"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <p
          v-if="!collapsed"
          class="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70"
        >
          Menu
        </p>
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.key">
            <button
              type="button"
              :title="collapsed ? item.label : undefined"
              :aria-current="activePage === item.key ? 'page' : undefined"
              :class="[
                'group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                collapsed ? 'lg:justify-center lg:px-0' : '',
                activePage === item.key
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ]"
              @click="handleNav(item.key)"
            >
              <span
                :class="[
                  'grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg transition-colors',
                  activePage === item.key
                    ? 'bg-white/20 text-white'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary-light group-hover:text-primary',
                ]"
              >
                <component :is="item.icon" class="h-4 w-4" />
              </span>
              <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
              <ChevronRight
                v-if="!collapsed && activePage === item.key"
                class="ml-auto h-4 w-4 opacity-70"
              />
            </button>
          </li>
        </ul>
      </nav>

      <!-- User -->
      <div class="flex-shrink-0 border-t border-border p-3">
        <div
          :class="[
            'flex items-center gap-3 rounded-xl p-2',
            collapsed ? 'lg:justify-center lg:p-0 lg:py-2' : '',
          ]"
        >
          <span
            class="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white"
            :title="collapsed ? userName : undefined"
          >
            {{ initials }}
          </span>
          <div v-if="!collapsed" class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-foreground">{{ userName }}</p>
            <p class="truncate text-xs text-muted-foreground">{{ userRole }}</p>
          </div>
        </div>
        <button
          type="button"
          :class="[
            'mt-1 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:bg-danger-light hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-danger',
            collapsed ? 'lg:justify-center lg:px-0' : '',
          ]"
          @click="emit('signOut')"
        >
          <LogOut class="h-4 w-4 flex-shrink-0" />
          <span v-if="!collapsed">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Content -->
    <div
      :class="[
        'flex min-h-screen flex-col transition-[padding] duration-300 ease-out',
        collapsed ? 'lg:pl-[80px]' : 'lg:pl-[264px]',
      ]"
    >
      <!-- Topbar -->
      <header class="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
        <div class="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            aria-label="Open navigation"
            @click="navOpen = true"
          >
            <Menu class="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            class="hidden h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:inline-flex"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="toggleCollapsed"
          >
            <PanelLeft v-if="collapsed" class="h-[18px] w-[18px]" />
            <PanelLeftClose v-else class="h-[18px] w-[18px]" />
          </button>

          <div class="min-w-0">
            <h1 class="truncate text-base font-bold tracking-tight text-foreground">
              {{ activeItem?.label || 'Dashboard' }}
            </h1>
            <p class="hidden truncate text-xs text-muted-foreground sm:block">{{ userRole }}</p>
          </div>

          <div class="flex-1" />

          <div
            class="hidden items-center gap-2 rounded-full border border-border bg-bg-page px-3 py-1.5 sm:flex"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span class="text-xs font-semibold text-muted-foreground">Live</span>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <slot />
      </main>
    </div>
  </div>
</template>
