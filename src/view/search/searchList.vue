<template>
  <div>
    <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="search-wrap">
      <van-icon name="search" class="search-icon" size="20" />
      <input class="search-input" type="search" v-model="search"
        @focus="router.push(`/searchPage?search=${search || ''}`)" placeholder="请输入要搜索的商品">
      <van-icon :name='list_name' size="25" class="switch-btn" @click="switch_icon()" />
    </div>
    <van-tabbar v-model="chosen" :fixed="false" active-color="red" @change="tagChange()">
      <van-tabbar-item value="all" style="font-size: 16px;">默认</van-tabbar-item>
      <van-tabbar-item value="sales" style="font-size: 16px;">销量</van-tabbar-item>
      <van-tabbar-item value="price" style="font-size: 16px;" @click="switch_price()">价格
        <i v-if="price_mode === 0">↑</i>
        <i v-if="price_mode === 1">↓</i>
      </van-tabbar-item>
    </van-tabbar>
    <GoodsItem :goods_id="item.goods_id" v-for="item in goodsList" :key="item.goods_id" :imgUrl="item.goods_image"
      :primary_price="item.line_price_min">
      <template #goods_name>
        {{ item.goods_name }}
      </template>
      <template #goods_sales>
        {{ item.goods_sales }}
      </template>
      <template #goods_price>
        ￥{{ item.goods_price_min }}
      </template>
      <template #line_price>
        ￥{{ item.line_price_min }}
      </template>
    </GoodsItem>
    <footer class="footer" style="text-align: center;">- 已经到底啦 -</footer>
  </div>
</template>

<script>
export default {
  name: 'serchList',
}
</script>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import instance from '@/utils/request';
import GoodsItem from '@/components/GoodsItem.vue';
const router = useRouter()
const route = useRoute()
const list_name = ref('list-switch')
const search = route.query.search
const goodsList = ref([])
const chosen = ref(0) //目前选择的标签
const price_mode = ref(1)//按价格排序的模式
// console.log(search);
const onClickLeft = () => history.back();

//改变按价格排序的方式
function switch_price() {
  if (chosen.value === 2) {
    if (price_mode.value === 0) price_mode.value = 1
    else price_mode.value = 0
    console.log(price_mode.value);
  }
  tagChange()
}

//改变商品排列方式(一行一条 或 网格状)
function switch_icon() {
  if (list_name.value === 'list-switch') list_name.value = 'list-switching'
  else list_name.value = 'list-switch'
}

//根据标签,改变商品排序方式
function tagChange() {
  let sortType = ''
  if (chosen.value === 0) sortType = 'all'
  else if (chosen.value === 1) sortType = 'sales'
  else if (chosen.value === 2) sortType = 'price'
  else sortType = 'all'
  console.log(sortType);

  instance({
    url: '/goods/list',
    params: {
      sortType: sortType,
      goodsName: search,
      sortPrice: price_mode.value
    }
  }).then(result => {
    console.log(result.data.data.list.data)
    goodsList.value = result.data.data.list.data
  })
}

tagChange()
</script>

<style scoped>
.search-wrap {
  position: relative;
  width: 90%;
  height: 40px;
  padding: 5px 10px;
  text-align: center;

}

.search-icon {
  position: absolute;
  top: 10px;
  left: 25px;
}

.search-input {
  width: 95%;
  height: 30px;
  padding-left: 30px;
  border: 0;
  border-radius: 10px;
  background-color: rgb(235, 235, 235);
}

.switch-btn {
  position: absolute;
  top: 7px;
  right: -15px;
}
</style>
