<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useRoute } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import '@/assets/github-markdown-css.css'
// import '@/assets/highlightjs.css'
import 'highlight.js/styles/monokai.css';
import Markdown from 'vue3-markdown-it'
import PageHeader from '@/components/PageHeader.vue'

// 状態管理
const appStore = useAppStore()

// 現在のプロジェクト
appStore.currentProjectId = useRoute().params.projectId

const route = useRoute()
const projectId = route.params.projectId
const taskId = route.params.taskId
const editTask = ref({})
const originTask = ref({})
// タスク取得
const getTask = async () => {
  try {
    const docSnap = await getDoc(doc(db, "tasks", taskId));
    editTask.value = docSnap.data()
    originTask.value = docSnap.data()
  } catch (error) {
    console.error(error);
  }
}
// タスク読み込み
onMounted(getTask())
// タスクの変更監視
const isEdited = computed(() => {
  return (
    editTask.value.content != originTask.value.content
    ||
    editTask.value.status != originTask.value.status
    ||
    editTask.value.priority != originTask.value.priority
    ||
    editTask.value.description != originTask.value.description
    ||
    editTask.value.projectId != originTask.value.projectId

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
      updateTask()
    }
  }
}

// タスク編集
const updateTask = async () => {
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      content: editTask.value.content,
      description: editTask.value.description,
      status: editTask.value.status,
      projectId: editTask.value.projectId,
    });
    getTask()
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <PageHeader>
    <div class="flex items-center justify-between md:justify-start">
      <h3 class="text-lg flex items-center">
        <router-link :to="{name: 'project'}" class="btn-sm btn-secondary mr-1"><i class="fa fa-chevron-left"></i></router-link>
        タスクの編集
      </h3>
      <div class="ml-5">
        <button :disabled="!isEdited" @click="updateTask" type="submit" class="btn-sm btn-primary"><i class="fa fa-save mr-1"></i>Save</button>
      </div>
    </div>
  </PageHeader>
  <div class="container-fluid py-3">
    <div class="md:grid sm:grid-cols-12 gap-5">
      <div class="md:col-span-5 mb-5">
        <dl class="form-list">
          <dt>タスク内容</dt>
          <dd><input type="text" v-model="editTask.content" class="form-control w-full" placeholder="タスク内容を入力"></dd>
          <dt>ステータスと優先度</dt>
          <dd>
            <div class="grid grid-cols-5 gap-0.5 items-center">
              <template v-for="status in ['todo','doing','done']" :key="status">
                <button type="button" class="p-1 w-full text-xs text-white" :class="{'bg-gray-300 hover:bg-gray-300': editTask.status == status, 'bg-gray-400 hover:bg-gray-500': editTask.status != status}" @click="editTask.status=status">{{ status.toUpperCase() }}</button>
              </template>
              <div class="col-span-2 ml-4">
                <select v-model="editTask.priority" class="py-1 px-3 border text-sm border rounded">
                  <template v-for="priority in ['A','B','C']" :key="priority">
                    <option :value="priority">優先度 : {{ priority }}</option>
                  </template>
                </select>
              </div>
            </div>
          </dd>
          <dt>メモ</dt>
          <dd>
            <textarea v-model="editTask.description" class="form-control w-full text-sm" rows="7"></textarea>
          </dd>
          <dt>プロジェクトを変更</dt>
          <dd>
            <select v-model="editTask.projectId" class="form-control">
              <template v-for="project in appStore.projects" :key="project.id">
                <option :value="project.id">{{ project.name }}</option>
              </template>
            </select>
          </dd>
        </dl>
      </div>

      <div class="md:col-span-7 bg-white rounded-lg p-3">
        <h1 class="text-2xl mb-4 pb-4 py-1 border-b">{{ editTask.content }}</h1>
        <Markdown class="markdown-body" :source="editTask.description" />
      </div>

    </div>
  </div>
</template>
