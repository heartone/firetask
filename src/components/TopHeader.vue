<script setup>
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { useAppStore } from "@/stores/app.js"
import { useRouter } from "vue-router"
import Logo from '@/components/Logo.vue'

const router = useRouter()
const auth = getAuth()
const appStore = useAppStore()
const isLoading = ref(false)
const logout = async () => {
  isLoading.value = true
  try {
    await signOut(auth)
    router.push("/login")
  } catch(error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

</script>
<template>
  <header class="bg-gray-800 text-gray-200 py-3">
    <div class="container-fluid flex justify-between">
      <div class="flex items-center">
        <router-link to="/" class="">
          <Logo />
        </router-link>
        <div v-if="appStore.currentProject">
          <i class="fa fa-caret-right text-gray-400 fa-fw mx-2"></i>
          <router-link :to="{name: 'project', params: {projectId: appStore.currentProject.id}}">{{ appStore.currentProject.name }}</router-link>
          <router-link class="ml-4 text-xs" :to="{name: 'projectEdit', params: {projectId: appStore.currentProject.id}}"><i class="fa fa-pencil"></i></router-link>
        </div>

      </div>
      <div v-if="appStore.currentUser">
        <button class="btn-sm bg-gray-700" @click="logout()">ログアウト</button>
      </div>
    </div>
  </header>
</template>
