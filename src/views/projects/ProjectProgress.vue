<script setup>
import Progress from '@/components/Progress.vue'
import { computed } from 'vue'
const props = defineProps(['count'])

const value = computed (() => {
  const todoCount =  parseInt(props.count?.todo || 0)
  const doingCount =  parseInt(props.count?.doing || 0)
  const doneCount =  parseInt(props.count?.done || 0)
  const total = todoCount + doingCount + doneCount
  return parseInt((doneCount / total) * 100) || 0
})
</script>
<template>
  <Progress :value="value" />
</template>
