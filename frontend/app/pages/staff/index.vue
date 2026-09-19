<script setup lang="ts">
import DashboardLayout from '~/layouts/dashboard.vue'
import { LayoutDashboard, List, History } from 'lucide-vue-next'

definePageMeta({ layout: false, middleware: 'auth' })

const { user, logout } = useAuth()
const { overview, refresh, shiftRequired, reset } = useStaffSession()

const activePage = ref('overview')
const selectedTicketId = ref<string | null>(null)

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'queue', label: 'Queue', icon: List },
  { key: 'history', label: 'History', icon: History },
]

const { message, visible, showToast } = useToast()
provide('showToast', showToast)
provide('selectedTicketId', selectedTicketId)

const userName = computed(() => user.value?.fullName || 'Counter Staff')
const userRole = computed(() => overview.value?.counter?.counterName || 'Counter Staff')

let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await refresh()
  if (shiftRequired.value) {
    navigateTo('/staff/counter')
    return
  }
  timer = setInterval(() => refresh(true), 8000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

watch(shiftRequired, (required) => {
  if (required) navigateTo('/staff/counter')
})

const handleSignOut = async () => {
  reset()
  await logout()
  navigateTo('/')
}
</script>

<template>
  <div>
    <DashboardLayout
      :navItems="navItems"
      :activePage="activePage === 'ticket-detail' ? 'queue' : activePage"
      :userName="userName"
      :userRole="userRole"
      title="Staff Dashboard"
      @navigate="activePage = $event"
      @signOut="handleSignOut"
    >
      <StaffOverview
        v-if="activePage === 'overview'"
        @goToQueue="activePage = 'queue'"
        @goToTicket="(id) => { selectedTicketId = id; activePage = 'ticket-detail' }"
      />
      <StaffQueue
        v-else-if="activePage === 'queue'"
        @selectTicket="(id) => { selectedTicketId = id; activePage = 'ticket-detail' }"
      />
      <StaffTicketDetail
        v-else-if="activePage === 'ticket-detail'"
        @back="activePage = 'queue'"
      />
      <StaffHistory v-else-if="activePage === 'history'" />
    </DashboardLayout>
    <ToastMessage :message="message" :visible="visible" />
  </div>
</template>
