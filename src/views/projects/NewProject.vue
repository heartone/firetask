<script setup>
import { ref, reactive } from "vue"
import { useAppStore } from '@/stores/app.js'
import { db } from '@/FirebaseConfig.js'
import { collection, addDoc, doc } from "firebase/firestore"

const inputNewProjectName = ref(null)
const store = useAppStore()
const newProject = reactive({
  name: '',
  priority: 0
})
const uid = store.currentUser.uid

const createProject = async () => {
  try {
    const projectRef = collection(db, "users", uid, "projects")
    await addDoc(projectRef, newProject)
    newProject.name = ''
    inputNewProjectName.value.focus()
    store.flash = 'プロジェクトを作成しました'
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <form @submit.prevent="createProject">
    <div class="flex">
      <input type="text" enterkeyhint="send" ref="inputNewProjectName" class="form-control-sm form-control-dark text-gray-800 flex-grow" v-model="newProject.name" placeholder="プロジェクト名を入力">
      <button type="submit" class="btn-sm btn-dark ml-1">Add Project</button>
    </div>
  </form>
</template>
