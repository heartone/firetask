<script setup>
const props = defineProps(['task'])
import{ db } from '@/FirebaseConfig.js'
import { doc, deleteDoc  } from "firebase/firestore"
const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.log("削除できませんでした：", error)
  } finally {

  }
}
</script>
<template>
  <div class="p-2 my-5 bg-white shadow-lg">
    <div class="flex">
      <div>{{task.priority}}</div>
      <div><router-link :to="{name: 'taskEdit', params: {taskId: task.id}}">{{ task.content }}</router-link></div>
    </div>
    <div>
      <button @click="deleteTask(task.id)">&times;</button> : {{ task.createdAt.toDate().toLocaleString() }}
    </div>
  </div>
</template>
