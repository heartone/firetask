import { computed } from 'vue'
import { useAppStore } from "@/stores/app.js"
import { db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query ,where, orderBy, doc } from "firebase/firestore"

const store = useAppStore()
// コレクションを参照
const collectionRef = () => collection(db, "users", store.uid, "projects", store.projectId, "tasks")
// ドキュメントを参照
const docRef = (taskId) => doc(db, "users", store.uid, "projects", store.projectId, "tasks", taskId)

export const useTask = () => {
  const updateTask = async (fields) => {
    updateDoc(docRef, fields)
  }
  return {
    collectionRef,
    updateTask
  }
}
