import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGoodsListStore = defineStore('goodsList', () => {
  const goodsList = ref([])
  const goodsId = ref('')
  const goodsNum = ref('')
  const goodsSkuId = ref('')
  const cartIds = ref('')
  return { goodsList, goodsId, goodsNum, goodsSkuId, cartIds }
})
