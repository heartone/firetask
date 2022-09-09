<script setup>
import { ref } from "vue"
import{ db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query, where, orderBy  } from "firebase/firestore"
import TasksCol from '@/views/tasks/TasksCol.vue'
import { useRoute, useRouter } from 'vue-router'
const projectId = useRoute().params.projectId
const tasks = ref([])
const getTasks = async () => {
  try {
    const tasksRef = collection(db, "tasks")
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
    console.log(error)
  } finally {

  }
}

onSnapshot(collection(db, "tasks"), () => getTasks());
</script>
<style scoped>
.tasksCols {
  min-width: 1000px;
}
</style>
<template>

  <div class="tasksCols grid grid-cols-3 gap-2">
    <TasksCol status="todo" :tasks="tasks.filter(task => task.status == 'todo')" />
    <TasksCol status="doing" :tasks="tasks.filter(task => task.status == 'doing')" />
    <TasksCol status="done" :tasks="tasks.filter(task => task.status == 'done')" />
  </div>
</template>
