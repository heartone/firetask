<script setup>
import{ db } from '@/FirebaseConfig.js'
import { getAuth } from 'firebase/auth'
import { onSnapshot, collection, getDocs, query, orderBy } from "firebase/firestore"
import { useAppStore } from '@/stores/app.js'
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
// import SideBar from '@/components/SideBar.vue'
const auth = getAuth()
const appStore = useAppStore()
// ログインを監視
auth.onAuthStateChanged(user => {
  appStore.currentUser = user
})
// プロジェクト一覧をセット
const getProjects = async () => {
  try {
    const projectsRef = collection(db, "projects")
    const querySnapshot = await getDocs(
      query(
        projectsRef, orderBy("order", "asc")
      )
    )
    appStore.projects = querySnapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }))
  } catch (error) {
    console.error(error)
  }
}
// プロジェクトの変更を監視
onSnapshot(collection(db, "projects"), () => getProjects());
</script>

<template>
  <TopHeader />
  <main>
    <!-- <SideBar /> -->
    <RouterView />
  </main>
</template>
