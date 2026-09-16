<script setup lang="ts">
defineProps<{ status: string }>()

const styles: Record<string, string> = {
  'Waiting': 'bg-primary-light text-primary-dark-text',
  'Near Turn': 'bg-primary text-white',
  'Now Serving': 'bg-foreground text-white',
  'Skipped': 'bg-muted text-muted-foreground',
  'Served': 'bg-muted text-muted-foreground',
}
</script>

<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap', styles[status]]">
    {{ status }}
  </span>
</template>