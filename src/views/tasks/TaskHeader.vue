<script setup>
import { useAppStore } from '@/stores/app.js'
import NewTask from '@/views/tasks/NewTask.vue'
import PageHeader from '@/components/PageHeader.vue'
import ProjectProgress from '@/views/projects/ProjectProgress.vue'

const props = defineProps(['progressCount'])
const appStore = useAppStore()
</script>

<template>
  <PageHeader>
    <NewTask />
    <ProjectProgress class="mt-2 md:m-0" :count="progressCount" />
  </PageHeader>
</template>
