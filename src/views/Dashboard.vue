<script setup>
import { FARMERS, BUYERS, LISTINGS, ACTIVITY } from '../stores/mock.js'

const stats = [
  { label: 'Total Farmers / விவசாயிகள்', labelTa: '', num: FARMERS.length, sub: `${FARMERS.filter(f=>f.status==='pending').length} pending approval`, cls: '' },
  { label: 'Active Listings / பட்டியல்கள்', num: LISTINGS.length, sub: 'across all districts', cls: '' },
  { label: 'Total Buyers / வாங்குபவர்கள்', num: BUYERS.length, sub: `${BUYERS.filter(b=>b.status==='active').length} active`, cls: 'amber' },
  { label: 'Pending Approvals / அனுமதி', num: FARMERS.filter(f=>f.status==='pending').length, sub: 'new farmer registrations', cls: 'amber' },
  { label: 'Open Reports / புகார்கள்', num: LISTINGS.filter(l=>l.reports>0).length, sub: 'listings flagged by buyers', cls: 'red' },
  { label: 'Suspended Users / நீக்கப்பட்டவர்கள்', num: FARMERS.filter(f=>f.status==='suspended').length + BUYERS.filter(b=>b.status==='suspended').length, sub: 'farmers + buyers', cls: 'red' },
]

function activityIcon(type) {
  return { farmer:'🌾', listing:'📋', report:'🚩', buyer:'🛒' }[type] || '•'
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Dashboard / டாஷ்போர்டு</h2>
      <div class="sub">Welcome back — OnlyFarm Admin</div>
    </div>
  </div>
  <div class="page-body">

    <!-- Stats -->
    <div class="card-grid">
      <div
        v-for="s in stats" :key="s.label"
        class="stat-card" :class="s.cls"
      >
        <div class="stat-num">{{ s.num }}</div>
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-sub">{{ s.sub }}</div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="card" style="margin-bottom: 24px">
      <div class="section-title">Quick Actions / விரைவு செயல்கள்</div>
      <div style="display:flex; gap:10px; flex-wrap:wrap">
        <router-link to="/farmers" class="btn btn-primary">
          ✅ Approve Farmers ({{ FARMERS.filter(f=>f.status==='pending').length }})
        </router-link>
        <router-link to="/listings" class="btn btn-amber">
          🚩 Review Reports ({{ LISTINGS.filter(l=>l.reports>0).length }})
        </router-link>
        <router-link to="/blacklist" class="btn btn-danger">
          🚫 Blacklist Queue
        </router-link>
      </div>
    </div>

    <!-- Activity feed -->
    <div class="card">
      <div class="section-title">Last 24h Activity / கடந்த 24 மணி நேர செயல்பாடு</div>
      <div v-for="a in ACTIVITY" :key="a.text" style="display:flex; gap:12px; padding: 10px 0; border-bottom: 1px solid var(--gray-200)">
        <span style="font-size:18px">{{ activityIcon(a.type) }}</span>
        <div style="flex:1">
          <div style="font-size:13px">{{ a.text }}</div>
          <div style="font-size:11px; color: var(--gray-400); margin-top:2px">{{ a.time }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
