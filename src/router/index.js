import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Payment from '@/views/Payment.vue'
import Warning from '@/views/Warning.vue'
import Opening from '@/views/Opening.vue'
import Landing from '@/views/Landing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/payment',
      component: Payment,
    },
    {
      path: '/warning',
      component: Warning,
    },
    {
      path: '/opening',
      component: Opening,
    },
    {
      path: '/landing',
      component: Landing,
    },
  ],
})

export default router
