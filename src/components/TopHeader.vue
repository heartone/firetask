<script setup>
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.js"
const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const logout = async () => {
  isLoading.value = true
  await signOut(getAuth())
    .then(() => {
      isLoading.value = false
      authStore.currentUser = null
      router.push("/login")
    })
}
</script>
<template>
  <header class="bg-gray-800 text-gray-200 py-3">
    <div class="container-fluid flex justify-between">
      <div class="text-xl">TaskApp</div>
      <div v-if="authStore.isLoggedIn">
        <button class="btn-sm bg-gray-700" @click="logout()">Logout</button>
      </div>
    </div>
  </header>
</template>
