<script setup>
import { ref, reactive } from "vue"
import{ db } from '@/FirebaseConfig.js'
import {  collection, addDoc,  } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
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
      projectId: appStore.currentProject.id,
      createdAt: new Date()
    });
    newTask.content = ''
    inputNewTaskContent.value.focus()
    // プロジェクト進捗更新
    // todo
  } catch (error) {
    console.error(error);
  }
}
</script>
<template>
  <form @submit.prevent="createTask()" class="flex">
    <input type="text" ref="inputNewTaskContent" v-model="newTask.content" class="flex-grow form-control-sm" placeholder="タスクを入力" autofocus>
    <button type="submit" class="btn-sm btn-dark ml-1">Add Task</button>
  </form>
</template>
