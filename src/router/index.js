import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
const auth = getAuth()

// auth guard
const requireAuth = (to, from, next) => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    unsubscribe()
    user ? next() : next("/login")
  })
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/projects/ProjectsList.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: () => import('@/views/tasks/TasksList.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/projects/:projectId/edit',
      name: 'projectEdit',
      component: () => import('@/views/projects/ProjectEdit.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/projects/:projectId/tasks/:taskId/edit',
      name: 'task',
      component: () => import('@/views/tasks/TaskEdit.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    }
  ]
})

export default router
