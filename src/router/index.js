import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
const auth = getAuth()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Task.vue'),
      beforeEnter: (to, from, next) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe()
          user ? next() : next("/login")
        })
      }
    },
    {
      path: '/taskEdit/:taskId',
      name: 'taskEdit',
      component: () => import('@/views/TaskEdit.vue'),
      beforeEnter: (to, from, next) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe()
          user ? next() : next("/login")
        })
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    }
  ]
})

export default router
