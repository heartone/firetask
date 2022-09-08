<script setup>
import NewTask from '@/views/tasks/NewTask.vue'
import Progress from '@/views/tasks/Progress.vue'
</script>

<template>
  <div class="sticky top-0 z-10 container-fluid py-2 border-b border-gray-300 shadow bg-white">
    <div class="grid grid-cols-3 gap-2 items-center">
      <NewTask />
      <div></div>
      <Progress />
    </div>
  </div>
</template>
