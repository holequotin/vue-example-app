import { createRouter, createWebHistory } from 'vue-router'
// import { isAuthenticated } from '../utils/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/friend_request',
      name: 'friend_request',
      component: () => import('../views/FriendRequest.vue')
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
      // beforeEnter : ()  => {
      //   if(isAuthenticated()) return {name: 'home'}
      //   return true
      // }
    },
    {
      path: '/profile/:id',
      // TODO: Add guard here
      children : [
        {
          path : 'friends',
          component : () => import('../views/profile/FriendsProfile.vue'),
          name: 'profile-friend'
        },
        {
          path: '',
          component: () => import('../views/profile/BaseProfile.vue'),
          name: 'profile-parent'
        }
      ]
    },
    {
      path: '/forget_password',
      component: () => import('../views/authentication/ForgetPassword.vue'),
      name: 'forget-password'
    },
    {
      path: '/reset_password',
      component: () => import('../views/authentication/ResetPassword.vue')
    }
  ]
})
// router.beforeEach((to) => {
//   if(to.name != 'login' && !isAuthenticated()) return {name : 'login'}
// })
export default router
