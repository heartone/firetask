<script setup>
import TaskHeader from '@/views/tasks/TaskHeader.vue'
import { ref, computed, watch } from "vue"
import{ db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query, where, orderBy, updateDoc, doc  } from "firebase/firestore"
import TasksCol from '@/views/tasks/TasksCol.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.js'



const appStore = useAppStore()
const projectId = useRoute().params.projectId
appStore.currentProjectId = projectId
const tasks = ref([])
const statuses = ['todo', 'doing', 'done']
const tasksRef = collection(db, "tasks")
const progressCount = computed(() => {
  const taskStatuses = tasks.value.map(t => t.status)
  const count = {}
  taskStatuses.forEach ((st) => {
    count[st] = (count[st] || 0) + 1
  })
  return count
})
const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        tasksRef, where("projectId", "==", projectId), orderBy("priority", "asc")//, orderBy("createdAt", "desc")
      )
    )
    // const querySnapshot = await getDocs(collection(db, "tasks"))
    tasks.value = querySnapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))
  } catch (error) {
    console.error(error)
  }
}
// 変更を監視
onSnapshot(tasksRef,  () => {
  getTasks()
})

watch(progressCount, (newValue, oldValue) => {

  // 現在のプロジェクトの値を更新
  if (
    JSON.stringify(Object.entries(appStore.currentProject.count).sort())
    !=
    JSON.stringify(Object.entries(progressCount.value).sort())
  )

  try {
    updateDoc(doc(db, "projects", projectId), {
      count: newValue
    });
    appStore.currentProject.count = progressCount.value
    console.log('updateProgressCount!!!')

  } catch (error) {
    console.error(error)
  }
})



</script>
<style scoped>
.tasksCols {
  min-width: 1000px;
}
</style>
<template>
  <TaskHeader :progressCount="progressCount"  />

  <div class="container-fluid py-3 overflow-x-auto">
    <div class="tasksCols grid grid-cols-3 gap-4">
      <template v-for="status in statuses" :key="status">
        <TasksCol :status="status" :tasks="tasks.filter(task => task.status == status)" />
      </template>
    </div>
  </div>
</template>
