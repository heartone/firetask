<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'

// 現在のプロジェクト
useAppStore().currentProjectId = useRoute().params.projectId

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
      description: editTask.value.description
    });
    router.push({name: 'project', params: {projectId: editTask.value.projectId}})
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="container-fluid py-3">
    <div class="grid sm:grid-cols-2 gap-5">
      <div class="mb-5">
        <h3 class="text-xl mb-3">タスクの編集</h3>
        <form @submit.prevent="updateTask">
          <dl class="form-list">
            <dt>タスク名</dt>
            <dd><input type="text" v-model="editTask.content" class="form-control w-full" placeholder="タスク内容を入力"></dd>
            <dt>詳細</dt>
            <dd>
              <textarea v-model="editTask.description" class="form-control w-full" rows="5"></textarea>
            </dd>
          </dl>
          <div class="mb-3"></div>
          <button type="submit" class="btn btn-success">Update</button>
          <router-link :to="{name: 'project', params: {projectId: projectId}}" class="btn btn-light hover:bg-gray-300 border ml-3">Cancel</router-link>
        </form>
      </div>

      <div class="sm:2/3 sm:ml-5">
        <h3 class="text-xl mb-3">{{ editTask.content }}</h3>
        <div class="whitespace-pre-wrap">{{ editTask.description}}</div>
      </div>

    </div>
  </div>
</template>
