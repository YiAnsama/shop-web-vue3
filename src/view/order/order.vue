<template>
  <div>
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model:active="active" color="red" animated @click-tab="getOrderInfo">
      <van-tab title="全部">
        <div class="background">
          <div class="order-item-wrap" v-for="(order, index) in orderList" :key="order.order_id">
            <div class="state-line"><span>{{ order.pay_time }}</span><span
                style="color: orange;">{{ order.state_text }}</span></div>
            <div class="cart-item" v-for="item in order.goods" :key="item.goods_id">
              <img class="goods-img" :src="item.goods_image" alt="">
              <p class='goods-name'>{{ item.goods_name }}</p>
              <span class="goods-price">￥{{ item.total_price }}</span>

              <div class="counter">
                <span class="count"> x{{ item.total_num }}</span>
              </div>
            </div>
            <div class="cart-item-footer">共{{ getCount(index) }}件商品 , 总价: <span class="price"> ￥{{ order.total_price
            }}</span>
            </div>
            <div style="text-align: right;">
              <button v-if="order.state_text === '待支付'" class="cancel-btn"
                @click="cancelOrder(order.order_id)">取消订单</button>
              <button v-else-if="order.state_text === '待取消'" class="cancel-btn"
                @click="showToast('订单处理中...')">处理中...</button>
              <button v-else class="cancel-btn" @click="cancelOrder(order.order_id)">申请退款</button>
              <button v-if="order.state_text === '待收货'" class="cancel-btn"
                @click="confirm(order.order_id)">确认收货</button>
              <button v-if="order.state_text === '待评价'" class="cancel-btn"
                @click="comment(order.order_id)">前往评价</button>
            </div>
          </div>
        </div>
        <van-empty v-if="orderList.length === 0" description="您没有相关的订单信息" />
      </van-tab>
      <van-tab title="待支付">
        <div class="background">
          <div class="order-item-wrap" v-for="(order, index) in orderList" :key="order.order_id">
            <div class="state-line"><span>{{ order.pay_time }}</span><span
                style="color: orange;">{{ order.state_text }}</span></div>
            <div class="cart-item" v-for="item in order.goods" :key="item.goods_id">
              <img class="goods-img" :src="item.goods_image" alt="">
              <p class='goods-name'>{{ item.goods_name }}</p>
              <span class="goods-price">￥{{ item.total_price }}</span>

              <div class="counter">
                <span class="count"> x{{ item.total_num }}</span>
              </div>
            </div>
            <div class="cart-item-footer">共{{ getCount(index) }}件商品 , 总价: <span class="price"> ￥{{ order.total_price
            }}</span>
            </div>
            <div style="text-align: right;">
              <button v-if="order.state_text === '待支付'" class="cancel-btn"
                @click="cancelOrder(order.order_id)">取消订单</button>
              <button v-else-if="order.state_text === '待取消'" class="cancel-btn"
                @click="showToast('订单处理中...')">处理中...</button>
              <button v-else class="cancel-btn" @click="cancelOrder(order.order_id)">申请退款</button>
              <button v-if="order.state_text === '待收货'" class="cancel-btn"
                @click="confirm(order.order_id)">确认收货</button>
              <button v-if="order.state_text === '待评价'" class="cancel-btn"
                @click="comment(order.order_id)">前往评价</button>
            </div>
          </div>
        </div>
        <van-empty v-if="orderList.length === 0" description="您没有相关的订单信息" />
      </van-tab>
      <van-tab title="待发货">
        <div class="background">
          <div class="order-item-wrap" v-for="(order, index) in orderList" :key="order.order_id">
            <div class="state-line"><span>{{ order.pay_time }}</span><span
                style="color: orange;">{{ order.state_text }}</span></div>
            <div class="cart-item" v-for="item in order.goods" :key="item.goods_id">
              <img class="goods-img" :src="item.goods_image" alt="">
              <p class='goods-name'>{{ item.goods_name }}</p>
              <span class="goods-price">￥{{ item.total_price }}</span>

              <div class="counter">
                <span class="count"> x{{ item.total_num }}</span>
              </div>
            </div>
            <div class="cart-item-footer">共{{ getCount(index) }}件商品 , 总价: <span class="price"> ￥{{ order.total_price
            }}</span>
            </div>
            <div style="text-align: right;">
              <button v-if="order.state_text === '待支付'" class="cancel-btn"
                @click="cancelOrder(order.order_id)">取消订单</button>
              <button v-else-if="order.state_text === '待取消'" class="cancel-btn"
                @click="showToast('订单处理中...')">处理中...</button>
              <button v-else class="cancel-btn" @click="cancelOrder(order.order_id)">申请退款</button>
              <button v-if="order.state_text === '待收货'" class="cancel-btn"
                @click="confirm(order.order_id)">确认收货</button>
              <button v-if="order.state_text === '待评价'" class="cancel-btn"
                @click="comment(order.order_id)">前往评价</button>
            </div>
          </div>
        </div>
        <van-empty v-if="orderList.length === 0" description="您没有相关的订单信息" />
      </van-tab>
      <van-tab title="待收货">
        <div class="background">
          <div class="order-item-wrap" v-for="(order, index) in orderList" :key="order.order_id">
            <div class="state-line"><span>{{ order.pay_time }}</span><span
                style="color: orange;">{{ order.state_text }}</span></div>
            <div class="cart-item" v-for="item in order.goods" :key="item.goods_id">
              <img class="goods-img" :src="item.goods_image" alt="">
              <p class='goods-name'>{{ item.goods_name }}</p>
              <span class="goods-price">￥{{ item.total_price }}</span>

              <div class="counter">
                <span class="count"> x{{ item.total_num }}</span>
              </div>
            </div>
            <div class="cart-item-footer">共{{ getCount(index) }}件商品 , 总价: <span class="price"> ￥{{ order.total_price
            }}</span>
            </div>
            <div style="text-align: right;">
              <button v-if="order.state_text === '待支付'" class="cancel-btn"
                @click="cancelOrder(order.order_id)">取消订单</button>
              <button v-else-if="order.state_text === '待取消'" class="cancel-btn"
                @click="showToast('订单处理中...')">处理中...</button>
              <button v-else class="cancel-btn" @click="cancelOrder(order.order_id)">申请退款</button>
              <button v-if="order.state_text === '待收货'" class="cancel-btn"
                @click="confirm(order.order_id)">确认收货</button>
              <button v-if="order.state_text === '待评价'" class="cancel-btn"
                @click="comment(order.order_id)">前往评价</button>
            </div>
          </div>
        </div>
        <van-empty v-if="orderList.length === 0" description="您没有相关的订单信息" />
      </van-tab>
      <van-tab title="待评价">
        <div class="background">
          <div class="order-item-wrap" v-for="(order, index) in orderList" :key="order.order_id">
            <div class="state-line"><span>{{ order.pay_time }}</span><span
                style="color: orange;">{{ order.state_text }}</span></div>
            <div class="cart-item" v-for="item in order.goods" :key="item.goods_id">
              <img class="goods-img" :src="item.goods_image" alt="">
              <p class='goods-name'>{{ item.goods_name }}</p>
              <span class="goods-price">￥{{ item.total_price }}</span>

              <div class="counter">
                <span class="count"> x{{ item.total_num }}</span>
              </div>
            </div>
            <div class="cart-item-footer">共{{ getCount(index) }}件商品 , 总价: <span class="price"> ￥{{ order.total_price
            }}</span>
            </div>
            <div style="text-align: right;">
              <button v-if="order.state_text === '待支付'" class="cancel-btn"
                @click="cancelOrder(order.order_id)">取消订单</button>
              <button v-else-if="order.state_text === '待取消'" class="cancel-btn"
                @click="showToast('订单处理中...')">处理中...</button>
              <button v-else class="cancel-btn" @click="cancelOrder(order.order_id)">申请退款</button>
              <button v-if="order.state_text === '待收货'" class="cancel-btn"
                @click="confirm(order.order_id)">确认收货</button>
              <button v-if="order.state_text === '待评价'" class="cancel-btn"
                @click="comment(order.order_id)">前往评价</button>
            </div>
          </div>
        </div>
        <van-empty v-if="orderList.length === 0" description="您没有相关的订单信息" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'orderPage'
}
</script>

<script setup>
import instance from '@/utils/request';
import { ref } from 'vue';
import { showToast } from 'vant';
import { showConfirmDialog } from 'vant';
import { useRoute } from 'vue-router';
const route = useRoute()
const active = ref(0);

const orderList = ref([])
function getCount(index) {
  let total = 0
  orderList.value[index].goods.forEach(ele => total += ele.total_num)
  return total
}

const onClickLeft = () => history.back();

//获取订单信息
active.value = parseInt(route.query.active) || 0
getOrderInfo()
// instance({
//   url: '/order/list',
//   params: {
//     dataType: 'all',
//     page: '1',
//   }
// }).then(result => {
//   console.log(result.data.data.list.data);
//   orderList.value = result.data.data.list.data
// })

//切换tab时,获取不同的订单数据
function getOrderInfo() {
  let dataType = ''
  // showToast(title)
  switch (active.value) {
    case 0:
      dataType = 'all'
      break
    case 1:
      dataType = 'payment'
      break
    case 2:
      dataType = 'delivery'
      break
    case 3:
      dataType = 'received'
      break
    case 4:
      dataType = 'comment'
      break
  }
  instance({
    url: '/order/list',
    params: {
      dataType: dataType,
      page: '1',
    }
  }).then(result => {
    console.log(result.data.data.list.data);
    orderList.value = result.data.data.list.data
  })

}

function cancelOrder(id) {
  showConfirmDialog({
    title: '订单取消',
    message:
      '确认取消订单吗?',
    confirmButtonColor: 'red',
    confirmButtonText: '确认取消',
    cancelButtonText: '再想想'

  })
    .then(() => {
      // on confirm
      instance({
        url: '/order/cancel',
        method: 'post',
        data: {
          orderId: id
        }
      }).then(result => {
        console.log(result);
        showToast(result.data.message)
        getOrderInfo()
      })
    })
    .catch(() => {
      // on cancel
    });

}

function confirm(id) {
  showConfirmDialog({
    title: '确认收货',
    message:
      '确认已经收到货了吗?',
    confirmButtonColor: 'red',
    confirmButtonText: '确认收到',
    cancelButtonText: '还没有'

  })
    .then(() => {
      // on confirm
      instance({
        url: '/order/receipt',
        method: 'post',
        data: {
          orderId: id
        }
      }).then(result => {
        console.log(result);
        showToast(result.data.message)
        getOrderInfo()
      })
    })
    .catch(() => {
      // on cancel
    });
}

</script>

<style scoped>
.background {
  padding: 5px;
  background-color: rgb(245, 245, 245);
}

.order-item-wrap {
  position: relative;
  margin: 5px 5px;
  border-radius: 10px;
  background-color: white;
}

.state-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.cart-item {
  position: relative;
  height: 120px;
  padding: 5px;
  display: flex;
  margin: 0 5px;
  border-radius: 15px 15px 0 0;
  position: relative;
  align-items: center;
  background-color: white;
  /* border-bottom: 1px solid rgb(228, 228, 228); */
}

.cart-item-footer {
  padding: 0px 5px 8px 5px;
  text-align: right;
}

.cancel-btn {
  padding: 1px 5px;
  margin: 5px 8px;
  border: 1px solid rgb(179, 178, 178);
  border-radius: 5px;
  background-color: white;
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
  top: 82px;
  left: 65vw;
  font-size: 18px;
  color: black;
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
  font-size: 18px;
  color: grey;
}
</style>
