<script setup>
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"
const router = useRouter()
const isLoading = ref(false)
const logout = async () => {
  isLoading.value = true
  await signOut(getAuth())
    .then(() => {
      isLoading.value = false
      router.push("/login")
    })
}
</script>
<template>
  <h1>This is an home page</h1>

</template>
