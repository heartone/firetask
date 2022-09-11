<script setup>
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { useAppStore } from "@/stores/app.js"
import { useRouter } from "vue-router"

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
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div v-if="appStore.currentUser">
    <button class="btn-sm" @click="logout()"><i class="fa fa-sign-out-alt"></i> ログアウト</button>
  </div>
</template>
