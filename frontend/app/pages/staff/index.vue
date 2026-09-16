<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'
import DashboardLayout from '~/layouts/dashboard.vue'
import { LayoutDashboard, List, History } from 'lucide-vue-next'

definePageMeta({ layout: false })

const state = useStateStore()
const activePage = ref('overview')
const selectedTicketId = ref<string | null>(null)
const selectedCounter = computed(() => state.selectedCounter)

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'queue', label: 'Queue', icon: List },
  { key: 'history', label: 'History', icon: History },
]

const { message, visible, showToast } = useToast()

provide('showToast', showToast)
provide('selectedTicketId', selectedTicketId)
</script>

<template>
  <div>
    <DashboardLayout
      :navItems="navItems"
      :activePage="activePage === 'ticket-detail' ? 'queue' : activePage"
      :userName="'Mohammed Al-Rashid'"
      :userRole="selectedCounter?.name ?? 'Counter Staff'"
      @navigate="activePage = $event"
      @signOut="navigateTo('/')"
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