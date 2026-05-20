<script setup>
import { ref, computed } from 'vue'
import { BUYERS, DISTRICTS } from '../stores/mock.js'

const buyers = ref(BUYERS.map(b => ({ ...b })))
const search = ref('')
const filterDistrict = ref('')

const filtered = computed(() => buyers.value.filter(b => {
  const q = search.value.toLowerCase()
  return (
    (!q || b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)) &&
    (!filterDistrict.value || b.district === filterDistrict.value)
  )
}))

function suspend(b) { b.status = 'suspended' }
function unsuspend(b) { b.status = 'active' }
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Buyer Management / வாங்குபவர் மேலாண்மை</h2>
      <div class="sub">{{ buyers.length }} registered buyers</div>
    </div>
  </div>
  <div class="page-body">
    <div class="search-bar">
      <input v-model="search" placeholder="Search name / ID…" style="max-width:260px" />
      <select v-model="filterDistrict" style="max-width:200px">
        <option value="">All Districts</option>
        <option v-for="d in DISTRICTS" :key="d">{{ d }}</option>
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
              <th>District</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Contacts</th>
              <th>Badge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in filtered" :key="b.id">
              <td><code style="font-size:11px">{{ b.id }}</code></td>
              <td>{{ b.name }}</td>
              <td style="font-family:monospace; font-size:12px">{{ b.phone }}</td>
              <td>{{ b.district }}</td>
              <td style="font-size:12px; color:var(--gray-600)">{{ b.joined }}</td>
              <td>
                <span class="badge" :class="b.status==='active' ? 'badge-green' : 'badge-red'">{{ b.status }}</span>
              </td>
              <td>{{ b.contacts }}</td>
              <td><span class="chip" style="font-size:11px">{{ b.badge }}</span></td>
              <td>
                <div class="row-actions">
                  <button v-if="b.status==='active'" class="btn btn-danger btn-sm" @click="suspend(b)">Suspend</button>
                  <button v-if="b.status==='suspended'" class="btn btn-ghost btn-sm" @click="unsuspend(b)">Unsuspend</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
