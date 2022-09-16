import { useAppStore } from '@/stores/app'
import { db } from '@/FirebaseConfig.js'
import { onSnapshot, doc, collection, getDocs, query, where, orderBy, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"

export const useProject = () => {
  const store = useAppStore()
  const collectionRef = () => {
    return collection(db, "users", store.uid, "projects")
  }
  const docRef = (projectId) => {
    return doc(db, "users", store.uid, "projects", projectId || store.projectId)
  }

  const getProject = async (projectId) => {
    return await getDoc(docRef(projectId))
  }
  const addProject = async (fields) => {
    await addDoc(collectionRef(), fields)
  }

  const updateProject = async (projectId, fields) => {
    await updateDoc(docRef(projectId), fields)
  }

  const deleteProject = async (projectId) => {
    await deleteDoc(docRef(projectId))
  }
  return {
    collectionRef,
    docRef,
    getProject,
    addProject,
    updateProject,
    deleteProject,
  }
}
