<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app.js'
import { db } from '@/FirebaseConfig.js'
import { deleteDoc, doc } from "firebase/firestore"
import TaskCard from '@/views/tasks/TaskCard.vue'
import Modal from '@/components/Modal.vue'
import Dropdown from '@/components/Dropdown.vue'

const props = defineProps(['status', 'tasks', 'isLoading'])
const store = useAppStore()
const showModal = ref(false) // モーダル表示判定用
// タスク削除イベント発行
const emits = defineEmits(['onDeleteTask'])
const onDeleteTask = (taskId) => {
  emits('onDeleteTask', taskId)
}

// ステータス別表示文字列
const statusText = computed(() => {
  return {todo: '未実施', doing: '実行中', done: '完了'}[props.status]
})

// タスク一括削除
const deleteTasks = async () => {
  await props.tasks.map(task => {
      deleteDoc(doc(db, "users", store.currentUser.uid, "projects", store.currentProjectId, "tasks", task.id))
  })
  showModal.value = false
  store.flash = props.tasks.length + ' 件のタスクを削除しました'
}
</script>

<template>
  <div class="bg-gray-200 px-3 pt-3 pb-1 rounded-lg h-full">
    <div class="mb-2 px-2 flex justify-between items-center text-lg">
      <div>{{ tasks.length || 'No'}} {{ status }}{{ tasks.length != 1 ? 's' : ''}}</div>
      <Dropdown v-show="tasks.length">
        <template #trigger>
          <button class="w-7 h-7 rounded-full text-sm hover:bg-gray-300 text-gray-500 hover:text-gray-600 cursor-pointer duration-300 transition-all"><i class="fa fa-ellipsis-v"></i></button>
        </template>
        <template #content>
          <button class="dropdown-link" @click="showModal=true">{{statusText}}のタスクを削除</button>
        </template>
      </Dropdown>
      <div v-show="isLoading && !tasks.length"><i class="fa fa-circle-notch text-blue-400 fa-spin text-xl"></i></div>
    </div>
    <div v-for="task in tasks" :key="task.id">
      <TaskCard :task="task" @onDeleteTask="onDeleteTask" />
    </div>
  </div>
  <Modal :show="showModal" @close="showModal=false">
    <template #title>削除確認</template>
    <template #content>{{ tasks.length }} 件の{{ statusText }}タスクをすべて削除します。よろしいですか？</template>
    <template #footer>
      <button @click="deleteTasks" class="btn btn-danger">Delete Alll</button>
      <button @click="showModal=false" class="btn btn-secondary ml-3">Cancel</button>
    </template>
  </Modal>
</template>
