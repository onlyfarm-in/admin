<script setup>
import { ref } from 'vue'
import { BROADCASTS, DISTRICTS } from '../stores/mock.js'

const broadcasts = ref([...BROADCASTS])
const msg = ref('')
const target = ref('All Users')
const scheduled = ref('')

const TARGETS = ['All Users', 'All Farmers', 'All Buyers', ...DISTRICTS.slice(0, 5).map(d => `District: ${d}`)]

function send() {
  if (!msg.value.trim()) return
  broadcasts.value.unshift({
    id: Date.now(),
    message: msg.value,
    target: target.value,
    sent: new Date().toISOString().slice(0, 16).replace('T', ' '),
    count: 0,
  })
  msg.value = ''
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Broadcast / Announcement / அறிவிப்பு</h2>
      <div class="sub">Send in-app banners to farmers, buyers, or specific districts</div>
    </div>
  </div>
  <div class="page-body">
    <div class="card" style="margin-bottom:24px">
      <div class="section-title">New Broadcast / புதிய அறிவிப்பு</div>
      <div class="field">
        <label>Message / செய்தி</label>
        <textarea v-model="msg" rows="3" placeholder="Type your announcement…"></textarea>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div class="field" style="margin:0;flex:1;min-width:180px">
          <label>Target / இலக்கு</label>
          <select v-model="target">
            <option v-for="t in TARGETS" :key="t">{{ t }}</option>
          </select>
        </div>
        <div class="field" style="margin:0;flex:1;min-width:180px">
          <label>Schedule (optional)</label>
          <input type="datetime-local" v-model="scheduled" />
        </div>
        <button class="btn btn-amber" @click="send">📢 Send Now</button>
      </div>
    </div>

    <div class="section-title">Broadcast History / வரலாறு</div>
    <div class="card">
      <div v-for="b in broadcasts" :key="b.id" style="padding:12px 0;border-bottom:1px solid var(--gray-200)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
          <div style="flex:1">
            <div style="font-size:13px;margin-bottom:4px">{{ b.message }}</div>
            <div style="display:flex;gap:8px;align-items:center">
              <span class="badge badge-green">{{ b.target }}</span>
              <span style="font-size:11px;color:var(--gray-400)">{{ b.sent }}</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--gray-600);white-space:nowrap">{{ b.count }} delivered</div>
        </div>
      </div>
    </div>
  </div>
</template>
