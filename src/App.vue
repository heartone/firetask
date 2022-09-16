<script setup>
import { ref, onMounted } from 'vue'
import { db } from './FirebaseConfig.js'
import { getAuth } from 'firebase/auth'
import { onSnapshot, collection, getDocs, query ,where, orderBy } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
import Flash from '@/components/Flash.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import Modal from '@/components/Modal.vue'

const auth = getAuth()
const store = useAppStore()
const isLoading = ref(false)
// ログインを監視
auth.onAuthStateChanged(user => {
  store.currentUser = user
  if (!user) return
  const projectsRef = collection(db, "users", user.uid, "projects")
  // プロジェクトの変更を監視
  onSnapshot(projectsRef, async() => {
    isLoading.value = true
    try {
      const snapshot = await getDocs(
        query(projectsRef, orderBy("priority", "desc"))
      )
      store.projects = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))

    } catch(e) {
      store.error.value = e.messge
    } finally {
      isLoading.value = false
    }
  })
})
const resetErrorMessage = () => {
  store.error = null
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Flash />
    <TopHeader />
    <main class="flex-grow">
      <RouterView />
      <div class="flex justify-center py-5" v-if="isLoading">
        <LoadingIcon />
      </div>
    </main>
    <footer class="py-5 flex justify-center items-center text-xs text-gray-500">
      <div class="mr-3">&copy; 有限会社ハートワン</div>

    </footer>
  </div>
  <Modal :show="!!store.error" @close="resetErrorMessage">
    <template #title>
      <div class="font-normal"><i class="fa fa-fire mr-2 text-orange-500"></i>Firetask</div>
    </template>
    <template #content>
      <div>{{store.error}}</div>
    </template>
    <template #footer class="flex justify-center">
      <button class="btn btn-primary mr-3" @click="resetErrorMessage">OK</button>
    </template>
  </Modal>
</template>
