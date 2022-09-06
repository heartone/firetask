import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
  }),
  getters: {
    isLoggedIn: (state) => state.currentUser !== null,
  },
  actions: {

  }
})
