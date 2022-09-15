<script setup>
import { ref, onMounted } from 'vue'
import { db } from './FirebaseConfig.js'
import { getAuth } from 'firebase/auth'
import { onSnapshot, collection, getDocs, query ,where, orderBy } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
import Logout from '@/components/Logout.vue'
import Flash from '@/components/Flash.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
const auth = getAuth()
const appStore = useAppStore()
const isLoading = ref(false)
// ログインを監視
auth.onAuthStateChanged(user => {
  appStore.currentUser = user
  if (!user) return
  const projectsRef = collection(db, "users", user.uid, "projects")
  // プロジェクトの変更を監視
  onSnapshot(projectsRef, async() => {
    isLoading.value = true
    try {
      const snapshot = await getDocs(
        query(projectsRef, orderBy("priority", "desc"))
      )
      appStore.projects = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))

    } catch(e) {
      appStore.error = e.messge
      console.log(e)
    } finally {
      isLoading.value = false
    }
  })
})

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
      <Logout />
    </footer>
  </div>
</template>
