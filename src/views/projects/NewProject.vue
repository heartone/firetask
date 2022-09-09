<script setup>
import { ref, reactive } from "vue"
import{ db } from '@/FirebaseConfig.js'
import {  collection, addDoc,  } from "firebase/firestore"
const inputNewProjectName = ref(null)

const newProject = reactive({
  name: '',
  uid: '',
  order: 0
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
    <div class="flex p-2 border-gray-800 items-strech">
      <input type="text" ref="inputNewProjectName" class="form-control-sm form-control-dark text-gray-800 flex-grow" v-model="newProject.name" placeholder="プロジェクト名を入力">
      <button type="submit" class="btn-sm btn-dark ml-1">追加</button>
    </div>
  </form>
</template>
