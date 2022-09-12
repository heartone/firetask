<script setup>
import { ref, watch, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.js'
import { db } from '@/FirebaseConfig.js'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import TaskHeader from '@/views/tasks/TaskHeader.vue'
import TasksList from '@/views/tasks/TasksList.vue'

const route = useRoute()
const appStore = useAppStore()
const projectId = route.params.projectId
appStore.currentProjectId = projectId
</script>
<template>
  <TaskHeader />
  <div class="container-fluid py-3 overflow-x-auto">
    <TasksList />
  </div>
</template>
