<script setup>
import { ref, reactive } from "vue"
import{ db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query, orderBy } from "firebase/firestore"
import NavProjects from '@/views/projects/NavProjects.vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

</script>
<template>
  <ul>
    <li class="" v-for="project in appStore.projects" :key="project.id">
      <router-link class="block px-4 py-2 hover:bg-gray-800" :to="{name: 'project', params: {projectId: project.id}}">{{ project.name }}</router-link>
    </li>
  </ul>
</template>
