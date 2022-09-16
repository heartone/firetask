<<<<<<< HEAD
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAppStore } from '@/stores/app'
export const useAuth = () => {
  const store = useAppStore()
  const login = async (email, password) => {
    const auth = getAuth()
=======
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useAppStore } from '@/stores/app'

export const useAuth = () => {
  const auth = getAuth()
  const store = useAppStore()
  const login = async (email, password) => {
>>>>>>> restructure
    const credential = await signInWithEmailAndPassword(auth, email, password)
    store.currentUser = credential.user
  }
  const loginGoogle = async () => {
<<<<<<< HEAD
    const auth = getAuth()
=======
>>>>>>> restructure
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    const credential = store.currentUser = credential.user
  }
  const logout = async () => {
<<<<<<< HEAD
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

=======
    await signOut(auth)
    store.currentUser = null
  }
  const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      store.currentUser = user
      return !!user
    })
  }


>>>>>>> restructure
  return {
    login,
    loginGoogle,
    logout,
    checkAuthState,
  }
}
