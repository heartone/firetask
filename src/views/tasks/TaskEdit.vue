<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, getDoc, updateDoc } from "firebase/firestore"
const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const taskId = route.params.taskId
const editTask = ref({})

const getTask = async () => {
  const docSnap = await getDoc(doc(db, "tasks", taskId));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    editTask.value = docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
onMounted(getTask())
const updateTask = async () => {
  await updateDoc(doc(db, "tasks", taskId), {
    content: editTask.value.content
  });
  router.push({name: 'project', params: {projectId: editTask.value.projectId}})
}
</script>
<template>
  <div class="container-fluid py-3">
    <div class="sm:flex">
      <div class="sm:w-1/3 sm:mr-5 mb-5">
        <h3 class="text-xl mb-3">タスクの編集</h3>
        <form @submit.prevent="updateTask">
          <dl class="form-list">
            <dt>タスク名</dt>
            <dd><input type="text" v-model="editTask.content" class="form-control w-full" placeholder="タスク内容を入力"></dd>
          </dl>
          <div class="mb-3"></div>
          <button type="submit" class="btn btn-success">Update</button>
          <router-link :to="{name: 'project', params: {projectId: projectId}}" class="btn btn-light hover:bg-gray-300 border ml-3">Cancel</router-link>
        </form>
      </div>

      <div class="sm:2/3 sm:ml-5">
        <h3 class="text-xl mb-3">タスク情報</h3>
      </div>

    </div>
  </div>
</template>
