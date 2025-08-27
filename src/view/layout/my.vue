<template>
  <div>
    <div class="header" v-if="token != ''">
      <img :src="avatar" class="avatar" @click="changeAvatar" />
      <div class="user-info">
        <p>{{ nick_name }}</p>
        <span class="member"><van-icon name="gem-o" />普通会员</span>
      </div>
    </div>

    <div class="header" v-else>
      <img :src="defaultAvatar" class="avatar" @click="router.push('/login')" />
      <div class="user-info" @click="router.push('/login')">
        <p>点击登录</p>
      </div>
    </div>

    <div class="blance-bar" v-if="token != ''">
      <div class="item">
        <div class="item-top">{{ balance }}</div>
        账户余额
      </div>
      <div class="item">
        <div class="item-top">0</div>
        积分
      </div>
      <div class="item">
        <div class="item-top">0</div>
        优惠券
      </div>
      <div class="item">
        <div><van-icon name="paid" size="25" /></div>
        我的钱包
      </div>
    </div>
    <div class="blance-bar" v-else>
      <div class="item">
        <div class="item-top">0</div>
        账户余额
      </div>
      <div class="item">
        <div class="item-top">0</div>
        积分
      </div>
      <div class="item">
        <div class="item-top">0</div>
        优惠券
      </div>
      <div class="item">
        <div><van-icon name="paid" size="25" /></div>
        我的钱包
      </div>
    </div>

    <div class="order-bar" v-if="token != ''">
      <div class="item" @click="router.push('/order')">
        <van-badge :content="all" v-if="all != 0">
          <div><van-icon name="balance-list-o" size="25" /></div>
        </van-badge>
        <div v-else><van-icon name="balance-list-o" size="25" /></div>
        <div>全部订单</div>
      </div>

      <div class="item" @click="router.push('#/order?active=1')">
        <van-badge :content="payment" v-if="payment != 0">
          <div><van-icon name="clock-o" size="25" /></div>
        </van-badge>
        <div v-else><van-icon name="clock-o" size="25" /></div>
        <div>待支付</div>

      </div>
      <div class="item" @click="router.push('#/order?active=2')">
        <van-badge :content="delivery" v-if="delivery != 0">
          <div><van-icon name="logistics" size="25" /></div>
        </van-badge>
        <div v-else><van-icon name="logistics" size="25" /></div>
        <div>待发货</div>

      </div>
      <div class="item" @click="router.push('#/order?active=3')">
        <van-badge :content="received" v-if="received != 0">
          <div><van-icon name="send-gift-o" size="25" /></div>
        </van-badge>
        <div v-else><van-icon name="send-gift-o" size="25" /></div>
        <div>待收货</div>
      </div>
      <div class="item" @click="router.push('#/order?active=4')">
        <van-badge :content="refund" v-if="refund != 0">
          <div><van-icon name="comment-o" size="25" /></div>
        </van-badge>
        <div v-else><van-icon name="comment-o" size="25" /></div>
        <div>待评价</div>
      </div>
    </div>
    <div class="service-bar-wrap" v-if="token != ''">
      <div class="service-title">我的服务</div>
      <div class="service-bar">
        <div class="service-item">
          <div><van-icon name="records-o" size="25" style="color:rgb(232, 0, 0);" /></div>
          收货地址
        </div>
        <div class="service-item">
          <div><van-icon name="point-gift-o" size="25" style="color:rgb(232, 0, 0);" /></div>
          领券中心
        </div>
        <div class="service-item">
          <div><van-icon name="coupon-o" size="25" style="color:rgb(232, 0, 0);" /></div>
          优惠券
        </div>
        <div class="service-item">
          <div><van-icon name="question-o" size="25" style="color:rgb(232, 0, 0);" /></div>
          帮助中心
        </div>
        <div class="service-item">
          <div><van-icon name="gold-coin-o" size="25" style="color:rgb(232, 0, 0);" /></div>
          退换/售后
        </div>
        <div class="service-item">
          <div><van-icon name="balance-o" size="25" style="color:rgb(232, 0, 0);" /></div>
          我的积分
        </div>
      </div>
    </div>
    <div style="text-align: center;" v-if="token != ''">
      <button class="switch-btn" @click="router.push('/login')">切换账号</button>
      <button class="exit-btn" @click="logOut">退出登录</button>
    </div>
    <div style="height: 50px;background-color: white;"></div>
  </div>
</template>

<script>
export default {
  name: 'myPage'
}
</script>
<script setup>
import { ref } from 'vue';
import defaultAvatar from '@/assets/default-avatar.png'
import { useTagStore } from '@/stores/tag';
import instance from '@/utils/request';
import router from '@/router';
import { showConfirmDialog } from 'vant';
const tag = useTagStore()
tag.tag_value = 3

const avatar = ref()
const nick_name = ref('')
const balance = ref(0)
const coupon = ref(0)
const points = ref(0)
const delivery = ref(0)
const payment = ref(0)
const received = ref(0)
const refund = ref(0)
const all = ref(0)

//登录凭证
const token = JSON.parse(localStorage.getItem('shopping_user_info')) || ''
console.log(token);

function changeAvatar() {

}



if (token != '') {
  //获取用户信息
  instance({
    url: '/user/info',
  }).then(result => {
    console.log(result.data.data.userInfo);
    const userInfo = result.data.data.userInfo
    balance.value = userInfo.balance
    nick_name.value = userInfo.nick_name
    avatar.value = userInfo.avatar || defaultAvatar
  })


  //获取余额,积分,优惠券
  instance({
    url: '/user/assets',
  }).then(result => {
    console.log(result);
    const assets = result.data.data.assets
    balance.value = assets.balance
    coupon.value = assets.coupon
    points.value = assets.points
  })

  //获取商品状态数量
  instance({
    url: '/order/todoCounts'
  }).then(result => {
    console.log(result);
    const counts = result.data.data.counts
    payment.value = counts.payment
    delivery.value = counts.delivery
    received.value = counts.received
    refund.value = counts.refund
    all.value = counts.payment + counts.delivery + counts.received + counts.refund
  })
}

function logOut() {
  showConfirmDialog({
    title: '退出登录',
    message:
      '确认退出登录吗?',
    confirmButtonColor: "red"
  })
    .then(() => {
      // on confirm
      localStorage.removeItem('shopping_user_info')
      localStorage.removeItem('cartIds')
      localStorage.removeItem('goodsList')
      location.reload()
    })
    .catch(() => {
      // on cancel
    });
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 10px;
  align-items: center;
  height: 25vh;
  background-color: rgb(251, 239, 225);
}

.avatar {
  width: 10vh;
  height: 10vh;
  margin-right: 15px;
  border-radius: 5vh;
}

.user-info {
  font-size: 20px;
  color: rgb(228, 159, 116);
}

.member {
  font-size: 18px;
  padding: 3px;
  color: rgb(158, 116, 67);
  background-color: black;
  border-radius: 5px;
}

.blance-bar {
  height: 18vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
}

.item {
  text-align: center;
}

.item-top {
  color: rgb(255, 51, 0);
  padding-bottom: 3px;
}

.order-bar {
  height: 18vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  border-radius: 10px;
  background-color: white;
}

.service-bar-wrap {
  background-color: white;
  margin: 10px;
  padding-bottom: 5px;
  border-radius: 10px;
}

.service-title {
  padding: 10px;
}

.service-bar {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  /* margin: 10px; */
  background-color: white;
}

.service-item {
  text-align: center;
  padding: 5px;
}

.switch-btn,
.exit-btn {
  text-align: center;
  padding: 5px 12vw;
  margin: 0 2vw 1vw 2vw;
  /* border: 1px solid grey; */
  border: 0;
  border-radius: 10px;
  background-color: white;
}

.switch-btn {
  color: rgb(240, 0, 0);
}
</style>
