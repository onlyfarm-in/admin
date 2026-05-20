import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const DEFAULTS = {
  janakiFarmer: true,
  janakiBuyer: false,
  approvalGate: true,
  analytics: false,
  messaging: true,
  marketPrices: true,
}

export const useTogglesStore = defineStore('toggles', () => {
  const saved = JSON.parse(localStorage.getItem('of_toggles') || 'null')
  const state = ref({ ...DEFAULTS, ...saved })

  watch(state, (v) => localStorage.setItem('of_toggles', JSON.stringify(v)), { deep: true })

  return { state }
})
