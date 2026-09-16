<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const sizeClass = computed(() => ({ sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[props.size]))
</script>

<template>
  <div :class="['font-extrabold tracking-tight leading-none', sizeClass]">
    <span class="text-primary">Q</span><span class="text-foreground">Flow</span>
  </div>
</template>