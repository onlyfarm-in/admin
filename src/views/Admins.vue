<script setup>
import { ref } from 'vue'

const admins = ref([
  { phone: '98****0001', role: 'Owner', lastLogin: '2026-05-20 09:00', you: true },
])
const newPhone = ref('')
const newRole = ref('Admin')

function add() {
  if (!newPhone.value.trim()) return
  admins.value.push({ phone: newPhone.value, role: newRole.value, lastLogin: 'Never', you: false })
  newPhone.value = ''
}
function remove(a) {
  admins.value = admins.value.filter(x => x !== a)
}
</script>

<template>
  <div class="page-header">
    <div class="page-header-left">
      <h2>Admin User Management / நிர்வாக பயனர் மேலாண்மை</h2>
      <div class="sub">Owner-only — add or remove admin access</div>
    </div>
  </div>
  <div class="page-body">
    <div class="card" style="margin-bottom:20px">
      <div class="section-title">Add Admin / நிர்வாகி சேர்</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div class="field" style="margin:0;flex:1;min-width:160px">
          <label>Phone Number</label>
          <input v-model="newPhone" placeholder="98XXXXXXXX" />
        </div>
        <div class="field" style="margin:0">
          <label>Role</label>
          <select v-model="newRole" style="width:auto">
            <option>Admin</option>
            <option>Owner</option>
          </select>
        </div>
        <button class="btn btn-primary" @click="add">Add / சேர்</button>
      </div>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Phone</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in admins" :key="a.phone">
              <td style="font-family:monospace">{{ a.phone }} <span v-if="a.you" class="badge badge-green" style="margin-left:6px">You</span></td>
              <td><span class="badge" :class="a.role==='Owner' ? 'badge-amber' : 'badge-gray'">{{ a.role }}</span></td>
              <td style="font-size:12px;color:var(--gray-600)">{{ a.lastLogin }}</td>
              <td>
                <button v-if="!a.you" class="btn btn-danger btn-sm" @click="remove(a)">Remove</button>
                <span v-else style="font-size:12px;color:var(--gray-400)">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
