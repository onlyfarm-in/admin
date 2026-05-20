<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const pass = ref('')
const error = ref('')

function submit() {
  error.value = ''
  if (auth.login(pass.value)) {
    router.push('/dashboard')
  } else {
    error.value = 'Incorrect passphrase / தவறான கடவுச்சொல்'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">🌱</div>
      <h1>OnlyFarm</h1>
      <p class="login-sub">நிர்வாக பலகை / Admin Panel</p>
      <p class="login-note">Plan-1 mock auth — passphrase only</p>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Passphrase / கடவுச்சொல்</label>
          <input
            v-model="pass"
            type="password"
            placeholder="Enter passphrase"
            autofocus
          />
        </div>
        <div v-if="error" class="login-error">{{ error }}</div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
          Login / உள்நுழை
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--green);
  padding: 20px;
}
.login-card {
  background: white;
  border-radius: 12px;
  padding: 40px 32px;
  width: 100%;
  max-width: 360px;
  box-shadow: var(--shadow-md);
  text-align: center;
}
.login-logo { font-size: 48px; margin-bottom: 8px; }
h1 { font-size: 24px; font-weight: 700; color: var(--green); margin-bottom: 4px; }
.login-sub { color: var(--gray-600); font-size: 13px; margin-bottom: 4px; }
.login-note {
  font-size: 11px;
  background: var(--amber-light);
  color: #E65100;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 24px;
  display: inline-block;
}
.field { text-align: left; margin-bottom: 16px; }
.login-error {
  color: var(--red);
  font-size: 12px;
  margin-bottom: 12px;
  text-align: left;
}
</style>
