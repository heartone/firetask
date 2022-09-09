<script setup>
import Logo from '@/components/Logo.vue'
import NewProject from '@/views/projects/NewProject.vue'
import NavProjects from '@/views/projects/NavProjects.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

</script>
<style scoped>

.sideBar {
  left: -256px;
}
.sideBar.active {
  left: 0;
  box-shadow: 10px 0px 10px rgb(0 0 0 / 20%);
}
.backDrop {
  position: fixed;
  top: 100%;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  background-color: rgba(0, 0, 0, 0.0);
  transition: background-color .3s ease;
  visibility: invisible;
}
.backDrop.active {
  top: 0;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
<template>
  <div class="sideBar fixed z-20 w-64 bg-gray-700 text-gray-300 top-0 bottom-0 transition-all duration-300" :class="{'active': appStore.showSideBar}">
    <div class="py-3 px-4 border-b border-gray-800 cursor-pointer" @click="appStore.showSideBar = false">
      <Logo />
    </div>

    <div class="overflow-y-auto">
      <NewProject />
      <NavProjects />
    </div>
  </div>
  <div @click="appStore.showSideBar = false" class="backDrop" :class="{'active': appStore.showSideBar}"></div>
</template>
