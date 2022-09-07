<script setup>
import { ref } from "vue"
import{ db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, doc, getDocs, deleteDoc  } from "firebase/firestore"
import TaskCard from '@/components/TaskCard.vue'

const tasks = ref([])
const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"))
    tasks.value = querySnapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))

  } catch (error) {

  } finally {

  }
}

onSnapshot(collection(db, "tasks"), () => getTasks());
</script>
<template>

  <div class="grid grid-cols-3 gap-2">
    <div>
      <div class="mb-3 flex justify-center items-center">
        <span class="text-lg">TODO</span>
        <span class="py-0.5 px-2 text-sm rounded bg-indigo-200 ml-3">{{ tasks.length }}</span></div>
      <ul class="bg-gray-300 px-3 py-1 rounded">
        <div v-for="task in tasks" :key="task.id">
          <TaskCard :task="task" />
        </div>
      </ul>
    </div>
  </div>
</template>
