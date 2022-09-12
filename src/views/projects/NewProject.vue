<script setup>
import { ref, reactive } from "vue"
import { useAppStore } from '@/stores/app.js'
import { db } from '@/FirebaseConfig.js'
import { collection, addDoc,  } from "firebase/firestore"

const inputNewProjectName = ref(null)
const appStore = useAppStore()
const newProject = reactive({
  name: '',
  uid: appStore.currentUser.uid,
  priority: 0
})
const createProject = async () => {
  try {
    const docRef = await addDoc(collection(db, "projects"), newProject);
    newProject.name = ''
    inputNewProjectName.value.focus()
    appStore.flash = 'プロジェクトを作成しました'
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
