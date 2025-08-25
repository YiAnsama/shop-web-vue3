import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const count = ref(0)
  const total_price = ref(0)
  return { cartList, count, total_price }
})
