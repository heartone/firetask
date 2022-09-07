import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const auth = getAuth()
console.log('auth.js')
export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null
  }),
  getters: {
    isLoggedIn: (state) => state.currentUser !== null,
  },
  actions: {
    async signIn(email, password) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        // this.$patch({currentUser: res});
        // state.currentUser = res
      } catch (error) {
        console.log('signIn : ' + error)
      }
    },
    async signOut() {
      try {
        await signOut(auth)
        this.$reset()
      } catch (error) {
        console.log('signOut : ' + error)
      }
    },
    async setCurrentUser() {
      onAuthStateChanged(auth, (_user) => {
          this.$patch({currentUser: _user});
          resolve(user);
        },
        (error) => {
          console.log('getAuthState : ' + error)
          // reject(error);
          return null
        });
    },
    async getAuthUser() {

      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth,
            (user) => {
              // this.$patch({currentUser: user});
              resolve(user);
            },
            (error) => {
              console.log('getAuthState : ' + error)
              // reject(error);
              return null
            });
      });
    }
  }
})
