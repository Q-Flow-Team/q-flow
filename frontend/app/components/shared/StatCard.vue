<script setup lang="ts">
defineProps<{ label: string; value: string | number; sub?: string }>()
</script>

<template>
  <div class="bg-card border border-border rounded-xl p-5">
    <p class="text-sm font-medium text-muted-foreground">{{ label }}</p>
    <p class="text-3xl font-bold text-foreground mt-1 tabular-nums">{{ value }}</p>
    <p v-if="sub" class="text-xs text-muted-foreground mt-1">{{ sub }}</p>
  </div>
</template>