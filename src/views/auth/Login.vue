<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const email = ref("")
const password = ref("")
const errMsg = ref("")
const login = async () => {
  isLoading.value = true
  await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((res) => {
      isLoading.value = false

      authStore.currentUser = {name: res.user.displayUserName, email: res.user.email}
      router.push("/");
    })
    .catch((error) => {
      isLoading.value = false;
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(() => {
    console.log("User signed in");
    router.push("/");
  }).catch((error) => {
      isLoading.value = false;
      console.log(error);
      switch (error.code) {
        default:
          errMsg.value = "There was a problem loggin in";
          break;
      }
    });
};
</script>

<template>
  <form @submit.prevent="login">
    <div class="mb-3">
      <div class="alert alert-danger" v-if="errMsg" role="alert">
        {{ errMsg }}
      </div>
    </div>
    <div class="mb-3">
      <input type="email" class="form-control" v-model="email" placeholder="Email" />
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" v-model="password" placeholder="Password" />
    </div>
    <div class="mb-3">
      <button type="submit" :disabled="isLoading" class="btn btn-primary">Login</button>
    </div>
  </form>
    <div class="mb-3">or</div>
    <div class="mb-6">
      <button  class="btn bg-yellow-400 hover:bg-yellow-300" type="submit" @click="loginGoogle">
        <i class="fab fa-google mr-3"></i>Googleでログイン
      </button>
    </div>
</template>

