import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../utils/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter : ()  => {
        if(isAuthenticated()) return {name: 'home'}
        return true
      }
    }
  ]
})
router.beforeEach((to) => {
  if(to.name != 'login' && !isAuthenticated()) return {name : 'login'}
})
export default router
