import { computed } from 'vue'
import { useAppStore } from "@/stores/app.js"
import { db } from '@/FirebaseConfig.js'
import { onSnapshot, collection, getDocs, updateDoc, query ,where, orderBy, doc, getDoc } from "firebase/firestore"

const store = useAppStore()
// コレクションを参照
const collectionRef = () => collection(db, "users", store.uid, "projects")
// ドキュメントを参照
const docRef = (projectId) => doc(db, "users", store.uid, "projects", projectId)

export const useProject = () => {
  const getProjects = async () => {
    onSnapshot(collectionRef(), async() => {
      const snapshot = await getDocs(
        query(collectionRef(), orderBy("priority", "desc"))
      )

      store.projects = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
    })
  }
  const getProject = async (projectId) => {
    return getDoc(projectRef(projectId))
  }
  const updateProject = async (projectId, fields) => {
    console.log(projectId, fields)
    await updateDoc(docRef(projectId), fields)
  }
  return {
    getProjects,
    updateProject,
  }
}
