<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import '@/assets/github-markdown-css.css'
// import '@/assets/highlightjs.css'
import 'highlight.js/styles/monokai.css';
import Markdown from 'vue3-markdown-it'

// 状態管理
const appStore = useAppStore()

// 現在のプロジェクト
appStore.currentProjectId = useRoute().params.projectId

const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const taskId = route.params.taskId
const editTask = ref({})

// タスク取得
const getTask = async () => {
  try {
    const docSnap = await getDoc(doc(db, "tasks", taskId));
    editTask.value = docSnap.data()
  } catch (error) {
    console.error(error);
  }
}
// タスク読み込み
onMounted(getTask())
// タスク編集
const updateTask = async () => {
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      content: editTask.value.content,
      description: editTask.value.description,
      status: editTask.value.status,
      projectId: editTask.value.projectId,
    });
    router.push({name: 'project', params: {projectId: editTask.value.projectId}})
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="container-fluid py-3">
    <div class="md:grid sm:grid-cols-12 gap-5">
      <div class="md:col-span-5 mb-5">
        <h3 class="text-xl mb-3">タスクの編集</h3>
        <form @submit.prevent="updateTask">
          <input type="text" v-model="editTask.content" class="form-control w-full" placeholder="タスク内容を入力">
          <dl class="form-list">
            <dt>ステータス</dt>
            <dd>
              <div class="grid grid-cols-5 gap-0.5">
                <template v-for="status in ['todo','doing','done']" :key="status">
                  <button type="button" class="p-1 w-full text-xs text-white" :class="{'bg-gray-300 hover:bg-gray-300': editTask.status == status, 'bg-gray-400 hover:bg-gray-500': editTask.status != status}" @click="editTask.status=status">{{ status.toUpperCase() }}</button>
                </template>
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
          <div class="mb-3"></div>
          <button type="submit" class="btn btn-success">Update</button>
          <router-link :to="{name: 'project', params: {projectId: projectId}}" class="btn btn-light hover:bg-gray-300 border ml-3">Cancel</router-link>
        </form>
      </div>

      <div class="md:col-span-7 bg-white rounded-lg p-3">

        <h1 class="text-2xl mb-4 pb-4 py-1 border-b">{{ editTask.content }}</h1>
        <Markdown class="markdown-body" :source="editTask.description" />
      </div>

    </div>
  </div>
</template>
