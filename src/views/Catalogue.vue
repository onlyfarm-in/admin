<script setup>
import { ref, computed } from 'vue'
import { PRODUCE } from '../stores/mock.js'

const items = ref(PRODUCE.map(p => ({ ...p })))
const search = ref('')
const filterCat = ref('')
const showAdd = ref(false)
const newItem = ref({ tamil: '', english: '', category: 'Vegetable', unit: 'kg' })

const CATS = ['Vegetable', 'Fruit', 'Grain', 'Herb', 'Spice']
const UNITS = ['kg', 'bunch', 'dozen', 'piece']

const filtered = computed(() => items.value.filter(p => {
  const q = search.value.toLowerCase()
  return (
    (!q || p.english.toLowerCase().includes(q) || p.tamil.includes(q)) &&
    (!filterCat.value || p.category === filterCat.value)
  )
}))

function addItem() {
  if (!newItem.value.english || !newItem.value.tamil) return
  items.value.push({ ...newItem.value, id: Date.now(), active: true })
  newItem.value = { tamil: '', english: '', category: 'Vegetable', unit: 'kg' }
  showAdd.value = false
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Produce Catalogue / பொருட்கள் பட்டியல்</h2>
      <div class="sub">Source for all sell/buy dropdowns — Tamil + English names</div>
    </div>
    <button class="btn btn-primary" @click="showAdd = !showAdd">+ Add Produce</button>
  </div>
  <div class="page-body">

    <div v-if="showAdd" class="card" style="margin-bottom:16px">
      <div class="section-title">Add New Produce / புதிய பொருள்</div>
      <div class="two-col">
        <div class="field"><label>Tamil Name / தமிழ் பெயர்</label><input v-model="newItem.tamil" placeholder="e.g. பாகற்காய்" /></div>
        <div class="field"><label>English Name</label><input v-model="newItem.english" placeholder="e.g. Bitter Gourd" /></div>
        <div class="field"><label>Category</label><select v-model="newItem.category"><option v-for="c in CATS" :key="c">{{ c }}</option></select></div>
        <div class="field"><label>Default Unit</label><select v-model="newItem.unit"><option v-for="u in UNITS" :key="u">{{ u }}</option></select></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" @click="addItem">Save / சேமி</button>
        <button class="btn btn-ghost" @click="showAdd=false">Cancel</button>
      </div>
    </div>

    <div class="search-bar">
      <input v-model="search" placeholder="Search produce…" style="max-width:260px" />
      <select v-model="filterCat" style="max-width:180px">
        <option value="">All Categories</option>
        <option v-for="c in CATS" :key="c">{{ c }}</option>
      </select>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tamil / தமிழ்</th>
              <th>English</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id">
              <td style="color:var(--gray-400);font-size:12px">{{ p.id }}</td>
              <td style="font-size:15px">{{ p.tamil }}</td>
              <td>{{ p.english }}</td>
              <td><span class="badge badge-gray">{{ p.category }}</span></td>
              <td>{{ p.unit }}</td>
              <td>
                <span class="badge" :class="p.active ? 'badge-green' : 'badge-red'">
                  {{ p.active ? 'Active' : 'Disabled' }}
                </span>
              </td>
              <td>
                <button class="btn btn-ghost btn-sm" @click="p.active = !p.active">
                  {{ p.active ? 'Disable' : 'Enable' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
