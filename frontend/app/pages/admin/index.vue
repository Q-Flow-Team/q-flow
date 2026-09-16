<script setup lang="ts">
import DashboardLayout from '~/layouts/dashboard.vue'
import { Hash, Users, QrCode, History } from 'lucide-vue-next'

definePageMeta({ layout: false })

type AdminPage = 'counters' | 'staff' | 'qr' | 'history'
const activePage = ref<AdminPage>('counters')

const navItems = [
  { key: 'counters', label: 'Counters', icon: Hash },
  { key: 'staff', label: 'Staff', icon: Users },
  { key: 'qr', label: 'QR Codes', icon: QrCode },
  { key: 'history', label: 'History', icon: History },
]

const { message, visible, showToast } = useToast()
provide('showToast', showToast)
</script>

<template>
  <div>
    <DashboardLayout
      :navItems="navItems"
      :activePage="activePage"
      userName="Dana Al-Wakeel"
      userRole="Branch Manager"
      @navigate="activePage = $event as AdminPage"
      @signOut="navigateTo('/')"
    >
      <AdminCounters v-if="activePage === 'counters'" />
      <AdminStaff v-else-if="activePage === 'staff'" />
      <AdminQR v-else-if="activePage === 'qr'" />
      <AdminHistory v-else-if="activePage === 'history'" />
    </DashboardLayout>
    <ToastMessage :message="message" :visible="visible" />
  </div>
</template>