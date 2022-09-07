<script setup>
import { reactive, ref } from "vue"
import{ db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, doc, addDoc, getDocs, deleteDoc  } from "firebase/firestore"
const tasks = ref([])
const newTask = reactive({
  content: '',
  status: 'todo',
  priority: 'A',
  createdAt: null,
})

const createTask = async () => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...newTask,
      createdAt: Date.now()
    });
    console.log("Document written with ID: ", docRef.id);
    newTask.content = ''
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
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
const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {

  } finally {

  }
}

onSnapshot(collection(db, "tasks"), () => getTasks());
</script>
<template>
  <div class="flex">
    <form @submit.prevent="createTask()" class="flex">
      <input type="text" v-model="newTask.content" class="form-control" placeholder="タスクを入力">
      <button type="submit" class="btn btn-success ml-1">追加</button>
    </form>
  </div>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <button @click="deleteTask(task.id)">&times;</button> : {{ task.createdAt }} : {{ task.content }} : {{ task.id }}
      </li>
    </ul>
  </div>
</template>
