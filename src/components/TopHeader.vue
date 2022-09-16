<script setup>
import { useAppStore } from "@/stores/app.js"
import Logo from '@/components/Logo.vue'
const store = useAppStore()
</script>
<style scoped>
.router-link-active {
  color: #ed8;
}
</style>
<template>
  <header class="bg-gray-800 text-gray-200">
    <div class="container-fluid flex justify-between items-center">
      <div class="flex items-center overflow-hidden h-12">
        <router-link class="mr-3" to="/">
          <Logo />
        </router-link>
        <div v-if="store.currentProject" class="flex flex-1 overflow-hidden items-center">
          <i class="fa fa-caret-right text-gray-400 fa-fw"></i>
          <router-link class="flex-1 px-3 truncate" :to="{name: 'project', params: {projectId: store.currentProject.id}}">{{ store.currentProject.name }}</router-link>
          <router-link class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black text-sm text-gray-400 hover:text-gray-100 duration-300 transition-all" :to="{name: 'projectEdit', params: {projectId: store.currentProject.id}}"><i class="fa fa-gear"></i></router-link>
        </div>
      </div>
    </div>
  </header>
</template>
