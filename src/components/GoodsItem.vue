<template>
  <div class="goods-item">
    <a :href="url">
      <img class="goods-img" :src="imgUrl" alt="">
      <p class="gooods-desc">
        <slot name="goods_name">三星手机 SAMSUNG Galaxy S23 8GB + 256GB</slot>
      </p>
      <p class="goods-sale">已售<slot name="goods_sales">1022</slot>件</p>
      <span class="price">
        <slot name="goods_price">￥5699</slot>
      </span>
      <span class="primary-price" v-if="primary_price != '0.00'">
        <slot name="line_price">￥6699.00</slot>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  // props: {
  // imgUrl: String,
  // primary_price: String,
  //   goods_id: Number
  // },
}
</script>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
const props = defineProps({
  goods_id: Number,
  imgUrl: String,
  primary_price: String
})
const id = ref(props.goods_id)
const url = `#/goods?id=${id.value}`
</script>

<style>
.goods-item {
  width: 100%;
  height: 140px;
  padding: 10px 10px;
  margin-bottom: 10px;
  background-color: white;
}

.goods-img {
  float: left;
  width: auto;
  height: 120px;
  margin-right: 10px;
}

.gooods-desc {
  height: 40px;
  margin: 10px 0;
  font-size: 16px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.goods-sale {
  margin-bottom: 10px;
  color: rgb(126, 126, 126);
  font-size: 14px;
}

.price {
  padding-right: 10px;
  font-size: 18px;
  color: red;
}

.primary-price {
  font-size: 14px;
  color: rgb(126, 126, 126);
  text-decoration: line-through;
}
</style>
