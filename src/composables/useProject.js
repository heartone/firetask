import { useAppStore } from '@/stores/app'
import { db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, query, where, orderBy, updateDoc, deleteDoc, doc } from "firebase/firestore"

export const useAuth = () => {
  const store = useAppStore()
  const collectionRef = () => {
    return collection(db, "users", store.uid, "projects")
  }
  const docRef = (projectId) => {
    return doc(db, "users", store.uid, "projects", projectId || store.projectId)
  }
  return {
    collectionRef,
    docRef,
  }
}
