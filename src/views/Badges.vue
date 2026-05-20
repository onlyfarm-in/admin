<script setup>
import { ref } from 'vue'
import { FARMERS, BUYERS } from '../stores/mock.js'

const activeTab = ref('farmers')

const FARMER_BADGES = ['Organic Farmer', 'Native Crop', 'Area Verified', 'Multi-Crop', 'Women Farmer', 'Small Farmer']
const BUYER_BADGES  = ['Verified Buyer', 'Regular Buyer', 'Bulk Buyer', 'Community Buyer']

const farmers = ref(FARMERS.map(f => ({ ...f, badges: [...f.badges] })))
const buyers  = ref(BUYERS.map(b => ({ ...b })))

const selectedFarmer = ref(null)
const selectedBuyer  = ref(null)
const addNote = ref('')
const selectedBadge = ref('')

function toggleFarmerBadge(farmer, badge) {
  const idx = farmer.badges.indexOf(badge)
  if (idx >= 0) farmer.badges.splice(idx, 1)
  else farmer.badges.push(badge)
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Verification & Badges / சரிபார்ப்பு & பதக்கங்கள்</h2>
      <div class="sub">Assign and revoke farmer and buyer badges</div>
    </div>
  </div>
  <div class="page-body">
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab==='farmers' }" @click="activeTab='farmers'">🌾 Farmer Badges</div>
      <div class="tab" :class="{ active: activeTab==='buyers' }" @click="activeTab='buyers'">🛒 Buyer Badges</div>
    </div>

    <!-- Farmer badges -->
    <div v-if="activeTab==='farmers'">
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Farmer / விவசாயி</th>
                <th>District</th>
                <th>Current Badges</th>
                <th>Available Badges</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in farmers" :key="f.id">
                <td>{{ f.name }}</td>
                <td>{{ f.district }}</td>
                <td>
                  <div class="chip-list">
                    <span v-for="b in f.badges" :key="b" class="chip" style="font-size:10px;cursor:pointer" @click="toggleFarmerBadge(f, b)" title="Click to revoke">
                      {{ b }} ✕
                    </span>
                    <span v-if="!f.badges.length" style="font-size:12px;color:var(--gray-400)">No badges</span>
                  </div>
                </td>
                <td>
                  <div style="display:flex;flex-wrap:wrap;gap:4px">
                    <button
                      v-for="b in FARMER_BADGES.filter(b => !f.badges.includes(b))"
                      :key="b"
                      class="btn btn-ghost btn-sm"
                      style="font-size:10px;padding:2px 8px"
                      @click="toggleFarmerBadge(f, b)"
                    >+ {{ b }}</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Buyer badges -->
    <div v-else>
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Buyer / வாங்குபவர்</th>
                <th>District</th>
                <th>Current Badge</th>
                <th>Change Badge</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in buyers" :key="b.id">
                <td>{{ b.name }}</td>
                <td>{{ b.district }}</td>
                <td><span class="chip" style="font-size:11px">{{ b.badge }}</span></td>
                <td>
                  <select v-model="b.badge" style="font-size:12px;padding:4px 8px;width:auto">
                    <option v-for="bg in BUYER_BADGES" :key="bg">{{ bg }}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
