<template>
  <div>
    <div class="header">购物商城</div>
    <div class="search-wrap"><img class="search-icon" src="../../assets/search-icon.webp" alt="">
      <input class="search-input" type="search" :placeholder="placeholder" @focus="router.push('/searchPage')">
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(value, index) in swiperImgs" :key="value" @click="toGoodsDetail(index)"><img
          class="banner" :src='value.imgUrl' alt=""></van-swipe-item>
    </van-swipe>
    <van-notice-bar mode="closeable" color="#fff" background="#5a5a5a" class="notice-bar" left-icon="volume-o"
      :text="notice" />
    <div class="nav-grid">
      <a href="/" class="nav-item" v-for="image in navImgs" :key="image"><img :src="image.imgUrl" alt=""
          style="width: 50px;">
        <p>{{ image.text }}</p>
      </a>
    </div>
    <div class="main">
      <a href="/index"><img class="" :src="mainImg" alt="" style="width: 100%;"></a>
      <div id="subTitle"></div>
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
    </div>
    <footer class="footer">- 已经到底啦 -</footer>
  </div>
</template>

<script>
export default {
  name: 'indexPage'
}
</script>

<script setup>
import GoodsItem from '@/components/GoodsItem.vue';
import instance from '@/utils/request';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTagStore } from '@/stores/tag';
const tagStore = useTagStore()
const router = useRouter()
tagStore.tag_value = 0
//数据
const placeholder = ref('')
const swiperImgs = ref([])
const notice = ref('')
const navImgs = ref([])
const mainImg = ref([])
const subTitle = ref('')
const goodsList = ref([])

//轮播图跳转地址
const imgSrc = ['#/goods?id=10053', '#/goods?id=10054', '#/goods?id=10055']

//请求数据,加载首页
instance({
  url: '/page/detail',
  params: {
    pageId: 0
  }
}).then(result => {
  console.log(result);
  const items = result.data.data.pageData.items
  placeholder.value = items[0].params.placeholder
  swiperImgs.value = items[1].data
  notice.value = items[2].params.text + " 千万不要错过!"
  navImgs.value = items[3].data
  mainImg.value = items[4].data[0].imgUrl
  subTitle.value = items[5].params.content
  goodsList.value = items[6].data

  document.getElementById('subTitle').innerHTML = subTitle.value
})

function toGoodsDetail(index) {
  router.push(imgSrc[index])
}

</script>

<style scoped>
body {
  background-color: rgb(235, 235, 235);
}

.header {
  width: 100%;
  height: 35px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 35px;
  color: white;
  background-color: rgb(182, 0, 0);
}

.search-wrap {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  text-align: center;
  background-color: rgb(235, 235, 235);
}

.search-icon {
  position: absolute;
  top: 10px;
  left: 25px;
  width: 18px;
  height: 18px;
}

.search-input {
  width: 95%;
  height: 30px;
  padding-left: 30px;
  border: 0;
  border-radius: 10px;
}

.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.banner {
  width: 100%;
  height: 185px;
}

.notice-bar {
  height: 30px;
}

.nav-grid {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
}

.nav-item {
  padding: 10px 0;
  background-color: white;
  /* border: 1px solid rgb(237, 237, 237); */
  font-size: 18px;
  text-align: center;
}

.nav-item p {
  font-size: 14px;
}

.main {
  width: 100%;
}

.recommend {
  height: 50px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  border-bottom: 1px solid rgb(237, 237, 237);
}

.footer {
  height: 60px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
