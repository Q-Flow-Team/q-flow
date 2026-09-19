<script setup lang="ts">
import DashboardLayout from '~/layouts/dashboard.vue'
import { LayoutDashboard, Hash, Users, QrCode } from 'lucide-vue-next'

definePageMeta({ layout: false, middleware: 'auth' })

type AdminPage = 'overview' | 'counters' | 'staff' | 'qr'
const activePage = ref<AdminPage>('overview')

const { user, logout } = useAuth()

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'counters', label: 'Counters', icon: Hash },
  { key: 'staff', label: 'Staff', icon: Users },
  { key: 'qr', label: 'QR Codes', icon: QrCode },
]

const { message, visible, showToast } = useToast()
provide('showToast', showToast)

const userName = computed(() => user.value?.fullName || 'Administrator')
const userRole = computed(() => 'Branch Manager')

const handleSignOut = async () => {
  await logout({ unbind: false })
  navigateTo('/')
}
</script>

<template>
  <div>
    <DashboardLayout
      :navItems="navItems"
      :activePage="activePage"
      :userName="userName"
      :userRole="userRole"
      title="Admin Dashboard"
      @navigate="activePage = $event as AdminPage"
      @signOut="handleSignOut"
    >
      <AdminOverview v-if="activePage === 'overview'" />
      <AdminCounters v-else-if="activePage === 'counters'" />
      <AdminStaff v-else-if="activePage === 'staff'" />
      <AdminQR v-else-if="activePage === 'qr'" />
    </DashboardLayout>
    <ToastMessage :message="message" :visible="visible" />
  </div>
</template>
