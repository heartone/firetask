<script setup>
import { useAuth } from '@/composables/useAuth'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const store = useAppStore()
const logout = async () => {
  store.isLoading = true
  try {
    await auth.logout(auth)
    store.projectId = null
    store.flash = 'ログアウトしました'
    router.push("/login")
  } catch(e) {
    store.error = e.message
  } finally {
    store.isLoading = false
  }
}
</script>
<template>
  <div v-if="store.currentUser">
    <button class="btn-sm" @click="logout()"><i class="fa fa-sign-out-alt"></i> ログアウト</button>
  </div>
</template>



