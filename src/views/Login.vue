<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import Card from '@/components/Card.vue'
import Phrase from '@/components/Phrase.vue'
import Fire from '@/components/Fire.vue'

const auth = useAuth()
const store = useAppStore()
const router = useRouter()
const email = ref("")
const password = ref("")

const login = async () => {
  store.isLoading = true
  try {
    await auth.login(email.value, password.value)
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

<style scoped>
.phrase {
  text-shadow: 0 0 4px rgba(255, 255, 255, 1);
}
</style>
<template>
  <div class="container-fluid py-4">

  <form class="mt-4 md:w-1/2 lg:w-1/3 mx-auto" @submit.prevent="login">
    <div class="relative">

      <div class="absolute text-2xl z-10 relative text-orange-600 text-center mb-6">
        <Phrase />
      </div>
      <div class="invisible absolute w-full -bottom-3">
        <Fire />
      </div>
    </div>
    <Card>
      <template #header><i class="fa fa-fire text-orange-500 text-2xl mr-2"></i>Firetask ログイン</template>
      <template #body>
        <div class="mb-3 py-2 px-3 rounded bg-orange-100 border border-orange-400 text-orange-700">
          <div class="font-bold mb-2 flex justify-between items-center">デモ実施中<button type="button" class="font-normal text-xs text-indigo-500 hover:text-indigo-400" @click="email='yamada@example.com';password='himitudayo'">クリックで自動入力</button></div>
          <dl class="flex flex-wrap text-sm">
            <dt class="w-1/4">E-mail: </dt>
            <dd class="w-3/4 mb-1">yamada@example.com</dd>
            <dt class="w-1/4">Password: </dt>
            <dd class="w-3/4">himitudayo</dd>
          </dl>
        </div>
        <div class="flex items-center mb-3">
          <i class="fa fa-envelope fa-fw text-indigo-400 text-lg mr-2"></i>
          <input type="email" class="flex-grow form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="flex items-center mb-3">
          <i class="fa fa-lock fa-fw text-indigo-400 text-lg mr-2"></i>
          <input type="password" class="flex-grow form-control" v-model="password" placeholder="Password" />
        </div>
      </template>
      <template #footer>
        <div class="text-center">
          <button type="submit" :disabled="store.isLoading" class="btn btn-success">Login</button>
        </div>
      </template>
    </Card>
  </form>

  </div>
</template>
