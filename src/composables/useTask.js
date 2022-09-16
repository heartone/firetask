import { useAppStore } from '@/stores/app'
import { db } from '@/FirebaseConfig.js'
import { onSnapshot, doc, collection, getDoc, getDocs, query, where, orderBy, addDoc, updateDoc, deleteDoc } from "firebase/firestore"

export const useTask = () => {
  const store = useAppStore()
  const collectionRef = (projectId) => {
    return collection(db, "users", store.uid, "projects", projectId || store.projectId, "tasks")
  }
  const docRef = (taskId, projectId) => {
    return doc(db, "users", store.uid, "projects", projectId || store.projectId, "tasks", taskId)
  }
  const getTasks = async (projectId) => {
    return await getDocs(collectionRef(projectId))
  }
  const getTask = async (taskId) => {
    return await getDoc(docRef(taskId))
  }
  const addTask = async (fields) => {
    await addDoc(collectionRef(), fields)
  }

  const updateTask = async (taskId, fields) => {
    await updateDoc(docRef(taskId), fields)
  }

  const deleteTask = async (taskId) => {
    await deleteDoc(docRef(taskId))
  }

  const changeProject = async (projectId, taskId, fields) => {
    await addDoc(collectionRef(projectId), fields)
    await deleteDoc(docRef(taskId, store.projectId))
  }

  return {
    collectionRef,
    docRef,
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    changeProject,
  }
}
