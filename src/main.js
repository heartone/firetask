import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Markdown from 'vue3-markdown-it'
import './FirebaseConfig'
import VueGravatar from "vue3-gravatar"

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Markdown)
app.use(VueGravatar)
app.mount('#app')
