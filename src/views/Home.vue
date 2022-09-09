<script setup>
import NewProject from '@/views/projects/NewProject.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
</script>
<template>
  <div class="container-fluid py-3">
    <div class="bg-white border-b">
      <NewProject />
    </div>
    <div v-for="project in appStore.projects" :key="project.id">
      <div class="bg-white border-b">
        <div class="">
          <router-link class="block p-4 text-xl hover:text-orange-600" :to="{name: 'project', params:{ projectId: project.id }}">
            <i class="fa fa-circle mr-2 text-orange-400" :class="{'text-gray-300': project.id !== appStore.currentProjectId}"></i>
            {{ project.name }}
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>
