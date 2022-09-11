<script setup>
import { ref, reactive } from "vue"
import{ db } from '@/FirebaseConfig.js'
import {  collection, addDoc,  } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
const inputNewProjectName = ref(null)

const newProject = reactive({
  name: '',
  uid: useAppStore().currentUser.uid,
  priority: 0
})
const createProject = async () => {
  try {
    const docRef = await addDoc(collection(db, "projects"), newProject);
    newProject.name = ''
    inputNewProjectName.value.focus()
  } catch (error) {
    console.error(error);
  }
}
</script>
<template>
  <form @submit.prevent="createProject">
    <div class="flex">
      <input type="text" ref="inputNewProjectName" class="form-control-sm form-control-dark text-gray-800 flex-grow" v-model="newProject.name" placeholder="プロジェクト名を入力">
      <button type="submit" class="btn-sm btn-dark ml-1">Add Project</button>
    </div>
  </form>
</template>
