<script setup>
import { ref, reactive } from "vue"
import{ db } from '@/FirebaseConfig.js'
import {  collection, addDoc,  } from "firebase/firestore"
const inputNewTaskContent = ref(null)
const newTask = reactive({
  content: '',
  description: '',
  status: 'todo',
  priority: 'B',
  createdAt: null,
})

const createTask = async () => {

  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...newTask,
      createdAt: new Date()
    });
    newTask.content = ''
    inputNewTaskContent.value.focus()
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
</script>
<template>

      <form @submit.prevent="createTask()" class="flex">
        <input type="text" ref="inputNewTaskContent" v-model="newTask.content" class="flex-grow form-control-sm" placeholder="タスクを入力" autofocus>
        <button type="submit" class="btn btn-success ml-1">追加</button>
      </form>

</template>
