<script setup>
import { DISTRICT_STATS, PRODUCE, FARMERS } from '../stores/mock.js'

const topProduce = PRODUCE.filter(p => p.active).slice(0, 10).map((p, i) => ({
  name: `${p.english} / ${p.tamil}`,
  listings: Math.floor(Math.random() * 30 + 5),
  contacts: Math.floor(Math.random() * 20 + 2),
})).sort((a, b) => b.listings - a.listings)

const weeklyGrowth = [
  { week: 'Apr W1', farmers: 2 },
  { week: 'Apr W2', farmers: 3 },
  { week: 'Apr W3', farmers: 5 },
  { week: 'Apr W4', farmers: 4 },
  { week: 'May W1', farmers: 6 },
  { week: 'May W2', farmers: 7 },
]
const maxFarmers = Math.max(...weeklyGrowth.map(w => w.farmers))
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Analytics / பகுப்பாய்வு</h2>
      <div class="sub">District breakdown, produce stats, farmer growth</div>
    </div>
  </div>
  <div class="page-body">

    <!-- District table -->
    <div class="section-title">District Activity / மாவட்ட செயல்பாடு</div>
    <div class="card" style="margin-bottom:24px">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>District / மாவட்டம்</th>
              <th>Farmers</th>
              <th>Listings</th>
              <th>Buyers</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in DISTRICT_STATS" :key="d.district">
              <td>{{ d.district }}</td>
              <td>{{ d.farmers }}</td>
              <td>{{ d.listings }}</td>
              <td>{{ d.buyers }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="two-col">
      <!-- Top produce -->
      <div>
        <div class="section-title">Top Produce by Listings / முதல் 10 பொருட்கள்</div>
        <div class="card">
          <div v-for="(p, i) in topProduce" :key="p.name" style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--gray-200)">
            <span style="font-size:12px;color:var(--gray-400);width:20px">{{ i+1 }}</span>
            <div style="flex:1;font-size:13px">{{ p.name }}</div>
            <span class="badge badge-green">{{ p.listings }} listings</span>
            <span class="badge badge-amber">{{ p.contacts }} contacts</span>
          </div>
        </div>
      </div>

      <!-- Farmer growth -->
      <div>
        <div class="section-title">Farmer Growth / விவசாயி வளர்ச்சி</div>
        <div class="card">
          <div v-for="w in weeklyGrowth" :key="w.week" style="display:flex;align-items:center;gap:12px;padding:8px 0">
            <div style="width:60px;font-size:12px;color:var(--gray-600)">{{ w.week }}</div>
            <div style="flex:1;background:var(--gray-100);border-radius:4px;height:20px;position:relative">
              <div :style="`width:${(w.farmers/maxFarmers)*100}%;background:var(--green);height:100%;border-radius:4px`"></div>
            </div>
            <div style="width:24px;font-size:13px;font-weight:600">{{ w.farmers }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
