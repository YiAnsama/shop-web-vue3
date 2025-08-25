import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userId = ref(0)
  return { token, userId }
})
