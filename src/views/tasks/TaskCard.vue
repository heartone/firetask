<script setup>
const props = defineProps(['task'])
import{ db } from '@/FirebaseConfig.js'
import { doc, updateDoc, deleteDoc, onSnapshot  } from "firebase/firestore"
import Dropdown from '@/components/Dropdown.vue'
import { ref } from 'vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
const emits = defineEmits(['onDeleteTask'])
const onDeleteTask = (taskId) => {
  emits('onDeleteTask', taskId)
}

const statuses = ['todo', 'doing', 'done']
const priorities = {
  A: "bg-orange-500 hover:bg-orange-600",
  B: "bg-blue-500 hover:bg-blue-600",
  C: "bg-gray-500 hover:bg-gray-600",
}
const updateStatus = (status) => updateTask({status: status})
const updatePriority = (priority) => updateTask({priority: priority})
const updateTask = async (field) => {
  await updateDoc(doc(db, "tasks", props.task.id), field)
  appStore.flash = {status: 'ステータス', priority: '優先度'}[Object.keys(field)[0]] + 'を変更しました'
}
</script>

<template>
  <div class="p-2 mb-5 bg-white shadow-lg rounded" draggable="true">
    <div class="flex">
      <Dropdown align="left" width="24">
        <template #trigger>
          <div class="px-2 mr-2 cursor-pointer text-white rounded" :class="priorities[task.priority]">{{task.priority}}</div>
        </template>
        <template #content>
          <template v-for="(bgColor, priority) in priorities" :key="priority">
            <div class="dropdown-link" @click="updatePriority(priority)">{{ priority }}</div>
          </template>
        </template>
      </Dropdown>
      <div><router-link :to="{name: 'task', params: {taskId: task.id}}" class="hover:text-blue-700 w-full" :class="{ 'text-gray-400': !task.content.length }">{{ task.content || '無題のタスク' }}</router-link></div>
    </div>
    <div class="flex justify-between mt-2 tracking-wider text-xs text-gray-500">
      {{ task.createdAt.toDate().toLocaleDateString('ja-JP', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }}
      <span v-if="task.description.length > 0"><i class="fa fa-pen-square mr-1"></i>{{ task.description.length}}char</span>
    </div>
    <div class="grid grid-cols-4 gap-0.5 mt-2">
      <template v-for="(status, index) in statuses" :key="index">
        <button @click="updateStatus(status)" class="p-1 w-full text-xs text-white hover:bg-gray-500" :class="{'bg-gray-300': task.status == status, 'bg-gray-400': task.status != status}">{{ status.toUpperCase() }}</button>
      </template>
      <button class="p-1 w-full text-xs text-white bg-gray-400 hover:bg-gray-500" @click="onDeleteTask(task.id)">DELETE</button>
    </div>
  </div>
</template>
