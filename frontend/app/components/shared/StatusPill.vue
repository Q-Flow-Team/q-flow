<script setup lang="ts">
import { statusLabel } from '~/utils/format'

const props = defineProps<{ status: string }>()

const styles: Record<string, string> = {
  WAITING: 'bg-primary-light text-primary-dark-text',
  CALLED: 'bg-primary text-white',
  IN_SERVICE: 'bg-foreground text-white',
  SERVED: 'bg-success-light text-success',
  SKIPPED: 'bg-muted text-muted-foreground',
  CANCELLED: 'bg-danger-light text-danger',
  AUTO_CANCELLED: 'bg-danger-light text-danger',
  // Legacy / display labels
  'Waiting': 'bg-primary-light text-primary-dark-text',
  'Near Turn': 'bg-primary text-white',
  'Now Serving': 'bg-foreground text-white',
  'Skipped': 'bg-muted text-muted-foreground',
  'Served': 'bg-success-light text-success',
}

const cls = computed(() => styles[props.status] || 'bg-muted text-muted-foreground')
const label = computed(() => statusLabel(props.status))
</script>

<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap', cls]">
    {{ label }}
  </span>
</template>
