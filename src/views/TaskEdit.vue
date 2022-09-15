<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { useAppStore } from '@/stores/app.js'
import { db } from '@/FirebaseConfig.js'
import { doc, getDoc, updateDoc, collection, addDoc, deleteDoc } from "firebase/firestore"
import Markdown from 'vue3-markdown-it'
import PageHeader from '@/components/PageHeader.vue'
import ElasticTextArea from '@/components/ElasticTextArea.vue'
import '@/assets/github-markdown-css.css'
import 'highlight.js/styles/monokai.css';

// 状態管理
const appStore = useAppStore()
// 現在のプロジェクト
const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const editProjectId = ref(null)
editProjectId.value = projectId
appStore.currentProjectId = projectId

// 現在のタスク
const taskId = route.params.taskId
appStore.currentTaskId = null
const editTask = ref({})
const originTask = ref({})

// マークダウン部を参照
const markdown = ref()

// ログインを監視
const auth = getAuth()
auth.onAuthStateChanged(user => {
  appStore.currentUser = user
  if (!user) return
  getTask()
})
// タスク取得
const getTask = async () => {
  try {
    const docSnap = await getDoc(doc(db, "users", appStore.currentUser.uid, "projects", projectId, "tasks", taskId));
    editTask.value = docSnap.data()
    originTask.value = docSnap.data()
    console.log(docSnap.data())
  } catch (error) {
    console.log(error);
  }
}

// タスクの変更監視
const isEdited = computed(() => {
  // 指定の属性のうち一つでも変更があればtrueを返す
  return ["content", "status", "priority", "description"].map((attr) => editTask.value[attr] != originTask.value[attr]).includes(true)
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
    await updateDoc(doc(db, "users", appStore.currentUser.uid, "projects", projectId, "tasks", taskId), {
      content: editTask.value.content,
      description: editTask.value.description,
      status: editTask.value.status,
      priority: editTask.value.priority,
      // projectId: editTask.value.projectId,
    });
    getTask()
    appStore.currentTaskId = taskId
    appStore.flash = '保存しました'
  } catch (error) {
    console.log(error)
  }
}

// プロジェクト変更
const changeProject = async () => {
  try {
    const taskRef = collection(db, "users", appStore.currentUser.uid, "projects", editProjectId.value, "tasks")
    await addDoc(taskRef, {
      ...editTask.value,
      createdAt: new Date()
    })
    appStore.flash = 'プロジェクトを変更しました'
    await deleteDoc(doc(db, "users", appStore.currentUser.uid, "projects", projectId, "tasks", taskId))
    router.push("/projects/" + editProjectId.value)
  } catch (error) {
    console.log(error);
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
        <h1 class="text-2xl mb-4 pb-4 py-1 border-b">{{ editTask.content }}</h1>
        <Markdown ref="markdown" class="markdown-body" :source="editTask.description" />
      </div>
    </div>
    <div class="my-5 pt-3 border-t">
      <dl class="form-list">
        <dt>プロジェクト移動</dt>
        <dd>
          <form @submit.prevent="changeProject" class="flex items-center">
            <select v-model="editProjectId" class="form-control-sm">
              <template v-for="project in appStore.projects" :key="project.id">
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
