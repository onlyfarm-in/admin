<script setup>
import { ref } from 'vue'
import { BLACKLIST } from '../stores/mock.js'

const entries = ref([...BLACKLIST])
const phone = ref('')
const reason = ref('')
const action = ref('Warn')

const ACTIONS = ['Warn', 'Temp ban (7 days)', 'Temp ban (30 days)', 'Permanent ban']

function add() {
  if (!phone.value.trim() || !reason.value.trim()) return
  entries.value.unshift({
    id: 'BL' + String(entries.value.length + 1).padStart(3, '0'),
    phone: phone.value,
    reason: reason.value,
    action: action.value,
    date: new Date().toISOString().slice(0, 10),
    admin: 'Admin (you)',
    active: true,
  })
  phone.value = ''; reason.value = ''
}

function unban(e) { e.active = false }
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Blacklist / தடுப்பு பட்டியல்</h2>
      <div class="sub">Owner-only — warn, temp ban, or permanently ban users</div>
    </div>
  </div>
  <div class="page-body">
    <div class="card" style="margin-bottom:20px;border-left:4px solid var(--red)">
      <div class="section-title">Add to Blacklist / தடுப்பு பட்டியலில் சேர்</div>
      <div class="two-col">
        <div class="field"><label>Phone Number</label><input v-model="phone" placeholder="Masked or full" /></div>
        <div class="field"><label>Reason / காரணம்</label><input v-model="reason" placeholder="Why are you blacklisting?" /></div>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap">
        <div class="field" style="margin:0">
          <label>Action</label>
          <select v-model="action" style="width:auto">
            <option v-for="a in ACTIONS" :key="a">{{ a }}</option>
          </select>
        </div>
        <button class="btn btn-danger" @click="add">🚫 Blacklist</button>
      </div>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Phone</th>
              <th>Reason</th>
              <th>Action</th>
              <th>Date</th>
              <th>By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in entries" :key="e.id">
              <td><code style="font-size:11px">{{ e.id }}</code></td>
              <td style="font-family:monospace;font-size:12px">{{ e.phone }}</td>
              <td style="max-width:200px;font-size:12px">{{ e.reason }}</td>
              <td><span class="badge badge-red">{{ e.action }}</span></td>
              <td style="font-size:12px;color:var(--gray-600)">{{ e.date }}</td>
              <td style="font-size:12px">{{ e.admin }}</td>
              <td>
                <span class="badge" :class="e.active ? 'badge-red' : 'badge-gray'">
                  {{ e.active ? 'Active' : 'Lifted' }}
                </span>
              </td>
              <td>
                <button v-if="e.active" class="btn btn-ghost btn-sm" @click="unban(e)">Lift Ban</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!entries.length" class="empty-state">
        <div class="icon">✅</div>
        <div>No blacklisted users</div>
      </div>
    </div>
  </div>
</template>
