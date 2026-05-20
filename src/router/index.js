import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login',       component: () => import('../views/Login.vue') },
  { path: '/dashboard',   component: () => import('../views/Dashboard.vue') },
  { path: '/farmers',     component: () => import('../views/Farmers.vue') },
  { path: '/listings',    component: () => import('../views/Listings.vue') },
  { path: '/buyers',      component: () => import('../views/Buyers.vue') },
  { path: '/toggles',     component: () => import('../views/Toggles.vue') },
  { path: '/analytics',   component: () => import('../views/Analytics.vue') },
  { path: '/ai',          component: () => import('../views/AIPanel.vue') },
  { path: '/comms',       component: () => import('../views/Comms.vue') },
  { path: '/prices',      component: () => import('../views/Prices.vue') },
  { path: '/badges',      component: () => import('../views/Badges.vue') },
  { path: '/catalogue',   component: () => import('../views/Catalogue.vue') },
  { path: '/admins',      component: () => import('../views/Admins.vue') },
  { path: '/broadcast',   component: () => import('../views/Broadcast.vue') },
  { path: '/blacklist',   component: () => import('../views/Blacklist.vue') },
  { path: '/audit',       component: () => import('../views/Audit.vue') },
  { path: '/health',      component: () => import('../views/Health.vue') },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
