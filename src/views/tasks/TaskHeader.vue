<script setup>
import NewTask from '@/views/tasks/NewTask.vue'
import Progress from '@/components/Progress.vue'
</script>

<template>
  <div class="sticky top-0 z-10 container-fluid py-2 border-b border-gray-300 shadow bg-white">
    <div class="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 items-center">
      <NewTask />
      <div></div>
      <Progress class="my-2 md:m-0" :value="20" />
    </div>
  </div>
</template>
