<script setup>
<<<<<<< HEAD
import { ref, reactive } from "vue"
import { db } from '@/FirebaseConfig.js'
import { collection, addDoc,  } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'

=======
import { ref, reactive } from 'vue'
import { useAppStore } from '@/stores/app'
import { useTask } from '@/composables/useTask'
>>>>>>> restructure
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
const addTask = async () => {
  try {
    await useTask().addTask({
      ...newTask,
<<<<<<< HEAD
      projectId: store.currentProject.id,
=======
>>>>>>> restructure
      createdAt: new Date()
    })
    store.flash = 'タスクを追加しました'
    newTask.content = '' // 入力欄をクリア
    inputNewTaskContent.value.focus() // 入力欄にフォーカス
  } catch (e) {
    store.error = e.message
  }
}
</script>
<template>
  <form @submit.prevent="addTask" class="flex">
    <input type="text" enterkeyhint="send" ref="inputNewTaskContent" v-model="newTask.content" class="flex-grow form-control-sm" placeholder="タスクを入力" autofocus>
    <button type="submit" class="btn-sm btn-dark ml-1">Add Task</button>
  </form>
</template>
