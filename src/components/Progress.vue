<script setup>
const props = defineProps({
  value: {
    default: 0
  }
})
</script>
<template>
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center py-0.5 leading-none rounded-full" :class="{'text-gray-600': value < 10}" :style="{width: value+'%', textIndent: value < 10 ?'2rem' : 0}"> {{value}}%</div>
  </div>
</template>
