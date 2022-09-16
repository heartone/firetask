import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useAppStore } from '@/stores/app'

export const useAuth = () => {
  const auth = getAuth()
  const store = useAppStore()
  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    store.currentUser = credential.user
  }
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    const credential = store.currentUser = credential.user
  }
  const logout = async () => {
    await signOut(auth)
    store.currentUser = null
  }
  const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      store.currentUser = user
      return !!user
    })
  }


  return {
    login,
    loginGoogle,
    logout,
    checkAuthState,
  }
}
