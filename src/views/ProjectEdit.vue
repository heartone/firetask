<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useProject } from '@/composables/useProject'
import { useTask } from '@/composables/useTask'
import '@/assets/github-markdown-css.css'
import 'highlight.js/styles/monokai.css'
import PageHeader from '@/components/PageHeader.vue'
import Markdown from 'vue3-markdown-it'
import Modal from '@/components/Modal.vue'
import ElasticTextArea from '@/components/ElasticTextArea.vue'

const store = useAppStore()
const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const editProject = ref({})
const originProject = ref({})
if (!store.projectId) {
  store.projectId = projectId
}
store.currentTaskId = null

// プロジェクト取得
const getProject = async () => {
  try {
    const docSnap = await useProject().getProject(projectId)
    editProject.value = docSnap.data()
    originProject.value = docSnap.data()
  } catch (e) {
    console.log(e)
    store.error = e.message
  }
}

// プロジェクト読み込み
onMounted(getProject())

// プロジェクト変更監視
const isEdited = computed(() => {
  // 指定の属性のうち一つでも変更があればtrueを返す
  return ["name", "priority", "description"].map((attr) => editProject.value[attr] != originProject.value[attr]).includes(true)
})

// ショートカットキー登録
onMounted(() => {
  document.addEventListener('keydown', saveByShortcutKey)
})
onUnmounted(() => {
  document.removeEventListener('keydown', saveByShortcutKey)
})
// ショートカットキー実行
const saveByShortcutKey = (event) => {
  if (event.ctrlKey || event.metaKey){
    if (event.key == 's') {
      event.preventDefault()
      updateProject()
    } else if (event.key == 'Enter') {
      event.preventDefault()
      if (isEdited.value) {
        updateProject()
      }
      router.push({name: "project"})
    }
  }
}
// プロジェクト編集
const updateProject = async () => {
<<<<<<< HEAD:src/views/projects/ProjectEdit.vue
  await updateDoc(doc(db, "users", store.uid, "projects", projectId), {
    name: editProject.value.name || '',
    priority: parseInt(editProject.value.priority) || 0,
    description: editProject.value.description || '',
  });
  getProject()
  store.flash = '保存しました'
=======
  try {
    await useProject().updateProject(projectId, {
      name: editProject.value.name || '',
      priority: parseInt(editProject.value.priority) || 0,
      description: editProject.value.description || '',
    })
    getProject()
    store.flash = '保存しました'
  } catch (e) {
    console.log(e)
    store.error = e.message
  }
>>>>>>> restructure:src/views/ProjectEdit.vue

}
// プロジェクト削除
const showModal = ref(false)
const deleteProject = async () => {
  // 関連タスクを削除
  const snapshot = await useTask().getTasks(projectId)
  snapshot.docs.map(task => {
     useTask().deleteTask(task.id)
  })
  // プロジェクトを削除
<<<<<<< HEAD:src/views/projects/ProjectEdit.vue
  await deleteDoc(doc(db, "users", store.uid, "projects", projectId))
=======
  await useProject().deleteProject(projectId)
  store.projectId = null
>>>>>>> restructure:src/views/ProjectEdit.vue
  router.push({name: 'home'})
  store.flash = 'プロジェクトを削除しました'

}

</script>
<template>
  <PageHeader>
    <div class="flex justify-between md:justify-start items-center">
      <h3 class="text-lg flex items-center">
        <router-link :to="{name: 'project'}" class="btn bg-gray-200 mr-2"><i class="fa fa-chevron-left"></i></router-link>
        プロジェクトの編集
      </h3>
      <div class="ml-6">
        <button :disabled="!isEdited" @click="updateProject" type="submit" class="btn btn-primary"><i class="fa fa-save mr-1"></i>Save</button>
      </div>
    </div>

  </PageHeader>
  <div class="container-fluid py-3">
    <div class="md:grid sm:grid-cols-12 gap-5">
      <div class="md:col-span-5 mb-5">
        <dl class="form-list sticky top-0">
          <dt>プロジェクト名</dt>
          <dd><input type="text" v-model="editProject.name" class="form-control w-full" placeholder="プロジェクト名を入力" autofocus></dd>
          <dt>優先度</dt>
          <dd class="flex">
            <input type="number" v-model="editProject.priority" min="0" max="100" class="form-control mr-3">
            <input type="range" v-model="editProject.priority" min="0" max="100" step="5">
          </dd>
          <dt>メモ</dt>
          <dd>
            <ElasticTextArea v-model="editProject.description" class="form-control w-full text-sm" rows="4"></ElasticTextArea>
            <div class="mt-6 hidden md:block text-sm text-gray-500">ctrl + s または command + s で保存</div>
          </dd>
        </dl>
      </div>

      <div class="md:col-span-7 bg-white rounded-lg p-3 overflow-y-auto">
        <h1 class="text-2xl mb-4 pb-4 py-1 border-b">{{ editProject.name }}</h1>
        <Markdown class="markdown-body" :source="editProject.description" rows="4" />
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
