import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAppStore } from '@/stores/app'
export const useAuth = () => {
  const store = useAppStore()
  const login = async (email, password) => {
    const auth = getAuth()
    const credential = await signInWithEmailAndPassword(auth, email, password)
    store.currentUser = credential.user
  }
  const loginGoogle = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    const credential = store.currentUser = credential.user
  }
  const logout = async () => {
    const auth = getAuth()
    await signOut(auth)
    store.currentUser = null
  }
  const checkAuthState = async () => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      store.currentUser = user
    })
  }

  return {
    login,
    loginGoogle,
    logout,
    checkAuthState,
  }
}
