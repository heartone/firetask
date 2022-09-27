<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.js'
import { useTask } from '@/composables/useTask'
import Markdown from 'vue3-markdown-it'
import PageHeader from '@/components/PageHeader.vue'
import ElasticTextArea from '@/components/ElasticTextArea.vue'
import '@/assets/github-markdown-css.css'
import 'highlight.js/styles/monokai.css';

// 状態管理
const store = useAppStore()
// 現在のプロジェクト
const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const editProjectId = ref(projectId)
store.projectId = projectId

// 現在のタスク
const taskId = route.params.taskId
store.currentTaskId = null
const editTask = ref({})
const originTask = ref({})
store.currentTaskId = null

// マークダウン部を参照
const markdown = ref()

// タスク取得
const getTask = async () => {
  try {
    const docSnap = await useTask().getTask(taskId)
    editTask.value = docSnap.data()
    originTask.value = docSnap.data()
  } catch (e) {
    console.log(e);
    store.error = e.message
  }
}

// タスクの変更監視
const isEdited = computed(() => {
  // 指定の属性のうち一つでも変更があればtrueを返す
  return ["content", "status", "priority", "description"].map((attr) => editTask.value[attr] != originTask.value[attr]).includes(true)
})

// ショートカットキー登録
onMounted(() => {
  getTask()
  document.addEventListener('keydown', saveByShortcutKey)
})
onUnmounted(() => {
  document.removeEventListener('keydown', saveByShortcutKey)
})

// ショートカットキー実行
const saveByShortcutKey = (event) => {
  if (event.ctrlKey || event.metaKey){ // ctrlまたはcommandキーを押しながら
    if (event.key == 's') { // 保存
      event.preventDefault()
      updateTask()
    } else if (event.key == 'Enter') { // 保存して終了
      event.preventDefault()
      if (isEdited.value) {
        updateTask()
      }
      router.push({name: 'project'})
    }
  }
}

// タスク編集
const updateTask = async () => {
  try {
    await useTask().updateTask(taskId, {
      content: editTask.value?.content,
      description: editTask.value.description,
      status: editTask.value.status,
      priority: editTask.value.priority,
    });
    getTask()
    store.currentTaskId = taskId
    store.flash = '保存しました'
  } catch (e) {
    console.log(e)
    store.error = e.message
  }
}

// プロジェクト変更
const changeProject = async () => {
  try {
    await useTask().changeProject(editProjectId.value, taskId, {
      ...editTask.value,
      createdAt: new Date()
    })
    store.flash = 'プロジェクトを変更しました'
    router.push("/projects/" + editProjectId.value)
  } catch (e) {
    console.log(e);
    store.error = e.message
  }
}
</script>
<template>
  <PageHeader>
    <div class="flex items-center justify-between md:justify-start">
      <h3 class="text-lg flex items-center">
        <router-link :to="{name: 'project'}" class="btn bg-gray-200 mr-2"><i class="fa fa-chevron-left"></i></router-link>
        タスクの編集
      </h3>
      <div class="ml-6">
        <button :disabled="!isEdited" @click="updateTask" type="submit" class="btn btn-primary"><i class="fa fa-save mr-1"></i>Save</button>
      </div>
    </div>
  </PageHeader>
  <div class="container-fluid py-3">
    <div class="md:grid sm:grid-cols-12 gap-5">
      <div class="md:col-span-5 mb-5">
        <dl class="form-list sticky top-0">
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
            <ElasticTextArea v-model="editTask.description" class="form-control w-full text-sm" rows="4"></ElasticTextArea>
            <div class="mt-3 hidden md:block text-sm text-gray-500">ctrl + s または command + s で保存</div>
          </dd>
        </dl>
      </div>
      <div class="md:col-span-7 bg-white rounded-lg p-3">
        <h1 class="text-2xl mb-4 pb-4 py-1 border-b">{{ editTask?.content }}</h1>
        <Markdown ref="markdown" class="markdown-body" :source="editTask.description" />
      </div>
    </div>
    <div class="my-5 pt-3 border-t">
      <dl class="form-list">
        <dt>プロジェクト移動</dt>
        <dd>
          <form @submit.prevent="changeProject" class="flex items-center">
            <select v-model="editProjectId" class="form-control-sm">
              <template v-for="project in store.projects" :key="project.id">
                <option :value="project.id">{{ project.name }}</option>
              </template>
            </select>
            <button type="submit" class="btn-sm btn-success ml-1">移動</button>
          </form>
        </dd>
      </dl>
    </div>
  </div>
</template>
