<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, collection, query, where, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const editProject = ref({})

const getProject = async () => {
  const docSnap = await getDoc(doc(db, "projects", projectId));
  if (docSnap.exists()) {
    editProject.value = {
      name: docSnap.data().name
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
onMounted(getProject())
// プロジェクト編集
const updateProject = async () => {
  await updateDoc(doc(db, "projects", projectId), {
    name: editProject.value.name
  });
  appStore.currentProjectId = projectId
  router.push({name: 'project', params: {projectId: projectId}})
}
// プロジェクト削除
const deleteProject = async () => {
  if (confirm('削除しますか？')) {
    // 関連タスクを削除
    const tasksRef = collection(db, "tasks")
    const querySnapshot = await getDocs(
      query(
        tasksRef, where("projectId", "==", projectId)
      )
    )
    querySnapshot.docs.map(task => {
       deleteDoc(doc(db, "tasks", task.id))
    })
    // プロジェクトを削除
    await deleteDoc(doc(db, "projects", projectId))
    router.push({name: 'home'})
  }
}

</script>
<template>
  <div class="container-fluid py-3">
    <div class="grid md:grid-cols-2 gap-5">
      <div class="">
        <h3 class="text-xl mb-3">プロジェクトの編集</h3>
        <form @submit.prevent="updateProject">
          <div class="mb-3"><input type="text" v-model="editProject.name" class="form-control w-full" placeholder="プロジェクト名を入力" autofocus></div>
          <button type="submit" class="btn btn-success">Update</button>
          <router-link :to="{name: 'project', params: {projectId: projectId}}" class="btn btn-light ml-3">Cancel</router-link>
        </form>
        <div class="mt-6">
          <button class="btn" @click="deleteProject"><i class="fa fa-trash-alt mr-2"></i>Delete</button>
        </div>
      </div>

    </div>
  </div>

</template>
