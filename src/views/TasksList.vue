<script setup>
import { ref, computed, watch } from "vue"
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useProject } from '@/composables/useProject'
import { useTask } from '@/composables/useTask'
import { useAppStore } from '@/stores/app'
import { onSnapshot, collection, getDocs, query, where, orderBy, updateDoc, deleteDoc, doc } from "firebase/firestore"

import TaskHeader from '@/views/tasks/TaskHeader.vue'
import TasksCol from '@/views/tasks/TasksCol.vue'
import Modal from '@/components/Modal.vue'

const auth = useAuth()
const showModal = ref(false)
const store = useAppStore()
store.projectId = useRoute().params.projectId

// タスク一覧
const tasks = ref([])
// 変更を監視
const tasksRef = useTask().collectionRef()
onSnapshot(tasksRef, async () => {
  store.isLoading = true
  const snapshot = await getDocs(
    query(tasksRef, orderBy("priority", "asc"))
  )
  tasks.value = snapshot.docs.map(doc => ({
    id: doc.id, ...doc.data()
  }))
  store.isLoading = false
  console.log(store.currentTaskId)
  smoothScroll()
})



// ステータス集計
const progressCount = computed(() => {
  const taskStatuses = tasks.value.map(t => t.status)
  const count = {}
  taskStatuses.forEach ((st) => {
    count[st] = (count[st] || 0) + 1
  })
  return count
})


// ステータス再集計
const sortedJson = (obj) => JSON.stringify(Object.entries(obj || {}).sort())
watch(progressCount, (newValue, oldValue) => {
  // 変更がなければ更新しない
  if (sortedJson(store.currentProject.count) == sortedJson(progressCount.value)) {
    return
  }
  // 変更があれば現在のプロジェクトの値を更新
  try {
    updateDoc(useProject().docRef(store.projectId), {
      count: newValue
    });
    store.currentProject.count = progressCount.value
  } catch (error) {
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
    await deleteDoc(useTask().docRef( deleteTaskId.value))
    store.flash = 'タスクを削除しました'
    showModal.value = false
    store.currentTaskId = null
  } catch (e) {
    store.error = e.message
  }
}

// test スクロール追随
const smoothScroll = () => {
  setTimeout(() => {
    const target = document.querySelector("#task-" + store.currentTaskId)
    if (!target) return
    const container = document.querySelector('#tasksContainer')
    const rect = target.getBoundingClientRect()
    const offsetTop = 79
    const offsetLeft = 28
    container.scrollTo({
      left: rect.left + container.scrollLeft - offsetLeft,
      behavior: 'smooth'
    })
    window.scrollTo({
      top: rect.top - offsetTop,
      behavior: 'smooth'
    })
  }, 200)
}
</script>
<style scoped>
.tasksCols {
  min-width: 1000px;
}
</style>
<template>
  <TaskHeader :progressCount="progressCount"  />
  <div id="tasksContainer" class="container-fluid py-3 overflow-x-auto">
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
