<script setup>
import NewTask from '@/views/tasks/NewTask.vue'
import ProjectProgress from '@/views/projects/ProjectProgress.vue'
import { useAppStore } from '@/stores/app.js'
import { reactive } from 'vue'
const props = defineProps(['progressCount'])
const appStore = useAppStore()
</script>

<template>
  <div class="sticky top-0 z-10 container-fluid py-2 border-b border-gray-300 shadow bg-white">
    <div class="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 items-center">
      <NewTask />
      <div></div>
      <ProjectProgress class="my-2 md:m-0" :count="progressCount" />
    </div>
  </div>
</template>
