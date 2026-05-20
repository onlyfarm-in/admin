<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const NAV = [
  { section: 'Main' },
  { path: '/dashboard', icon: '🏠', label: 'Dashboard', labelTa: 'டாஷ்போர்டு' },
  { section: 'People' },
  { path: '/farmers',   icon: '🌾', label: 'Farmers', labelTa: 'விவசாயிகள்' },
  { path: '/buyers',    icon: '🛒', label: 'Buyers', labelTa: 'வாங்குபவர்கள்' },
  { section: 'Content' },
  { path: '/listings',  icon: '📋', label: 'Listings', labelTa: 'பட்டியல்கள்' },
  { path: '/catalogue', icon: '🌿', label: 'Produce Catalogue', labelTa: 'பொருட்கள்' },
  { path: '/prices',    icon: '💰', label: 'Market Prices', labelTa: 'சந்தை விலை' },
  { section: 'Platform' },
  { path: '/badges',    icon: '🏅', label: 'Badges', labelTa: 'பதக்கங்கள்' },
  { path: '/comms',     icon: '💬', label: 'Communications', labelTa: 'தொடர்பு' },
  { path: '/broadcast', icon: '📢', label: 'Broadcast', labelTa: 'அறிவிப்பு' },
  { path: '/toggles',   icon: '⚙️', label: 'Feature Toggles', labelTa: 'அம்சங்கள்' },
  { path: '/analytics', icon: '📊', label: 'Analytics', labelTa: 'பகுப்பாய்வு' },
  { path: '/ai',        icon: '🤖', label: 'Janaki AI', labelTa: 'ஜானகி AI' },
  { section: 'Admin' },
  { path: '/admins',    icon: '👤', label: 'Admin Users', labelTa: 'நிர்வாகிகள்' },
  { path: '/blacklist', icon: '🚫', label: 'Blacklist', labelTa: 'தடுப்பு பட்டியல்' },
  { path: '/audit',     icon: '📝', label: 'Audit Log', labelTa: 'தணிக்கை பதிவு' },
  { path: '/health',    icon: '💡', label: 'System Health', labelTa: 'கணினி நிலை' },
]

const navItems = computed(() => NAV.filter(n => n.path))
const isLogin = computed(() => route.path === '/login')

function go(path) {
  router.push(path)
}
function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <!-- Login screen — no shell -->
  <router-view v-if="!auth.isLoggedIn || isLogin" />

  <!-- Main shell -->
  <div v-else class="app-shell">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <h1>🌱 OnlyFarm</h1>
        <span>நிர்வாக பலகை / Admin Panel</span>
      </div>
      <nav class="nav-section">
        <template v-for="item in NAV" :key="item.path || item.section">
          <div v-if="item.section" class="nav-label">{{ item.section }}</div>
          <div
            v-else
            class="nav-item"
            :class="{ active: route.path === item.path }"
            @click="go(item.path)"
          >
            <span class="icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </div>
        </template>
        <div class="divider" style="margin: 8px 0; border-color: rgba(255,255,255,0.15)"></div>
        <div class="nav-item" @click="logout" style="color: rgba(255,100,100,0.9)">
          <span class="icon">🚪</span><span>Logout / வெளியேறு</span>
        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Bottom nav (mobile) -->
    <nav class="bottom-nav">
      <div class="bottom-nav-inner">
        <div
          v-for="item in navItems"
          :key="item.path"
          class="bottom-nav-item"
          :class="{ active: route.path === item.path }"
          @click="go(item.path)"
        >
          <span class="icon">{{ item.icon }}</span>
          <span>{{ item.label.split(' ')[0] }}</span>
        </div>
      </div>
    </nav>
  </div>
</template>
