<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
const auth = useAuth()
const store = useAppStore()
const router = useRouter()
const email = ref("")
const password = ref("")

const login = async () => {
  store.isLoading = true
  try {
    await auth.login(email.value, password.value)
    store.flash = "ログインしました"
    router.push("/")
  } catch (error) {
    store.error = "ログインできませんでした"
  } finally {
    store.isLoading = false
  }
};
const loginGoogle = async () => {
  // return false // Googleログイン無効
  try {
    await auth.loginGoogle()
    router.push("/")
  } catch (e) {
    store.error = "ログインできませんでした"
  } finally {
    store.isLoading = false
  }
};
</script>

<template>
  <div class="container-fluid py-4">

  <form @submit.prevent="login">

    <div class="mb-3">
      <input type="email" class="form-control" v-model="email" placeholder="Email" />
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" v-model="password" placeholder="Password" />
    </div>
    <div class="mb-3">
      <div class="text-sm text-red-700" v-if="store.error" role="alert">
        {{ store.error }}
      </div>
    </div>
    <div class="mb-3">
      <button type="submit" :disabled="store.isLoading" class="btn btn-primary">Login</button>
    </div>
  </form>
  </div>
</template>

