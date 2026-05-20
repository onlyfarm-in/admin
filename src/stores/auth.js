import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const MOCK_PASS = 'onlyfarm2026'

  function login(passphrase) {
    if (passphrase === MOCK_PASS) {
      isLoggedIn.value = true
      return true
    }
    return false
  }

  function logout() {
    isLoggedIn.value = false
  }

  return { isLoggedIn, login, logout }
})
