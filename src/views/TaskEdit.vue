<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import{ db } from '@/FirebaseConfig.js'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
const route = useRoute()
const router = useRouter()
const taskId = route.params.taskId
const editTaskContent = ref("")

const getTask = async () => {
  const docSnap = await getDoc(doc(db, "tasks", taskId));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    editTaskContent.value = docSnap.data().content
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}


onMounted(getTask())
const updateTask = async () => {
  await updateDoc(doc(db, "tasks", taskId), {
    content: editTaskContent.value
  });
  router.push("/")

}

</script>
<template>
  <div class="container-fluid py-3">
    <form @submit.prevent="updateTask">
      <div class="mb-3"><input type="text" v-model="editTaskContent" class="form-control" placeholder="タスク内容を入力" autofocus></div>
      <button type="submit" class="btn btn-success">Update</button>
    </form>
  </div>

</template>
