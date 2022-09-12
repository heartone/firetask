<script setup>
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
  if (user) getProjects()
})
// プロジェクト一覧をセット
const getProjects = async () => {
  if (!appStore.currentUser) return
  try {
    const projectsRef = collection(db, "projects")
    const querySnapshot = await getDocs(
      query(
        projectsRef, where('uid', '==', appStore.currentUser.uid), orderBy("priority", "desc")
      )
    )
    appStore.projects = querySnapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))
  } catch (error) {
    console.log(error)
  }
}
// プロジェクトの変更を監視
onSnapshot(collection(db, "projects"), () => getProjects());


</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Flash />
    <TopHeader />
    <main class="flex-grow">
      <!-- <SideBar /> -->
      <RouterView />
    </main>
    <footer class="py-5 flex justify-center text-xs text-gray-500">&copy; 有限会社ハートワン</footer>
  </div>
</template>
