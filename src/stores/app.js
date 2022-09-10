import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import{ db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query, where, orderBy, updateDoc, doc  } from "firebase/firestore"

export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: ref(null),
    currentProjectId: ref(null),
    projects: ref([]),
    tasks: ref([])
  }),
  getters: {
    currentProject: (state) => state.projects.find((p) => p.id == state.currentProjectId)
  },
  actions: {

  }
})
