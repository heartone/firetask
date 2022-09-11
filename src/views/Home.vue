<script setup>
import NewProject from '@/views/projects/NewProject.vue'
import ProjectProgress from '@/views/projects/ProjectProgress.vue'
import Logout from '@/components/Logout.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useAppStore } from '@/stores/app.js'
import { computed } from 'vue'
const appStore = useAppStore()
const qrcodeUrl = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&&choe=UTF-8&chl=" + encodeURI(location.href)

const progressCount = computed(() => {
  const count = {
    todo: appStore.projects.reduce((sum, p) => sum += (p.count?.todo || 0), 0),
    doing: appStore.projects.reduce((sum, p) => sum += (p.count?.doing || 0), 0),
    done: appStore.projects.reduce((sum, p) => sum += (p.count?.done || 0), 0),
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
    <template v-for="project in appStore.projects" :key="project.id">
      <router-link class="block p-4 bg-white border-b text-xl hover:text-orange-600" :to="{name: 'project', params:{ projectId: project.id }}">
        <div class="md:grid grid-cols-3">
          <div class="flex items-center">
              <i class="fa fa-circle mr-2 text-orange-400" :class="{'text-gray-300': project.id !== appStore.currentProjectId}"></i>
              <div class="truncate">{{ project.name }}</div>
          </div>
          <div class="flex items-center pt-4 md:pt-0">
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
    <div class="py-5">
      <Logout />
    </div>
  </div>
  <div class="py-5 flex justify-center">
    <img :src="qrcodeUrl" alt="">
  </div>
</template>
