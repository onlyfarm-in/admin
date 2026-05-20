<script setup>
import { useTogglesStore } from '../stores/toggles.js'
const store = useTogglesStore()
const s = store.state

const TOGGLES = [
  { key: 'janakiFarmer', label: 'Janaki AI — Farmer Planting Advice', labelTa: 'ஜானகி AI — விவசாயி அறிவுரை', sub: 'Opt-in AI tips for crop planning, season timing, soil care' },
  { key: 'janakiBuyer',  label: 'Janaki AI — Buyer Siddha / Ayurveda Recs', labelTa: 'ஜானகி AI — வாங்குபவர் பரிந்துரை', sub: 'Seasonal and medicinal produce recommendations for buyers' },
  { key: 'approvalGate', label: 'New Farmer Approval Gate', labelTa: 'விவசாயி ஒப்புதல் நுழைவாயில்', sub: 'Require admin approval before farmers can post listings' },
  { key: 'analytics',   label: 'Analytics Data Collection', labelTa: 'பகுப்பாய்வு தரவு சேகரிப்பு', sub: 'Collect anonymised usage data (opt-in per user)' },
  { key: 'messaging',   label: 'In-App Messaging', labelTa: 'உள் செய்தியிடல்', sub: 'Allow buyer–farmer enquiry threads within the app' },
  { key: 'marketPrices',label: 'Market Reference Prices Visible to Farmers', labelTa: 'விவசாயிகளுக்கு சந்தை விலை', sub: 'Show mandi reference price suggestions when posting listings' },
]
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Feature Toggles / அம்சங்கள்</h2>
      <div class="sub">Changes saved automatically to localStorage (plan-2: config.enc)</div>
    </div>
  </div>
  <div class="page-body">
    <div class="card">
      <div v-for="t in TOGGLES" :key="t.key" class="toggle-wrap">
        <div class="toggle-info">
          <div class="t-label">{{ t.label }} / {{ t.labelTa }}</div>
          <div class="t-sub">{{ t.sub }}</div>
        </div>
        <label class="toggle">
          <input type="checkbox" v-model="s[t.key]" />
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
  </div>
</template>
