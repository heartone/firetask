<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const router = useRouter()
const auth = getAuth()
const isLoading = ref(false)
const email = ref("")
const password = ref("")
const errMsg = ref("")
const login = async () => {
  isLoading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push("/")
  } catch (error) {
    console.log('signIn : ' + error)
    errMsg.value = "ログインできませんでした"
  } finally {
    isLoading.value = false
  }
};
const loginGoogle = async () => {
  return false // Googleログイン無効
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(() => {
    router.push("/");
  }).catch((error) => {
      isLoading.value = false;
      console.log(error);
      errMsg.value = "There was a problem loggin in";
    });
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
      <div class="text-sm text-red-700" v-if="errMsg" role="alert">
        {{ errMsg }}
      </div>
    </div>
    <div class="mb-3">
      <button type="submit" :disabled="isLoading" class="btn btn-primary">Login</button>
    </div>
  </form>
  </div>
</template>

