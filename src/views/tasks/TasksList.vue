<script setup>
import { ref, computed, watch } from "vue"
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app.js'
import { db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query, where, orderBy, updateDoc, deleteDoc, doc } from "firebase/firestore"
import TaskHeader from '@/views/tasks/TaskHeader.vue'
import TasksCol from '@/views/tasks/TasksCol.vue'
import Modal from '@/components/Modal.vue'

const showModal = ref(false)
const store = useAppStore()
const projectId = useRoute().params.projectId
store.projectId = projectId

// タスク一覧
const tasks = ref([])
// タスクcollection参照
console.log(store.uid, store.projectId)
const tasksRef = collection(db, "users", store.uid, "projects", projectId, "tasks")

// ステータス集計
const progressCount = computed(() => {
  const taskStatuses = tasks.value.map(t => t.status)
  const count = {}
  taskStatuses.forEach ((st) => {
    count[st] = (count[st] || 0) + 1
  })
  return count
})
// タスク一覧を取得
const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        tasksRef, orderBy("priority", "asc")
      )
    )
    tasks.value = querySnapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))
  } catch (e) {
    store.error = e.message
  }
}
// 変更を監視
onSnapshot(tasksRef,  () => getTasks())
// ステータス再集計
watch(progressCount, (newValue, oldValue) => {
  // 変更がなければ更新しない
  if (
    JSON.stringify(Object.entries(store.currentProject.count || {}).sort())
    ==
    JSON.stringify(Object.entries(progressCount.value).sort())
  ) return
  // 変更があれば現在のプロジェクトの値を更新
  try {
    updateDoc(doc(db, "projects", projectId), {
      count: newValue
    });
    store.currentProject.count = progressCount.value
  } catch (e) {
    store.error = e.message
  }
})

const deleteTaskId = ref(null)
// タスク削除アクション
const onDeleteTask = (taskId) => {
  deleteTaskId.value = taskId
  showModal.value = true
}
// タスク削除
const deleteTask = async () => {
  try {
    await deleteDoc(doc(db, "tasks", deleteTaskId.value))
    store.flash = 'タスクを削除しました'
    showModal.value = false
  } catch (e) {
    store.error = e.message
  }
}
</script>
<style scoped>
.tasksCols {
  min-width: 1000px;
}
</style>
<template>
  <TaskHeader :progressCount="progressCount"  />
  <div class="container-fluid py-3 overflow-x-auto">
    <div class="tasksCols grid grid-cols-3 gap-4">
      <template v-for="status in ['todo', 'doing', 'done']" :key="status">
        <TasksCol @onDeleteTask="onDeleteTask" :status="status" :tasks="tasks.filter(task => task.status == status)" />
      </template>
    </div>
  </div>
  <Modal :show="showModal" @close="showModal=false">
    <template #title>削除確認</template>
    <template #content>
      <div>本当に削除しますか？</div>
    </template>
    <template #footer class="flex justify-center">
      <button class="btn btn-danger mr-3" @click="deleteTask">Delete</button>
      <button class="btn btn-secondary" @click="showModal=false">Cancel</button>
    </template>
  </Modal>
</template>
