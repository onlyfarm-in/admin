<script setup>
import { ref } from 'vue'
import { DISTRICTS } from '../stores/mock.js'

const farmerPrompt = ref('You are Janaki Ammal, an expert Tamil Nadu agricultural advisor. Help farmers with planting timing, soil preparation, and crop care for {{crop}} in {{district}} during {{season}}. Reply in Tamil and English.')
const buyerPrompt = ref('You are Janaki Ammal. Recommend seasonal and medicinal produce for buyers in Tamil Nadu. Focus on Siddha and Ayurveda traditions. Suggest produce for {{category}}.')

const testQuery = ref('')
const testDistrict = ref('')
const testSeason = ref('')
const testResult = ref('')

const districtToggles = ref(
  DISTRICTS.slice(0, 10).reduce((acc, d) => ({ ...acc, [d]: true }), {})
)

const models = ['llama3-70b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it']
const selectedModel = ref('llama3-70b-8192')

const optInFarmers = 5
const optInBuyers = 3
const queriesToday = 12
const queriesWeek = 47

function runTest() {
  if (!testQuery.value.trim()) return
  testResult.value = '[Mock response] Janaki AI would respond here based on the query: "' + testQuery.value + '" for district ' + (testDistrict.value || 'all') + '. Real Groq API call wired in Plan-2.'
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Janaki AI Control Panel / ஜானகி AI கட்டுப்பாட்டு குழு</h2>
      <div class="sub">Manage AI behaviour, prompts, and per-district toggles</div>
    </div>
  </div>
  <div class="page-body">

    <!-- Stats -->
    <div class="card-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:24px">
      <div class="stat-card"><div class="stat-num">{{ optInFarmers }}</div><div class="stat-label">Farmers opted in</div></div>
      <div class="stat-card amber"><div class="stat-num">{{ optInBuyers }}</div><div class="stat-label">Buyers opted in</div></div>
      <div class="stat-card"><div class="stat-num">{{ queriesToday }}</div><div class="stat-label">Queries today</div></div>
      <div class="stat-card amber"><div class="stat-num">{{ queriesWeek }}</div><div class="stat-label">Queries this week</div></div>
    </div>

    <div class="two-col" style="margin-bottom:24px">
      <!-- Model selector -->
      <div class="card">
        <div class="section-title">Model / மாடல்</div>
        <div class="field">
          <label>Groq Model</label>
          <select v-model="selectedModel">
            <option v-for="m in models" :key="m">{{ m }}</option>
          </select>
        </div>
        <!-- Per-district toggles -->
        <div class="section-title" style="margin-top:16px">Per-District Farmer Advice</div>
        <div style="max-height:200px;overflow-y:auto">
          <div v-for="(val, district) in districtToggles" :key="district" class="toggle-wrap" style="padding:8px 0">
            <div class="toggle-info"><div class="t-label" style="font-size:13px">{{ district }}</div></div>
            <label class="toggle">
              <input type="checkbox" v-model="districtToggles[district]" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Prompt editor -->
      <div class="card">
        <div class="section-title">Prompt Templates / வார்ப்புரு</div>
        <div class="field">
          <label>Farmer Advice Prompt</label>
          <textarea v-model="farmerPrompt" rows="5"></textarea>
        </div>
        <div class="field">
          <label>Buyer Recommendation Prompt</label>
          <textarea v-model="buyerPrompt" rows="5"></textarea>
        </div>
        <button class="btn btn-primary btn-sm">Save Prompts / சேமி</button>
      </div>
    </div>

    <!-- Test console -->
    <div class="card">
      <div class="section-title">Test Console / சோதனை கட்டுப்பாட்டகம்</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        <input v-model="testQuery" placeholder="Enter test query…" style="flex:1;min-width:200px" />
        <select v-model="testDistrict" style="max-width:180px">
          <option value="">Select district</option>
          <option v-for="d in DISTRICTS" :key="d">{{ d }}</option>
        </select>
        <input v-model="testSeason" placeholder="Season (optional)" style="max-width:160px" />
        <button class="btn btn-amber" @click="runTest">▶ Run Test / சோதி</button>
      </div>
      <div v-if="testResult" class="card" style="background:var(--gray-50);font-size:13px;white-space:pre-wrap">{{ testResult }}</div>
      <div v-else class="empty-state" style="padding:24px">
        <div>Enter a query and click Run Test — Groq API wired in Plan-2</div>
      </div>
    </div>

  </div>
</template>
