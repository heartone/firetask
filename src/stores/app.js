import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: ref(null),
    projectId: ref(null),
    projects: ref([]),
    tasks: ref([]),
    flash: ref(''),
    error: ref('')
  }),
  getters: {
    uid: (state) => state.currentUser.uid,
    currentProject: (state) => state.projects.find((p) => p.id == state.projectId)
  },
  actions: {

  }
})
