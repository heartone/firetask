<script setup>
import { ref, reactive } from "vue"
import { db } from '@/FirebaseConfig.js'
import { collection, addDoc,  } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'

const store = useAppStore()
const inputNewTaskContent = ref(null) // input要素を参照

// 新規タスクオブジェクト
const newTask = reactive({
  content: '',
  description: '',
  status: 'todo',
  priority: 'B',
  createdAt: null,
})
// タスクを追加する
const createTask = async () => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...newTask,
      projectId: store.currentProject.id,
      createdAt: new Date()
    })
    store.flash = 'タスクを追加しました'
    newTask.content = '' // 入力欄をクリア
    inputNewTaskContent.value.focus() // 入力欄にフォーカス
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <form @submit.prevent="createTask()" class="flex">
    <input type="text" enterkeyhint="send" ref="inputNewTaskContent" v-model="newTask.content" class="flex-grow form-control-sm" placeholder="タスクを入力" autofocus>
    <button type="submit" class="btn-sm btn-dark ml-1">Add Task</button>
  </form>
</template>
