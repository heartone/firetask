import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAR5zMwikcJR1X-EaTuaac_ujx6MRQaHgY",
  authDomain: "firetask-8101.firebaseapp.com",
  projectId: "firetask-8101",
  databaseURL: "https://firetask-8101-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "firetask-8101.appspot.com",
  messagingSenderId: "42513117461",
  appId: "1:42513117461:web:7985a4a8c6b312e0a4b91c",
  measurementId: "G-XNFJ4K30Y7"
};
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
