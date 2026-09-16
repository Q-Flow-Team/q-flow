<script setup lang="ts">
import { useStateStore } from '~/composables/useStateStore'
import type { StaffMember } from '~/composables/useStateStore'

const state = useStateStore()
const showToast = inject<(msg: string) => void>('showToast', () => {})
const staffList = computed(() => state.staffList)
const counters = computed(() => state.counters)

const showForm = ref(false)
const search = ref('')
const deleteTarget = ref<StaffMember | null>(null)
const form = ref({ name: '', email: '', role: 'Counter Staff' as 'Counter Staff' | 'Admin', counter: '', active: true })

const filtered = computed(() => staffList.value.filter(s =>
  !search.value || s.name.toLowerCase().includes(search.value.toLowerCase()) || s.email.toLowerCase().includes(search.value.toLowerCase())
))

const handleSubmit = () => {
  if (!form.value.name || !form.value.email) return
  state.addStaff(form.value)
  showToast(`Account created for ${form.value.name}`)
  form.value = { name: '', email: '', role: 'Counter Staff', counter: '', active: true }
  showForm.value = false
}

const handleDelete = () => {
  if (deleteTarget.value) {
    state.removeStaff(deleteTarget.value.id)
    showToast(`${deleteTarget.value.name} removed`)
    deleteTarget.value = null
  }
}
</script>

<template>
  <div class="space-y-5">
    <ConfirmModal
      v-if="deleteTarget"
      title="Remove Staff Member?"
      :body="`Are you sure you want to remove ${deleteTarget.name}? This will permanently delete their account and cannot be undone.`"
      confirmLabel="Yes, Remove"
      @confirm="handleDelete"
      @cancel="deleteTarget = null"
    />

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-foreground">Staff</h2>
        <p class="text-sm text-muted-foreground mt-0.5">{{ staffList.length }} accounts</p>
      </div>
      <button class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs" @click="showForm = !showForm">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Create Account
      </button>
    </div>

    <div v-if="showForm" class="bg-card border border-border rounded-xl p-6">
      <h3 class="text-sm font-bold text-foreground mb-5">New Staff Account</h3>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Full Name</label>
            <input v-model="form.name" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm" placeholder="Enter full name" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Email Address</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm" placeholder="staff@branch.ae" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Role</label>
            <select v-model="form.role" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Counter Staff</option>
              <option>Admin</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Counter Assignment</label>
            <select v-model="form.counter" class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Unassigned</option>
              <option v-for="c in counters" :key="c.id" :value="c.name">{{ c.name }}</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3">
          <button type="submit" class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-3 py-1.5 text-xs">
            Create Account
          </button>
          <button type="button" class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 bg-transparent text-foreground hover:bg-muted active:bg-border px-3 py-1.5 text-xs border border-border" @click="showForm = false">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        v-model="search"
        class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        placeholder="Search staff…"
      />
    </div>

    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/40">
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Name</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Role</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Counter</th>
              <th class="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              <th class="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="m in filtered" :key="m.id" class="transition-[box-shadow,background-color] duration-150 hover:bg-muted/40 hover:shadow-[0_5px_12px_-5px_rgba(17,24,39,0.55)]">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{{ m.name.charAt(0) }}</div>
                  <span class="font-semibold text-foreground">{{ m.name }}</span>
                </div>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{{ m.email }}</td>
              <td class="px-5 py-3.5">
                <span :class="['inline-flex items-center px-2 py-0.5 rounded text-xs font-bold', m.role === 'Admin' ? 'bg-primary-light text-primary-dark-text' : 'bg-muted text-muted-foreground']">
                  {{ m.role }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{{ m.counter || '—' }}</td>
              <td class="px-5 py-3.5">
                <span :class="['inline-flex items-center gap-1.5 text-xs font-bold', m.active ? 'text-success' : 'text-muted-foreground']">
                  <span :class="['w-1.5 h-1.5 rounded-full flex-shrink-0', m.active ? 'bg-success' : 'bg-muted-foreground']" />
                  {{ m.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="p-1.5 rounded hover:bg-muted transition-colors" title="Edit">
                    <svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="p-1.5 rounded hover:bg-danger-light transition-colors group" title="Remove" @click="deleteTarget = m">
                    <svg class="w-3.5 h-3.5 text-muted-foreground group-hover:text-danger transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>