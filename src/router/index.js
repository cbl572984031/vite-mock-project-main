import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('../views/role/index.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/detail/index.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/index.vue')
    },
  ]
})

export default router
