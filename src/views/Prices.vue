<script setup>
import { ref } from 'vue'
import { MARKET_PRICES } from '../stores/mock.js'

const prices = ref(MARKET_PRICES.map(p => ({ ...p, editing: false, newPrice: p.price })))
const bulkText = ref('')

function save(p) {
  p.price = Number(p.newPrice)
  p.updated = new Date().toISOString().slice(0, 10)
  p.editing = false
}

function bulkUpdate() {
  const lines = bulkText.value.trim().split('\n')
  lines.forEach(line => {
    const [name, val] = line.split(':').map(s => s.trim())
    const p = prices.value.find(p => p.produce.toLowerCase().includes(name.toLowerCase()))
    if (p && val) {
      p.price = Number(val)
      p.updated = new Date().toISOString().slice(0, 10)
    }
  })
  bulkText.value = ''
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Market Reference Prices / சந்தை குறிப்பு விலை</h2>
      <div class="sub">Mandi rates shown to farmers as suggestions when posting</div>
    </div>
  </div>
  <div class="page-body">

    <div class="card" style="margin-bottom:24px">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Produce / பொருள்</th>
              <th>Unit</th>
              <th>Reference Price (₹)</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in prices" :key="p.produce">
              <td>{{ p.produce }}</td>
              <td>{{ p.unit }}</td>
              <td>
                <span v-if="!p.editing">₹{{ p.price }}/{{ p.unit }}</span>
                <input v-else v-model="p.newPrice" type="number" style="width:80px" />
              </td>
              <td style="font-size:12px;color:var(--gray-600)">{{ p.updated }}</td>
              <td>
                <div class="row-actions">
                  <button v-if="!p.editing" class="btn btn-ghost btn-sm" @click="p.editing=true; p.newPrice=p.price">Edit</button>
                  <button v-else class="btn btn-primary btn-sm" @click="save(p)">Save</button>
                  <button v-if="p.editing" class="btn btn-ghost btn-sm" @click="p.editing=false">Cancel</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bulk update -->
    <div class="card">
      <div class="section-title">Bulk Update / ஒட்டுமொத்த புதுப்பிப்பு</div>
      <p style="font-size:12px;color:var(--gray-600);margin-bottom:12px">
        Paste one line per produce: <code>Tomato: 20</code>
      </p>
      <div class="field">
        <textarea v-model="bulkText" rows="5" placeholder="Tomato: 20&#10;Onion: 24&#10;Banana: 42"></textarea>
      </div>
      <button class="btn btn-primary" @click="bulkUpdate">Apply Bulk Update</button>
    </div>

  </div>
</template>
