import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeFirestore } from 'firebase/firestore'
import './FirebaseConfig'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
