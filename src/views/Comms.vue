<script setup>
import { ref } from 'vue'

const activeTab = ref('farmers')
const expandedThread = ref(null)

const THREADS = {
  farmers: [
    {
      farmer: 'முருகன் / Murugan', district: 'Thanjavur',
      contacts: [
        {
          buyer: 'சுரேஷ் / Suresh', lastMsg: '2026-05-18', revealed: true, revealedAt: '2026-05-18 14:22',
          messages: [
            { from: 'buyer', text: 'Hi, interested in 50kg tomato. Is it organic?', time: '2026-05-18 13:00' },
            { from: 'farmer', text: 'Yes, fully organic. Available from tomorrow.', time: '2026-05-18 13:45' },
            { from: 'buyer', text: 'Great, please share contact.', time: '2026-05-18 14:20' },
            { from: 'system', text: '📞 Contact number revealed to buyer', time: '2026-05-18 14:22' },
          ]
        },
        {
          buyer: 'அருண் / Arun', lastMsg: '2026-05-16', revealed: false, revealedAt: null,
          messages: [
            { from: 'buyer', text: 'Do you deliver to Coimbatore?', time: '2026-05-16 10:00' },
            { from: 'farmer', text: 'No delivery, farm pickup only.', time: '2026-05-16 11:30' },
          ]
        }
      ]
    },
    {
      farmer: 'செல்வி / Selvi', district: 'Dindigul',
      contacts: [
        {
          buyer: 'நிறைவு NGO / Niraivu NGO', lastMsg: '2026-05-17', revealed: true, revealedAt: '2026-05-17 09:10',
          messages: [
            { from: 'buyer', text: 'We need 500 bunches banana for school midday meal.', time: '2026-05-17 08:30' },
            { from: 'farmer', text: 'Available. Price ₹38/dozen for bulk.', time: '2026-05-17 09:00' },
            { from: 'system', text: '📞 Contact number revealed to buyer', time: '2026-05-17 09:10' },
          ]
        }
      ]
    }
  ]
}

function toggleThread(key) {
  expandedThread.value = expandedThread.value === key ? null : key
}

function msgStyle(msg) {
  if (msg.from === 'system') return { background: 'var(--amber-light)', color: '#E65100', fontStyle: 'italic' }
  if (msg.from === 'farmer') return { background: 'var(--green-pale)', alignSelf: 'flex-start' }
  return { background: 'var(--gray-100)', alignSelf: 'flex-end' }
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Communication Moderation / தொடர்பு மதிப்பீடு</h2>
      <div class="sub">Farmer–buyer threads and contact reveal events</div>
    </div>
  </div>
  <div class="page-body">
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab==='farmers' }" @click="activeTab='farmers'">🌾 Farmers View</div>
      <div class="tab" :class="{ active: activeTab==='buyers' }" @click="activeTab='buyers'">🛒 Buyers View</div>
    </div>

    <div v-if="activeTab === 'farmers'">
      <div v-for="farmer in THREADS.farmers" :key="farmer.farmer" class="card" style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <strong>{{ farmer.farmer }}</strong>
            <span class="badge badge-gray" style="margin-left:8px">{{ farmer.district }}</span>
          </div>
          <span style="font-size:12px;color:var(--gray-600)">{{ farmer.contacts.length }} buyer threads</span>
        </div>

        <div v-for="contact in farmer.contacts" :key="contact.buyer" style="border:1px solid var(--gray-200);border-radius:6px;margin-bottom:8px">
          <div
            style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;cursor:pointer"
            @click="toggleThread(farmer.farmer + contact.buyer)"
          >
            <div style="display:flex;align-items:center;gap:10px">
              <span>🛒 {{ contact.buyer }}</span>
              <span v-if="contact.revealed" class="badge badge-amber">📞 Contact revealed {{ contact.revealedAt }}</span>
            </div>
            <span style="font-size:12px;color:var(--gray-400)">{{ expandedThread === farmer.farmer + contact.buyer ? '▲' : '▼' }}</span>
          </div>

          <div v-if="expandedThread === farmer.farmer + contact.buyer" style="padding:12px;border-top:1px solid var(--gray-200)">
            <div style="display:flex;flex-direction:column;gap:8px;max-height:260px;overflow-y:auto">
              <div v-for="msg in contact.messages" :key="msg.time"
                style="max-width:75%;padding:8px 12px;border-radius:8px;font-size:13px"
                :style="msgStyle(msg)"
              >
                <div>{{ msg.text }}</div>
                <div style="font-size:10px;color:var(--gray-400);margin-top:4px">{{ msg.from }} · {{ msg.time }}</div>
              </div>
            </div>
            <div style="margin-top:10px;display:flex;gap:8px">
              <button class="btn btn-amber btn-sm">Flag Thread</button>
              <button class="btn btn-danger btn-sm">Suspend Both</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="icon">🛒</div>
      <div>Buyers view — same structure, buyer-centric. Data wired in Plan-2.</div>
    </div>
  </div>
</template>
