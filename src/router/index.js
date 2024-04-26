import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/group_request',
      name: 'group_request',
      component: () => import('../views/groups/GroupJoinRequest.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: () => {
        if (isAuthenticated()) return { name: 'home' }
        return true
      }
    },
    {
      path: '/profile/:id',
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
        },
        {
          path: 'groups',
          component: () => import('../views/profile/GroupsProfile.vue'),
          name: 'profile-group'
        }
      ]
    },
    {
      path: '/groups/:id',
      component: () => import('../views/groups/GroupView.vue'),
      name: 'group-view'
    },
    {
      path: '/post/:id',
      component: () => import('../views/post/PostView.vue'),
      name: 'show-post'
    },
    {
      path: '/forget_password',
      component: () => import('../views/authentication/ForgetPassword.vue'),
      name: 'forget-password'
    },
    {
      path: '/reset_password',
      component: () => import('../views/authentication/ResetPassword.vue')
    },
    {
      path: '/search',
      component: () => import('../views/SearchView.vue'),
      name: 'search',
    },
    {
      path: '/groups',
      children: [
        {
          path: 'feed',
          component: () => import('../views/groups/GroupFeed.vue'),
          name: 'group-feed'
        },
        {
          path: 'join',
          component: () => import('../views/GroupsView.vue'),
          name: 'group-join'
        },
        {
          path: '/',
          component: () => import('../views/GroupsView.vue'),
          name: 'group-parent'
        }
      ]
    },
    {
      path: '/friends',
      children: [
        {
          path: 'request',
          component: () => import('../views/FriendRequest.vue'),
          name: 'friend-request'
        },
        {
          path: 'suggestion',
          component: import('../views/friend/FriendSuggestion.vue'),
          name: 'friend-suggestion'
        }
      ]
    },
    {
      path: '/chat/:id?',
      component: () => import('../views/chat/ChatView.vue'),
      name: 'chat'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/common/NotFound.vue')
    }
  ]
})
router.beforeEach((to) => {
  if(to.name === 'forget-password'){return true}
  if (to.name !== 'login' && !isAuthenticated()) return { name: 'login' }
})
export default router
