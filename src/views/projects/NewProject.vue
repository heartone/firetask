<script setup>
import { ref, reactive } from 'vue'
import { useAppStore } from '@/stores/app'
import { useProject } from '@/composables/useProject'

const inputNewProjectName = ref(null)
const store = useAppStore()
const newProject = reactive({
  name: '',
  priority: 0
})
const uid = store.currentUser.uid

const addProject = async () => {
  try {
    await useProject().addProject(newProject)
    newProject.name = ''
    inputNewProjectName.value.focus()
    store.flash = 'プロジェクトを作成しました'
  } catch (e) {
    console.log(e)
    store.error = e.message
  }
}
</script>
<template>
  <form @submit.prevent="addProject">
    <div class="flex">
      <input type="text" enterkeyhint="send" ref="inputNewProjectName" class="form-control-sm form-control-dark text-gray-800 flex-grow" v-model="newProject.name" placeholder="プロジェクト名を入力">
      <button type="submit" class="btn-sm btn-dark ml-1">Add Project</button>
    </div>
  </form>
</template>
