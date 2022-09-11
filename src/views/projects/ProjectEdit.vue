<script setup>
import { watch, ref, computed, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, collection, query, where, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import '@/assets/github-markdown-css.css'
// import '@/assets/highlightjs.css'
import 'highlight.js/styles/monokai.css';
import PageHeader from '@/components/PageHeader.vue'
import Markdown from 'vue3-markdown-it'
import Modal from '@/components/Modal.vue'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const editProject = ref({})
const originProject = ref({})
if (!appStore.currentProjectId) {
  appStore.currentProjectId = projectId
}
// プロジェクト取得
const getProject = async () => {
  try {
    const docSnap = await getDoc(doc(db, "projects", projectId));
    editProject.value = docSnap.data()
    originProject.value = docSnap.data()

  } catch (error) {
    console.error(error)
  }
}
// プロジェクト読み込み
onMounted(getProject())

const isEdited = computed(() => {
  return (
    editProject.value.name != originProject.value.name
    ||
    editProject.value.priority != originProject.value.priority
    ||
    editProject.value.description != originProject.value.description
  )
})

// ショートカットキーによる保存
onMounted(() => {
  document.addEventListener('keydown', saveByShortcutKey)
})
onUnmounted(() => {
  document.removeEventListener('keydown', saveByShortcutKey)
})
const saveByShortcutKey = (event) => {
  if (event.ctrlKey || event.metaKey){
    if (event.key == 's') {
      event.preventDefault()
      // 保存
      updateProject()
    }
  }
}
// プロジェクト編集
const updateProject = async () => {
  await updateDoc(doc(db, "projects", projectId), {
    name: editProject.value.name || '',
    priority: parseInt(editProject.value.priority) || 0,
    description: editProject.value.description || '',
  });
  getProject()
  appStore.flash = '保存しました'

}
// プロジェクト削除
const showModal = ref(false)
const deleteProject = async () => {
  // 関連タスクを削除
  const tasksRef = collection(db, "tasks")
  const querySnapshot = await getDocs(
    query(
      tasksRef, where("projectId", "==", projectId)
    )
  )
  querySnapshot.docs.map(task => {
     deleteDoc(doc(db, "tasks", task.id))
  })
  // プロジェクトを削除
  await deleteDoc(doc(db, "projects", projectId))
  router.push({name: 'home'})
  appStore.flash = 'プロジェクトを削除しました'

}

</script>
<template>
  <PageHeader>
    <div class="flex justify-between md:justify-start items-center">
      <h3 class="text-lg flex items-center">
        <router-link :to="{name: 'project'}" class="btn-sm btn-secondary mr-1"><i class="fa fa-chevron-left"></i></router-link>
        プロジェクトの編集
      </h3>
      <div class="ml-5">
        <button :disabled="!isEdited" @click="updateProject" type="submit" class="btn-sm btn-primary"><i class="fa fa-save mr-1"></i>Save</button>
      </div>
    </div>

  </PageHeader>
  <div class="container-fluid py-3">
    <div class="md:grid sm:grid-cols-12 gap-5">
      <div class="md:col-span-5 mb-5">
        <dl class="form-list">
          <dt>プロジェクト名</dt>
          <dd><input type="text" v-model="editProject.name" class="form-control w-full" placeholder="プロジェクト名を入力" autofocus></dd>
          <dt>優先度</dt>
          <dd class="flex">
            <input type="number" v-model="editProject.priority" min="0" max="100" class="form-control mr-3">
            <input type="range" v-model="editProject.priority" min="0" max="100" step="5">
          </dd>
          <dt>メモ</dt>
          <dd>
            <textarea @keydown="save" v-model="editProject.description" class="form-control w-full text-sm" rows="10"></textarea>
          </dd>
        </dl>
        <div class="hidden md:block text-sm text-gray-500">ctrl + s または command + s で保存</div>
      </div>

      <div class="md:col-span-7 bg-white rounded-lg p-3 overflow-y-auto">
        <h1 class="text-2xl mb-4 pb-4 py-1 border-b">{{ editProject.name }}</h1>
        <Markdown class="markdown-body" :source="editProject.description" />
      </div>
    </div>
    <hr class="mt-6">
    <div class="mt-6">
      <button class="btn-sm" @click="showModal=true"><i class="fa fa-trash-alt mr-2"></i>Delete</button>
    </div>
  </div>
  <Modal :show="showModal" @close="showModal=false">
    <template #title>削除確認</template>
    <template #content>このプロジェクトと関連タスクをすべて削除します。よろしいですか？</template>
    <template #footer>
      <button @click="deleteProject" class="btn btn-danger">Delete</button>
      <button @click="showModal=false" class="btn btn-secondary ml-3">Cancel</button>
    </template>
  </Modal>
</template>
