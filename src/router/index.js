import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        getAuth().onAuthStateChanged(user => {
          if (user) {
            next()
          } else {
            next("/login");
          }
        });
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
