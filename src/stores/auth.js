import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = {
    name: 'Hiroyuki',
    email: 'heartone.biz@gmail.com'
  }

  return { user }
})
