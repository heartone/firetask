<script setup>
import { db } from './FirebaseConfig'
import { getAuth } from 'firebase/auth'
import { onSnapshot, collection, getDocs, query ,where, orderBy } from "firebase/firestore"
import { useAppStore } from '@/stores/app'
import TopHeader from '@/components/TopHeader.vue'
import Logout from '@/components/Logout.vue'
import Flash from '@/components/Flash.vue'
import Modal from '@/components/Modal.vue'
const auth = getAuth()
const store = useAppStore()
// ログインを監視
auth.onAuthStateChanged(user => {
  store.currentUser = user
  if (!user) return
  const projectsRef = collection(db, "users", user.uid, "projects")
  // プロジェクトの変更を監視
  onSnapshot(projectsRef, async() => {
    store.isLoading = true
    try {
      const snapshot = await getDocs(
        query(projectsRef, orderBy("priority", "desc"))
      )
      store.projects = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
    } catch(e) {
      store.error = e.message
      console.log(e)
    } finally {
      store.isLoading = false
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
    </main>
    <footer class="py-5 flex justify-center items-center text-sm text-gray-500">
      <div class="mr-3"><a href="https://heart1.jp" class="hover:text-indigo-400">&copy; 有限会社ハートワン</a></div>
      <Logout />
    </footer>
  </div>
  <Modal :show="!!store.error" @close="resetErrorMessage">
    <template #title>
      <div class="font-normal text-yellow-700"><i class="fa fa-exclamation-triangle mr-2 text-yellow-500"></i>Error</div>
    </template>
    <template #content>
      <div class="text-red-700">{{store.error}}</div>
    </template>

  </Modal>
</template>
