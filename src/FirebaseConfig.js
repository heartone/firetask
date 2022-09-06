import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
console.log(import.meta.env.FB_APIKEY)
const firebaseConfig = {
  apiKey: "AIzaSyD2gKU0Uyc5syArTEJsNK-OBuC0Iny-cNk",
  authDomain: "taskapp-8101.firebaseapp.com",
  databaseURL: "https://taskapp-8101-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "taskapp-8101",
  storageBucket: "taskapp-8101.appspot.com",
  messagingSenderId: "92743115609",
  appId: "1:92743115609:web:ebcb336f0713281c88a248",
  measurementId: "G-BPEDWVZ5D5"
};
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
