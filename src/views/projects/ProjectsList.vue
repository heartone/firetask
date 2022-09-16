<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app.js'
import PageHeader from '@/components/PageHeader.vue'
import NewProject from '@/views/projects/NewProject.vue'
import ProjectProgress from '@/views/projects/ProjectProgress.vue'
import Logout from '@/components/Logout.vue'

const store = useAppStore()
// タスク解除
store.currentTaskId = null
const progressCount = computed(() => {
  const count = {
    todo: store.projects.reduce((sum, p) => sum += (p.count?.todo || 0), 0),
    doing: store.projects.reduce((sum, p) => sum += (p.count?.doing || 0), 0),
    done: store.projects.reduce((sum, p) => sum += (p.count?.done || 0), 0),
  }
  return count
})
</script>
<template>
  <PageHeader>
    <NewProject />
    <ProjectProgress class="mt-2 md:m-0" :count=progressCount />
  </PageHeader>
  <div class="container-fluid py-3">
    <template v-for="project in store.projects" :key="project.id">
      <router-link class="block p-4 bg-white border-b text-xl hover:text-orange-600" :to="{name: 'project', params:{ projectId: project.id }}">
        <div class="md:grid grid-cols-3">
          <div class="flex items-center justify-between">
              <div class="flex items-center min-w-0">
                <i class="fa fa-circle mr-2 text-orange-400" :class="{'text-gray-300': project.id !== store.projectId}"></i>
                <div class="truncate">{{ project.name }}</div>
              </div>
              <div class="whitespace-nowrap text-xs text-gray-500 mr-2">優先度:{{ project.priority }}</div>
          </div>
          <div class="flex items-center justify-center pt-4 md:pt-0">

            <div class="whitespace-nowrap py-0.5 px-3 rounded-full text-xs bg-yellow-200">TODO {{ project.count?.todo || 0 }}</div>
            <div class="whitespace-nowrap py-0.5 px-3 rounded-full text-xs bg-red-200 mx-1">DOING {{ project.count?.doing || 0 }}</div>
            <div class="whitespace-nowrap py-0.5 px-3 rounded-full text-xs bg-green-200">DONE {{ project.count?.done || 0 }}</div>
          </div>
          <div class="flex items-center pt-2 md:pt-0">
            <ProjectProgress :count="project.count" />
          </div>
        </div>
      </router-link>
    </template>
    <div class="py-3">
      <Logout />
    </div>
  </div>
</template>
