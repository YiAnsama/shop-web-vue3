import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tag', () => {
  const tag_value = ref(0)
  return { tag_value }
})
