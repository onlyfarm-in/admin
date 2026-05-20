<script setup>
import { ref, computed } from 'vue'
import { LISTINGS } from '../stores/mock.js'

const listings = ref(LISTINGS.map(l => ({ ...l })))
const search = ref('')
const showReportsOnly = ref(false)

const filtered = computed(() => listings.value.filter(l => {
  const q = search.value.toLowerCase()
  return (
    (!q || l.produce.toLowerCase().includes(q) || l.farmer.toLowerCase().includes(q) || l.district.toLowerCase().includes(q)) &&
    (!showReportsOnly.value || l.reports > 0)
  )
}))

function remove(l) { l.status = 'removed' }
function flag(l) { l.reports++ }
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Listing Moderation / பட்டியல் மதிப்பீடு</h2>
      <div class="sub">{{ listings.filter(l=>l.reports>0).length }} reports pending review</div>
    </div>
  </div>
  <div class="page-body">
    <div class="search-bar">
      <input v-model="search" placeholder="Search produce, farmer, district…" style="max-width:300px" />
      <label style="display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer">
        <input type="checkbox" v-model="showReportsOnly" style="width:auto" />
        Reports only / புகார்கள் மட்டும்
      </label>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produce / பொருள்</th>
              <th>Farmer / விவசாயி</th>
              <th>District</th>
              <th>Qty / Price</th>
              <th>Posted</th>
              <th>Status</th>
              <th>Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in filtered" :key="l.id">
              <td><code style="font-size:11px">{{ l.id }}</code></td>
              <td>{{ l.produce }}</td>
              <td style="font-size:12px">{{ l.farmer }}</td>
              <td>{{ l.district }}</td>
              <td style="font-size:12px">{{ l.qty }} · {{ l.price }}</td>
              <td style="font-size:12px; color:var(--gray-600)">{{ l.posted }}</td>
              <td>
                <span class="badge" :class="l.status==='active' ? 'badge-green' : 'badge-red'">{{ l.status }}</span>
              </td>
              <td>
                <span v-if="l.reports > 0" class="badge badge-red">{{ l.reports }}</span>
                <span v-else class="badge badge-gray">0</span>
              </td>
              <td>
                <div class="row-actions">
                  <button class="btn btn-amber btn-sm" @click="flag(l)">Flag</button>
                  <button v-if="l.status==='active'" class="btn btn-danger btn-sm" @click="remove(l)">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!filtered.length" class="empty-state">
        <div class="icon">📋</div>
        <div>No listings found</div>
      </div>
    </div>
  </div>
</template>
