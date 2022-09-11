import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Markdown from 'vue3-markdown-it'
import './FirebaseConfig'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Markdown)
app.mount('#app')
