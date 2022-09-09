import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: ref(null),
    currentProjectId: ref(null),
    projects: ref([]),
  }),
  getters: {
    currentProject: (state) => state.projects.find((p) => p.id == state.currentProjectId)
  },
  actions: {

  }
})
