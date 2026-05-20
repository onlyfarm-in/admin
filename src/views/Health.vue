<script setup>
import { ref } from 'vue'

const syncing = ref(false)
const lastSync = ref('2026-05-20 09:15:00')

function forceSync() {
  syncing.value = true
  setTimeout(() => {
    syncing.value = false
    lastSync.value = new Date().toLocaleString('en-IN')
  }, 2000)
}

const health = [
  { label: 'GitHub API Rate Limit', labelTa: 'GitHub API வரம்பு', value: '4,850 / 5,000', note: 'Resets in 42 min', ok: true },
  { label: 'Groq API Quota', labelTa: 'Groq API ஒதுக்கீடு', value: '1,240 / 14,400 today', note: 'Free tier · resets midnight', ok: true },
  { label: 'Cloudflare Worker Errors (24h)', labelTa: 'Worker பிழைகள்', value: '0 errors', note: '100% success rate', ok: true },
  { label: 'Active Admin Sessions', labelTa: 'செயலில் உள்ள அமர்வுகள்', value: '1 session', note: 'You (this session)', ok: true },
]

const syncFiles = [
  { file: 'listings.enc', last: '2026-05-20 09:15', ok: true },
  { file: 'farmers.enc',  last: '2026-05-20 09:15', ok: true },
  { file: 'buyers.enc',   last: '2026-05-20 09:15', ok: true },
  { file: 'config.enc',   last: '2026-05-20 09:14', ok: true },
  { file: 'messages.enc', last: '2026-05-20 08:50', ok: true },
  { file: 'reports.enc',  last: '2026-05-20 09:15', ok: true },
]
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>System Health / கணினி நிலை</h2>
      <div class="sub">API quotas, sync status, error rates</div>
    </div>
    <button class="btn btn-primary" :disabled="syncing" @click="forceSync">
      {{ syncing ? '⟳ Syncing…' : '🔄 Force Sync' }}
    </button>
  </div>
  <div class="page-body">

    <div class="card-grid" style="margin-bottom:24px">
      <div v-for="h in health" :key="h.label" class="stat-card" :class="h.ok ? '' : 'red'">
        <div style="font-size:20px;margin-bottom:6px">{{ h.ok ? '✅' : '❌' }}</div>
        <div class="stat-label" style="font-weight:600;font-size:13px">{{ h.label }}</div>
        <div class="stat-num" style="font-size:18px;margin:4px 0">{{ h.value }}</div>
        <div class="stat-sub">{{ h.note }}</div>
      </div>
    </div>

    <div class="section-title">Data File Sync Status / தரவு ஒத்திசைவு</div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Last Successful Sync</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in syncFiles" :key="f.file">
              <td><code>{{ f.file }}</code></td>
              <td style="font-size:12px;color:var(--gray-600)">{{ syncing ? '⟳ syncing…' : f.last }}</td>
              <td>
                <span class="badge" :class="syncing ? 'badge-amber' : 'badge-green'">
                  {{ syncing ? 'syncing' : 'ok' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
