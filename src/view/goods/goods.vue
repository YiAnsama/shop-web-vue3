<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-swipe :height="375" class="my-swipe" :autoplay="5000" indicator-color="blue">
      <van-swipe-item v-for="img in images" :key="img">
        <img :src="img" alt="" style="width: 100%;">
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
    <div class="goods_info">
      <span class="price">￥{{ goods_price }}</span>
      <span class="primary-price" v-if="line_price != '0.00'">￥{{ line_price }}</span>
      <span class="goods-sale">已售{{ goods_sales }}件</span>
      <p class="gooods-desc">
        {{ goods_name }}
      </p>
    </div>
    <van-notice-bar color="#fd8b00" background="#f6f6f6" left-icon="logistics" mode="link"
      style="height: 30px;">48小时内发货&nbsp;
      <van-icon name="free-postage" size="16" /> 全国包邮</van-notice-bar>

    <div class="comment-header" @click="toCommentPage()">商品评价({{ total }}条) <span class="check-more">查看全部＞</span></div>
    <div class="comment" v-for="item in comment_list" :key="item">
      <div class="user_line">
        <span class="userFirgure"><img class="firgure" :src="item.user.avatar || defaultImg" alt=""></span>
        <span class="userName">{{ item.user.nick_name }}</span>
        <van-rate size="3vh" v-model="item.score" color="#ffd21e" void-icon="star" void-color="#eee" allow-half
          readonly />
      </div>
      <p class="comment_content">{{ item.content }}</p>
      <div class="time">{{ item.create_time }}</div>
    </div>

    <footer class="footer" style="text-align: center;">- 已经到底啦 -</footer>
    <footer class="foot_nav">
      <div class="nav">
        <a href="/">
          <van-icon size="7vw" name="home-o" /><br>
          首页
        </a>
      </div>
      <div class="nav">
        <a href="/cart">
          <van-badge v-if="cartTotal > 0" :content="cartTotal">
            <van-icon size="7vw" name="cart-o" /><br>
          </van-badge>
          <van-icon v-else size="7vw" name="cart-o" /><br>
          购物车
        </a>
      </div>
      <van-button @click="showCart" class="vant_btn" round color="linear-gradient(to right, #ffb326, #ffa700)">
        加入购物车
      </van-button>
      <van-button @click="showBuy" class="vant_btn" round color="linear-gradient(to right, #ff6034, #ee0a24)">
        立即购买
      </van-button>
    </footer>
    <!-- 弹出加入购物车页面 -->
    <van-popup closeable v-model:show="isShowCart" position="bottom" :style="{ height: '42%' }">
      <div class="cart">
        <div class="goods-wrap">
          <div class="title">加入购物车</div>
          <img class="pre-img" :src="image" alt="">
          <p class="goods-price">￥{{ goods_price }}</p>
          <p class="goods_stock">库存{{ stock_total }}件</p>
        </div>
        <div class="counter-wrap">
          <span>数量</span>
          <div class="counter">
            <button class="counter-left" @click="minus">-</button>
            <span class="count">{{ goods_count }}</span>
            <button class="counter-right" @click="plus">+</button>
          </div>
        </div>
        <div class="cart-btn-wrap">
          <van-button @click="addCart" class="cart_btn" round color="linear-gradient(to right, #ffb326, #ffa700)">
            加入购物车
          </van-button>
        </div>
      </div>

    </van-popup>
    <!-- 弹出购买页面 -->
    <van-popup closeable v-model:show="isShowBuy" position="bottom" :style="{ height: '42%' }">
      <div class="cart">
        <div class="goods-wrap">
          <div class="title">立即购买</div>
          <img class="pre-img" :src="image" alt="">
          <p class="goods-price">￥{{ goods_price }}</p>
          <p class="goods_stock">库存{{ stock_total }}件</p>
        </div>
        <div class="counter-wrap">
          <span>数量</span>
          <div class="counter">
            <button class="counter-left" @click="minus_buy">-</button>
            <span class="count">{{ goods_count_buy }}</span>
            <button class="counter-right" @click="plus_buy">+</button>
          </div>
        </div>
        <div class="cart-btn-wrap">
          <van-button @click="buy" class="cart_btn" round color="linear-gradient(to right, #ff6034, #ee0a24)">
            立即购买
          </van-button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
export default {
  name: 'goodsPage'
}
</script>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import defaultImg from '@/assets/default-avatar.png'
import instance from '@/utils/request';
import { useUserStore } from '@/stores/user';
import { showConfirmDialog } from 'vant';
import { showToast } from 'vant';
import { getInfo } from '@/utils/storage';
// import { toRaw } from 'vue';

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const id = route.query.id
console.log(id);

const isShowCart = ref(false)
const isShowBuy = ref(false)
const image = ref('')
const images = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
])
const stock_total = ref(0)
const goods_name = ref('')
const goods_price = ref('')
const line_price = ref('')
const goods_sales = ref(0)

const total = ref(0)
const comment_list = ref([])
const cartTotal = ref(0)

const showCart = () => isShowCart.value = true
const showBuy = () => isShowBuy.value = true
const onClickLeft = () => history.back()
const toCommentPage = () => router.push(`/comment?id=${id}`)

//计数器
const goods_count = ref(1)
const minus = () => {
  if (goods_count.value >= 2) goods_count.value -= 1
}
const plus = () => goods_count.value += 1

const goods_count_buy = ref(1)
const minus_buy = () => {
  if (goods_count_buy.value >= 2) goods_count.value -= 1
}
const plus_buy = () => goods_count_buy.value += 1

function showConfirm() {
  showConfirmDialog({
    title: '还未登录',
    message:
      '登陆后才可继续,是否前往登录',
    confirmButtonColor: 'red',
    confirmButtonText: '前往登录',
    cancelButtonText: '再逛逛'
  })
    .then(() => {
      // on confirm
      router.replace({
        path: '/login',
        query: {
          backUrl: route.fullPath
        }
      })
    })
    .catch(() => {
      // on cancel
    });
}

function addCart() {
  userStore.token = getInfo().token
  const goods_id = id
  const count = goods_count.value
  // console.log(goods_id, count);

  if (!userStore.token) {
    //用户未登录
    showConfirm()
    return
  }
  //已经登录
  instance({
    url: '/cart/add',
    method: 'post',
    // headers: { 'Access-Token': userStore.token, 'platform': 'H5' },
    data: {
      goodsId: goods_id,
      goodsNum: count,
      goodsSkuId: '0'
    }
  }).then(result => {
    // console.log(result);
    cartTotal.value = result.data.data.cartTotal
    console.log(cartTotal.value);

    showToast('加入成功');
  })

}
//获取商品详情
instance({
  url: '/goods/detail',
  params: {
    goodsId: id
  }
}).then(result => {
  console.log(result.data.data.detail);
  const detail = result.data.data.detail
  image.value = detail.goods_images.map((ele) => ele.preview_url)[0]
  images.value = detail.goods_images.map((ele) => ele.external_url)
  goods_name.value = detail.goods_name
  goods_price.value = detail.goods_price_min
  line_price.value = detail.line_price_max
  goods_sales.value = detail.goods_sales
  stock_total.value = detail.stock_total
})

//获取部分评价
instance({
  url: '/comment/listRows',
  params: {
    goodsId: id,
    limit: 5
  }
}).then(result => {
  console.log(result);
  const data = result.data.data
  total.value = data.total
  comment_list.value = data.list
})
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fd8b00;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.custom-indicator {
  color: #ffb326;
  width: 12vw;
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 4vw;
  text-align: center;
  border-radius: 2vh;
  background: rgba(0, 0, 0, 0.15);
}

.goods_info {
  padding: 10px;
}

.gooods-desc {
  height: 40px;
  margin: 10px 0;
  font-size: 16px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.goods-sale {
  float: right;
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

.foot_nav {
  width: 100%;
  height: 52px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  padding: 5px;
  border-top: 1px solid rgb(193, 193, 193);
  background-color: white;
}

.nav {
  display: inline-block;
  text-align: center;
  width: 45px;
  height: auto;
  margin: 0 3px;
  font-size: 14px;
}

.vant_btn {
  width: 110px;
  height: 35px;
}

.footer {
  height: 60px;
  text-align: center;
  margin-bottom: 10px;
}

.comment-header {
  width: 100%;
  height: 6vh;
  padding: 2vw;
  border-bottom: 1px solid rgb(246, 246, 246);
}

.check-more {
  float: right;
  color: grey;
}

.comment {
  width: 100%;
  height: 17vh;
  padding: 2vw;
  border-bottom: 1px solid rgb(246, 246, 246);
}

.user_line {
  display: flex;
  height: 5vh;
  padding: 0 1vw;
  align-items: center;
  justify-content: left;
}

.userFirgure,
.firgure {
  display: inline-block;
  height: 4vh;
  border-radius: 2.5vh;
}

.userFirgure,
.userName {
  margin-right: 3vw;
}

.comment_content {
  padding: 2vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  padding-left: 2vw;
  font-size: 15px;
  color: grey;
}

.cart {
  padding: 10px;
}

.goods-wrap {
  height: 150px;
}

.title {
  font-size: 17px;
  text-align: center;
}

.pre-img {
  float: left;
  width: 120px;
  height: 120px;
}

.goods-price {
  font-size: 20px;
  color: orange;
  margin: 10px;
}

.goods_stock {
  color: rgb(50, 50, 50)
}

.counter-wrap {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
}

.cart-btn-wrap {
  text-align: center;
}

.cart_btn {
  margin-top: 10px;
  width: 325px;
  height: 35px;
}

.counter {
  height: 25px;
  padding: 5px 0;
  border-radius: 3px;
  background-color: rgb(235, 235, 235);
}

.counter-left,
.counter-right {
  width: 35px;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
}

.count {
  display: inline-block;
  text-align: center;
  width: 25px;
}

.counter-left {
  border-right: 1px solid rgb(208, 208, 208);
}

.counter-right {
  border-left: 1px solid rgb(208, 208, 208);
}
</style>
