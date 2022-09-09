<script setup>
const props = defineProps(['task'])
import{ db } from '@/FirebaseConfig.js'
import { doc, updateDoc, deleteDoc  } from "firebase/firestore"
import Dropdown from '@/components/Dropdown.vue'

const statuses = ['todo', 'doing', 'done']
const updateStatus = (taskId, status) => updateTask(taskId, {status: status})
const updatePriority = (taskId, priority) => updateTask(taskId, {priority: priority})
const updateTask = async (taskId, field) => {
  await updateDoc(doc(db, "tasks", taskId), field)
}
const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId))
}
</script>

<style scoped>
.statusButton {
  width: 25%;
  padding: .3rem;
  background: #aaa;
  color: #fff;
  font-size: .8rem;
}
.statusButton:hover {
  background: #bba;
}
.bg-priority-A {
  background: #e67e22;
}
.bg-priority-A:hover {
  background: #d35400;
}
.bg-priority-B {
  background: #3498db;
}
.bg-priority-B:hover {
  background: #2980b9;
}
.bg-priority-C {
  background: #95a5a6;
}
.bg-priority-C:hover {
  background: #7f8c8d;
}
</style>
<template>
  <div class="p-2 mb-5 bg-white shadow-lg rounded" draggable="true">
    <div class="flex">
      <Dropdown align="left" width="24">
        <template #trigger>
          <div class="px-2 mr-2 cursor-pointer text-white" :class="'bg-priority-' + task.priority">{{task.priority}}</div>
        </template>
        <template #content>
          <template v-for="(priority, index) in ['A','B','C']" :key="index">
            <div class="dropdown-link" @click="updatePriority(task.id, priority)">{{ priority }}</div>
          </template>
        </template>
      </Dropdown>
      <div><router-link :to="{name: 'task', params: {taskId: task.id}}" class="hover:text-blue-700 w-full">{{ task.content }}</router-link></div>
    </div>
    <div class="mt-2 tracking-wider text-xs text-gray-500">{{ task.createdAt.toDate().toLocaleString() }}</div>
    <div class="flex mt-2">
      <template v-for="(status, index) in statuses" :key="index">
        <button @click="updateStatus(task.id, status)" class="p-1 w-full text-xs text-white hover:bg-pink-300" :class="{'bg-gray-300': task.status == status, 'bg-gray-400': task.status != status}">{{ status.toUpperCase() }}</button>
      </template>
      <button class="p-1 w-full text-xs text-white bg-gray-400 hover:bg-pink-300" @click="deleteTask(task.id)">DELETE</button>
    </div>
  </div>
</template>
