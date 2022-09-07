<script setup>
import { ref, reactive } from "vue"
import{ db } from '@/FirebaseConfig.js'
import {  collection, addDoc,  } from "firebase/firestore"
const inputNewTaskContent = ref(null)
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
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    newTask.content = ''
    inputNewTaskContent.value.focus()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
</script>
<template>
  <div class="flex">
    <form @submit.prevent="createTask()" class="flex">
      <input type="text" ref="inputNewTaskContent" v-model="newTask.content" class="form-control" placeholder="タスクを入力" autofocus>
      <button type="submit" class="btn btn-success ml-1">追加</button>
    </form>
  </div>
</template>
