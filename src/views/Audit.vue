<script setup>
import { ref, computed } from 'vue'
import { AUDIT_LOG } from '../stores/mock.js'

const logs = AUDIT_LOG
const filterAction = ref('')
const filterDate = ref('')

const ACTION_TYPES = [...new Set(logs.map(l => l.action.split(' ').slice(0, 2).join(' ')))]

const filtered = computed(() => logs.filter(l => {
  return (
    (!filterAction.value || l.action.includes(filterAction.value)) &&
    (!filterDate.value || l.time.startsWith(filterDate.value))
  )
}))

function actionIcon(action) {
  if (action.includes('farmer')) return '🌾'
  if (action.includes('buyer')) return '🛒'
  if (action.includes('listing')) return '📋'
  if (action.includes('badge')) return '🏅'
  if (action.includes('price')) return '💰'
  if (action.includes('Broadcast')) return '📢'
  if (action.includes('feature') || action.includes('Toggle')) return '⚙️'
  if (action.includes('Blacklist') || action.includes('ban')) return '🚫'
  return '📝'
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Audit Log / தணிக்கை பதிவு</h2>
      <div class="sub">Read-only — every admin action recorded</div>
    </div>
  </div>
  <div class="page-body">
    <div class="search-bar">
      <input v-model="filterAction" placeholder="Filter by action…" style="max-width:240px" />
      <input type="date" v-model="filterDate" style="max-width:180px" />
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Admin</th>
              <th>Action</th>
              <th>Target</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in filtered" :key="l.id">
              <td style="color:var(--gray-400);font-size:12px">{{ l.id }}</td>
              <td style="font-size:12px">{{ l.admin }}</td>
              <td>
                <span style="margin-right:6px">{{ actionIcon(l.action) }}</span>
                {{ l.action }}
              </td>
              <td style="font-size:12px;color:var(--gray-600)">{{ l.target }}</td>
              <td style="font-size:12px;color:var(--gray-600);white-space:nowrap">{{ l.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!filtered.length" class="empty-state">
        <div class="icon">📝</div>
        <div>No log entries match your filters</div>
      </div>
    </div>
  </div>
</template>
