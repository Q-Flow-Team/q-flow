<script setup lang="ts">
import DashboardLayout from '~/layouts/dashboard.vue'
import { Hash, Users, QrCode } from 'lucide-vue-next'

definePageMeta({ layout: false, middleware: 'auth' })

type AdminPage = 'counters' | 'staff' | 'qr'
const activePage = ref<AdminPage>('counters')

const { user, logout } = useAuth()

const navItems = [
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
      @navigate="activePage = $event as AdminPage"
      @signOut="handleSignOut"
    >
      <AdminCounters v-if="activePage === 'counters'" />
      <AdminStaff v-else-if="activePage === 'staff'" />
      <AdminQR v-else-if="activePage === 'qr'" />
    </DashboardLayout>
    <ToastMessage :message="message" :visible="visible" />
  </div>
</template>
