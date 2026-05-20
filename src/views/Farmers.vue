<script setup>
import { ref, computed } from 'vue'
import { FARMERS, DISTRICTS } from '../stores/mock.js'

const farmers = ref(FARMERS.map(f => ({ ...f })))
const search = ref('')
const filterDistrict = ref('')
const filterStatus = ref('')

const filtered = computed(() => farmers.value.filter(f => {
  const q = search.value.toLowerCase()
  return (
    (!q || f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q)) &&
    (!filterDistrict.value || f.district === filterDistrict.value) &&
    (!filterStatus.value || f.status === filterStatus.value)
  )
}))

function approve(f) { f.status = 'active' }
function suspend(f) { f.status = 'suspended' }
function unsuspend(f) { f.status = 'active' }
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Farmer Management / விவசாயி மேலாண்மை</h2>
      <div class="sub">{{ farmers.length }} registered farmers</div>
    </div>
  </div>
  <div class="page-body">
    <div class="search-bar">
      <input v-model="search" placeholder="Search name / ID…" style="max-width:260px" />
      <select v-model="filterDistrict" style="max-width:200px">
        <option value="">All Districts</option>
        <option v-for="d in DISTRICTS" :key="d">{{ d }}</option>
      </select>
      <select v-model="filterStatus" style="max-width:160px">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name / பெயர்</th>
              <th>Phone</th>
              <th>District / மாவட்டம்</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Listings</th>
              <th>Badges</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in filtered" :key="f.id">
              <td><code style="font-size:11px">{{ f.id }}</code></td>
              <td>{{ f.name }}</td>
              <td style="font-family:monospace; font-size:12px">{{ f.phone }}</td>
              <td>{{ f.district }}</td>
              <td style="font-size:12px; color:var(--gray-600)">{{ f.joined }}</td>
              <td>
                <span class="badge" :class="{
                  'badge-green': f.status==='active',
                  'badge-amber': f.status==='pending',
                  'badge-red': f.status==='suspended',
                }">{{ f.status }}</span>
              </td>
              <td>{{ f.listings }}</td>
              <td>
                <div class="chip-list">
                  <span v-for="b in f.badges" :key="b" class="chip" style="font-size:10px">{{ b }}</span>
                </div>
              </td>
              <td>
                <div class="row-actions">
                  <button v-if="f.status==='pending'" class="btn btn-primary btn-sm" @click="approve(f)">Approve</button>
                  <button v-if="f.status==='active'" class="btn btn-danger btn-sm" @click="suspend(f)">Suspend</button>
                  <button v-if="f.status==='suspended'" class="btn btn-ghost btn-sm" @click="unsuspend(f)">Unsuspend</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!filtered.length" class="empty-state">
        <div class="icon">🌾</div>
        <div>No farmers match your filters</div>
      </div>
    </div>
  </div>
</template>
