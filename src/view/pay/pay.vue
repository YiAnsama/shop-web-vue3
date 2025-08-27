<template>
  <div>
    <van-nav-bar title="订单结算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="address-bar" @click="toAddress">
      <van-icon name="logistics" />
      <div class="address-info">
        <div>
          <span style="padding-right: 10px;">{{ address.name }}</span>
          <span>{{ address.phone }}</span>
        </div>
        <div>
          <span>{{ address.region.province + " " + address.region.city + " " + address.region.region + " " + address.detail }}</span>
        </div>
      </div>
      <span style="font-size: 20px;">＞</span>
    </div>
    <div class="cart-item-wrap">
      <div class="cart-item" v-for="item in goodsList" :key="item.goods_id">
        <img class="goods-img" :src="item.goods_image" alt="">
        <p class='goods-name'>{{ item.goods_name }}</p>
        <span class="goods-price">￥{{ item.total_price * item.total_num }}</span>

        <div class="counter">
          <span class="count"> x{{ item.total_num }}</span>
        </div>
      </div>
      <div class="cart-item-footer">共{{ count }}件商品 , 总价: <span class="price"> ￥{{ total }}</span></div>
    </div>
    <div class="fee-wrap" @click="showDiscount">优惠券:<span class='fee'>-￥0</span><i class="icon">＞</i></div>
    <div class="fee-wrap">配送费:<span class="fee">￥0</span></div>
    <div class="fee-wrap">支付方式:</div>
    <div class="fee-wrap"><van-icon name="balance-o" />余额支付(可用￥{{ balance }}元)</div>
    <van-popup closeable round v-model:show="showBottom" position="bottom" :style="{ height: '40%' }">
      <div class="discount-item">暂无优惠券</div>
    </van-popup>

    <van-submit-bar class="submit-bar" :price="total * 100" button-text="支付订单" @submit="onSubmit" />
  </div>
  <footer class="footer"></footer>
</template>

<script>
export default {
  name: 'payPage'
}
</script>

<script setup>
import instance from '@/utils/request';
import { showToast } from 'vant';
import { computed, ref } from 'vue';
// import { showToast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { useGoodsListStore } from '@/stores/goodsList';
import { showNotify } from 'vant';
const goodsListStore = useGoodsListStore()
const route = useRoute()
const router = useRouter()
const showBottom = ref(false)
// const cartIds = ref()
const goodsList = ref([])
const address = ref()
const balance = ref(0)
const cartIds = ref('')

//获取用户余额
instance({
  url: '/user/assets'
}).then(result => {
  console.log(result);
  balance.value = result.data.data.assets.balance
})

//获取订单信息,渲染到界面
goodsListStore.cartIds = JSON.parse(localStorage.getItem('cartIds'))
goodsListStore.goodsList = JSON.parse(localStorage.getItem('goodsList'))
goodsList.value = goodsListStore.goodsList
cartIds.value = goodsListStore.cartIds

//获取地址信息,渲染到界面
instance({
  url: '/address/list'
}).then(result => {
  console.log(result);
  address.value = result.data.data.list[result.data.data.list.length - 1]
})

const onClickLeft = () => router.back();
const onSubmit = () => {
  const mode = route.query.mode
  console.log(mode);
  if (mode === 'buyNow') {
    instance({
      url: '/checkout/submit',
      method: 'post',
      data: {
        mode: 'buyNow',
        delivery: "10",
        payType: 10,
        couponId: 0,
        isUsePoints: 0,
        remark: "",
        goodsId: goodsList.value[0].goods_id,
        goodsNum: goodsList.value[0].total_num,
        goodsSkuId: goodsList.value[0].goods_sku_id
      }
    }).then(result => {
      console.log(result);
      // showToast('购买成功')
      showNotify({ type: 'success', message: '购买成功' })
      router.replace('/order')
    })
  }
  else if (mode === 'cart') {
    console.log(cartIds.value);

    instance({
      url: '/checkout/submit',
      method: 'post',
      data: {
        mode: "cart",
        delivery: "10",
        payType: 10,
        couponId: 0,
        isUsePoints: 0,
        remark: "",
        cartIds: cartIds.value
      }
    }).then(result => {
      console.log(result);
      // showToast('购买成功')
      showNotify({ type: 'success', message: '购买成功' })
      router.replace('/order')
    })
  }
}

// const address = JSON.parse(localStorage.getItem('chosenAddress'))
const count = computed(() => {
  let total_count = 0
  goodsList.value.forEach(ele => {
    total_count += ele.total_num
  })
  return total_count
})
const total = computed(() => {
  let total_price = 0
  goodsList.value.forEach(ele => {
    total_price += ele.total_price * ele.total_num
  })
  return total_price
})

function toAddress() {
  showToast('抱歉,此功能还待完善')
  // router.push('/address')
}

function showDiscount() {
  showBottom.value = true
}
</script>

<style scoped>
body {
  background-color: rgb(240, 240, 240);
}

.submit-bar {
  border-top: 1px solid rgb(208, 208, 208);
}

.address-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(230, 230, 230);
}

.address-info {
  width: 75vw;
  padding: 10px;
}

.cart-item-wrap {
  border-bottom: 1px solid rgb(224, 224, 224);
}

.cart-item {
  position: relative;
  height: 120px;
  padding: 5px;
  padding-right: 15px;
  display: flex;
  margin: 5px 10px;
  border-radius: 15px 15px 0 0;
  position: relative;
  align-items: center;
  background-color: white;
  /* border-bottom: 1px solid rgb(228, 228, 228); */
}

.cart-item-footer {
  padding: 10px;
  text-align: right;
}

.price {
  color: red;
  font-size: 20px;
}

.fee-wrap {
  padding: 6px;
}

.fee {
  padding-right: 20px;
  float: right;
  color: red;
  font-size: 18px;
}

.icon {
  position: absolute;
  right: 5px;
  font-size: 18px;
}

.checkbox-wrap {
  /* width: 100%; */
  display: flex;
  height: 100%;
  align-items: center;
}

/*复选框未勾选前的样式*/
input[type="checkbox"] {
  appearance: none;
  /*取消默认的复选框样式*/
  /*重新写一个复选框圆角样式*/
  width: 20px;
  /*设置方形宽度为20px*/
  height: 20px;
  /*设置方形高度为20px*/
  border: 1px solid #aaaaaa;
  /*设置边框样式*/
  border-radius: 50%;
  /*将方形的边框改为圆形*/
}

/*复选框选择后的样式*/
input[type="checkbox"]:checked {
  transition: all 0.3s;
  background-image: url(../../assets/checked.png);
  /*复选框选中后添加背景图片*/
  background-repeat: no-repeat;
  /*取消背景图片平铺*/
  background-size: 27px 27px;
  /*背景图片大小,第一个27px表示width宽度,第二个27px表示height高度*/
  background-position: center;
  /*背景图居中对齐*/
}

.goods-img {
  width: 110px;
  height: 110px;
  margin: 0 5px;
}

.goods-name {
  align-self: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.goods-price {
  position: absolute;
  top: 80px;
  left: 70vw;
  font-size: 20px;
  color: red;
}

.counter {
  position: absolute;
  top: 80px;
  left: 35vw;
  height: 25px;
  padding: 5px 0;
  border-radius: 3px;
}

.count {
  display: inline-block;
  text-align: center;
  width: 25px;
  font-size: 19px;
  color: rgb(24, 24, 24);
}

.counter-left {
  border-right: 1px solid rgb(208, 208, 208);
}

.counter-right {
  border-left: 1px solid rgb(208, 208, 208);
}

.footer {
  height: 50px;
  text-align: center;
  margin-bottom: 10px;
}

.discount-item {
  padding: 8px;
  text-align: center;
}
</style>
