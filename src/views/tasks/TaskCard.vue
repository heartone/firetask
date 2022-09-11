<script setup>
const props = defineProps(['task'])
import{ db } from '@/FirebaseConfig.js'
import { doc, updateDoc, deleteDoc, onSnapshot  } from "firebase/firestore"
import Dropdown from '@/components/Dropdown.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
const showModal = ref(false)

const emits = defineEmits(['onDeleteTask'])

const statuses = ['todo', 'doing', 'done']

const updateStatus = (status) => updateTask({status: status})
const updatePriority = (priority) => updateTask({priority: priority})
const updateTask = async (field) => {
  await updateDoc(doc(db, "tasks", props.task.id), field)
}

const deleteTask = async () => {
  await deleteDoc(doc(db, "tasks", props.task.id))
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
      <button class="p-1 w-full text-xs text-white bg-gray-400 hover:bg-gray-500" @click="showModal=true">DELETE</button>
    </div>
  </div>
    <Modal :show="showModal" @close="showModal=false">
    <template #title>削除確認</template>
    <template #content>
      <div>本当に削除しますか？</div>
    </template>
    <template #footer class="flex justify-center">
      <button class="btn btn-danger mr-3" @click="deleteTask">はい</button>
      <button class="btn btn-secondary" @click="showModal=false">いいえ</button>
    </template>
  </Modal>
</template>
