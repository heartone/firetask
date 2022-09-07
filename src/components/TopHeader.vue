<script setup>
import { ref } from "vue"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "vue-router"
const router = useRouter()
const auth = getAuth()
const user = ref({})
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
const onAuth = async () => {
  onAuthStateChanged(auth, (_user) => {
    console.log(_user)
    return _user
  })
}
onAuthStateChanged(auth, (_user) => {
  user.value = _user
})
</script>
<template>
  <header class="bg-gray-800 text-gray-200 py-3">
    <div class="container-fluid flex justify-between">
      <router-link to="/" class="text-xl py-0.5">TaskApp</router-link>
      <div v-if="user">
        <button class="btn-sm bg-gray-700" @click="logout()">ログアウト</button>
      </div>
    </div>
  </header>
</template>
