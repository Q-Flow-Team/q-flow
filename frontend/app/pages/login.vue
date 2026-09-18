<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

definePageMeta({ layout: false })

const id = ref('')
const pw = ref('')
const err = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!id.value.trim() || !pw.value.trim()) {
    err.value = 'Please enter your Employee ID and password.'
    return
  }
  err.value = ''
  loading.value = true
  try {
    const { login } = useAuth()
    const res = await login(id.value.trim(), pw.value)
    if (res.user.role === 'ADMIN') {
      navigateTo('/admin')
    } else {
      navigateTo(res.user.activeCounter ? '/staff' : '/staff/counter')
    }
  } catch (e: any) {
    err.value = e?.message || 'Sign in failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-page flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-sm mx-auto">
      <div class="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <div class="mb-8">
          <QFlowLogo size="lg" />
          <h2 class="text-xl font-bold text-foreground mt-5">Sign In</h2>
          <p class="text-sm text-muted-foreground mt-1">Access your Q-Flow dashboard</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Employee ID</label>
            <input
              v-model="id"
              class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              placeholder="e.g. ADM-001 or STF-001"
            />
          </div>
          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-foreground">Password</label>
            <input
              v-model="pw"
              type="password"
              class="w-full px-3 py-2.5 rounded-lg border border-border bg-input-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div v-if="err" class="flex items-start gap-2.5 p-3 bg-danger-light border border-danger-light-border rounded-lg">
            <svg class="w-4 h-4 text-danger flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p class="text-sm text-danger">{{ err }}</p>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active px-5 py-3 text-base"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            {{ loading ? 'Signing in…' : 'Sign In' }}
            <svg v-if="!loading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>