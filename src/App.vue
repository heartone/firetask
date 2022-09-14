<script setup>
import { ref, onMounted } from 'vue'
import { db } from './FirebaseConfig.js'
import { getAuth } from 'firebase/auth'
import { onSnapshot, collection, getDocs, query ,where, orderBy } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
import Flash from '@/components/Flash.vue'
const auth = getAuth()
const appStore = useAppStore()

// ログインを監視
auth.onAuthStateChanged(user => {
  appStore.currentUser = user
  if (!user) return
  const projectsRef = collection(db, "users", user?.uid, "projects")
  // プロジェクトの変更を監視
  onSnapshot(projectsRef, async () => {
    const snapshot = await getDocs(
      query(projectsRef, orderBy("priority", "desc"))
    )
    appStore.projects = snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))
  });
})

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Flash />
    <TopHeader />
    <main class="flex-grow">
      <RouterView />
    </main>
    <footer class="py-5 flex justify-center text-xs text-gray-500">&copy; 有限会社ハートワン</footer>
  </div>
</template>
