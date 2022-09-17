<script setup>
import { useRoute } from 'vue-router'
import { useTask } from '@/composables/useTask'
import { useAppStore } from '@/stores/app.js'
import Dropdown from '@/components/Dropdown.vue'

const store = useAppStore()
const props = defineProps(['task'])

const statuses = {
  todo: 'bg-yellow-500',
  doing: 'bg-red-500',
  done: 'bg-green-500'
}

// タスク削除アクションを発行
const emits = defineEmits(['onDeleteTask'])
const onDeleteTask = (taskId) => {
  emits('onDeleteTask', taskId)
}
// 優先度別背景色
const priorities = {
  A: "bg-orange-500 hover:bg-orange-600",
  B: "bg-blue-500 hover:bg-blue-600",
  C: "bg-gray-500 hover:bg-gray-600",
}

// ステータス更新
const updateStatus = (status) => updateTask({status: status})
// 優先度更新
const updatePriority = (priority) => updateTask({priority: priority})
// タスクを更新する
const updateTask = async (fields) => {
  await useTask().updateTask(props.task.id, fields)
  store.flash = {status: 'ステータス', priority: '優先度'}[Object.keys(fields)[0]] + 'を変更しました'
  store.currentTaskId = props.task.id
}


</script>

<template>
  <div :id="'task-' + task.id" class="p-2 mb-3 bg-white shadow-lg rounded" :class="{'bg-yellow-100': store.currentTaskId == task.id}">
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
      <template v-for="(color, status) in statuses" :key="status">
        <button @click="updateStatus(status)" class="p-0.5 w-full text-xs text-white" :class="(task.status == status) ? color : 'bg-gray-400 hover:bg-gray-500'">{{ status.toUpperCase() }}</button>
      </template>
      <button class="p-0.5 w-full text-xs text-white bg-gray-400 hover:bg-gray-500" @click="onDeleteTask(task.id)">DELETE</button>
    </div>
  </div>
</template>
