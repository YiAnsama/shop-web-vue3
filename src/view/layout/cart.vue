<template>
  <div>
    <van-nav-bar title="购物车" />
    <div class="cart-title">
      <span>共
        <span style="color: red;">{{ cartTotal }}</span>
        件商品</span>
      <span v-show="!isShowEdit" @click="switchEdit"><van-icon size="18" name="edit" />编辑</span>
      <span v-show="isShowEdit" @click="switchEdit">完成</span>
    </div>
    <div v-if="cartList.length === 0">
      <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="90"
        description="购物车空空如也" style="background-color: white;" />
    </div>
    <div class="cart-item" v-for="(item, index) in cartList" :key="item.id">
      <van-icon v-if="isShowEdit" :size="19" color="red" name="delete-o" @click="delCart(item.id)" class="delBtb" />
      <label class="checkbox-wrap"><input name="checkbox" type="checkbox" @change="isSelectAll"></label>
      <img class="goods-img" :src="item.goods.goods_image" alt="">
      <p class='goods-name'>{{ item.goods.goods_name }}</p>
      <span class="goods-price">￥{{ item.goods.goods_price_min }}</span>

      <div class="counter">
        <button class="counter-left"
          @click="minus(item.goods_num, index), setCart(item.goods_id, item.goods_num)">-</button>
        <span class="count">{{ item.goods_num }}</span>
        <button class="counter-right"
          @click="plus(item.goods_num, index), setCart(item.goods_id, item.goods_num)">+</button>
      </div>
    </div>
    <footer v-if="cartList.length !== 0" class="footer">- 已经到底啦 -</footer>
    <div class="settle-line">
      <div style="display: flex; align-items: center;"><input name="selectAll" type="checkbox" id="selectAll"
          @click="selectAll" style="margin-right: 5px;"><label for="selectAll">全选</label></div>
      <div class="settle-left-wrap">
        合计:
        <span class="total-price">￥{{ totalPrice }}</span>
        <van-button v-if="!isShowEdit" class="settle-btn" round color="#dd4c32ff" @click="toPay">结算({{
          selectCount }})</van-button>
        <van-button v-if="isShowEdit" class="del-btn" round color="#e30000" @click="delCarts">删除({{ selectCount
        }})</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartPage'
}
</script>
<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useTagStore } from '@/stores/tag';
import instance from '@/utils/request';
import { showConfirmDialog, showToast } from 'vant';
import router from '@/router';
import { useGoodsListStore } from '@/stores/goodsList';

const goodsListStore = useGoodsListStore()
const tag = useTagStore()
tag.tag_value = 2

const isShowEdit = ref(false)
const cartTotal = ref(0)
const cartList = ref([])
const checkboxes = ref([])
const selectAllBox = ref()
const totalPrice = ref(0)
const selectCount = ref(0)

function switchEdit() {
  isShowEdit.value = !isShowEdit.value
}

function toPay() {
  if (selectCount.value) {
    const checkedGoods = []
    const isCheckdeList = JSON.parse(localStorage.getItem('isCheckdeList'))
    isCheckdeList.forEach((ele, index) => {
      if (ele) {
        checkedGoods.push(cartList.value[index])
      }
    })
    // localStorage.setItem('checkedGoods', JSON.stringify(checkedGoods))
    //提交订单
    const cartIds = checkedGoods.map(ele => ele.id).join(',')
    instance({
      url: '/checkout/order',
      // method: 'post',
      params: {
        mode: "cart",
        delivery: "10",
        payType: 10,
        couponId: 0,
        isUsePoints: 0,
        remark: "",
        cartIds: cartIds
      }
    }).then(result => {
      console.log(result.data.data.order.goodsList);
      goodsListStore.goodsList = result.data.data.order.goodsList
      goodsListStore.cartIds = cartIds
      localStorage.setItem('cartIds', JSON.stringify(cartIds))
      localStorage.setItem('goodsList', JSON.stringify(goodsListStore.goodsList))
      router.push(`/pay?mode=cart`)
    })
  }
  else showToast('还未选择商品哦')
}

function getTotalPrice() {
  let total = 0
  let count = 0
  const isCheckdeList = JSON.parse(localStorage.getItem('isCheckdeList'))
  isCheckdeList.forEach((ele, index) => {
    if (ele) {
      total += cartList.value[index].goods_num * cartList.value[index].goods.goods_price_min
      count += cartList.value[index].goods_num
    }
  })
  selectCount.value = count
  return total
}

onMounted(() => {
  selectAllBox.value = document.querySelector('input[name="selectAll"]')
  console.log(selectAllBox);
})

function selectAll() {
  // console.log(selectAllBox.value.checked);
  // console.log(checkboxes.value);
  checkboxes.value.forEach(ele => {
    ele.checked = selectAllBox.value.checked
  })
  const isCheckdeList = Array.from(checkboxes.value).map(ele => ele.checked)
  localStorage.setItem('isCheckdeList', JSON.stringify(isCheckdeList))
  totalPrice.value = getTotalPrice()
}

function isSelectAll() {
  selectAllBox.value.checked = Array.from(checkboxes.value).every(ele => ele.checked)
  const isCheckdeList = Array.from(checkboxes.value).map(ele => ele.checked)
  localStorage.setItem('isCheckdeList', JSON.stringify(isCheckdeList))
  totalPrice.value = getTotalPrice()
}

function setCart(id, num) {
  console.log(id, num);

  instance({
    url: '/cart/update',
    params: {
      goodsId: id,
      goodsNum: num,
      goodsSkuId: '0'
    }
  }).then(result => {
    console.log(result);
    // console.log();
    cartTotal.value = result.data.data.cartTotal
  })
}

function delCarts() {
  if (!selectCount.value) {
    showToast('还未选中商品哦')
    return
  }
  showConfirmDialog({
    title: '删除商品',
    message:
      '确认降选中的商品从购物车删除吗?',
    confirmButtonText: '删除',
    confirmButtonColor: 'red',
    cancelButtonText: '再想想'
  })
    .then(() => {
      // on confirm
      const isCheckdeList = JSON.parse(localStorage.getItem('isCheckdeList'))
      const delList = []
      isCheckdeList.forEach((ele, index) => {
        if (ele) {
          delList.push(cartList.value[index].id)
        }
      })
      console.log(delList);
      if (delList) {
        instance({
          url: "/cart/clear",
          params: {
            cartIds: delList
          }
        }).then(result => {
          console.log(result);
          getCart()
        })
      }
    })
    .catch(() => {
      // on cancel
    });

}

function delCart(id) {
  showConfirmDialog({
    title: '删除商品',
    message:
      '是否删除选中商品?',
    confirmButtonText: '删除',
    confirmButtonColor: 'red',
  })
    .then(() => {
      // on confirm
      instance({
        url: '/cart/clear',
        params: {
          cartIds: [id]
        }
      })
        .then(result => {
          console.log(result);
          getCart()
        })
    })
    .catch(() => {
      // on cancel
    });
}

function minus(num, index) {
  if (num >= 2) {
    cartList.value[index].goods_num--
  }
  totalPrice.value = getTotalPrice()
}
function plus(num, index) {
  cartList.value[index].goods_num++
  totalPrice.value = getTotalPrice()
}

function getCart() {
  instance({
    url: '/cart/list'
  }).then(result => {
    console.log(result);
    cartTotal.value = result.data.data.cartTotal
    cartList.value = result.data.data.list

    //获取checkbox元素
    nextTick(() => {
      checkboxes.value = document.querySelectorAll('input[name="checkbox"]')
      console.log(checkboxes.value);
      const isCheckdeList = JSON.parse(localStorage.getItem('isCheckdeList'))
      for (let i = 0, count = 0; i < checkboxes.value.length; i++) {
        checkboxes.value[i].checked = isCheckdeList[i]
        if (isCheckdeList[i]) {
          count++
          if (count === checkboxes.value.length) selectAllBox.value.checked = true
        }
      }
      totalPrice.value = getTotalPrice()
    })
  })
}

getCart()

</script>

<style scoped>
.cart-title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
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
  left: 40vw;
  font-size: 20px;
  color: red;
}

.counter {
  position: absolute;
  top: 80px;
  left: 70vw;
  height: 25px;
  padding: 5px 0;
  border-radius: 3px;
  background-color: rgb(235, 235, 235);
}


.counter-left,
.counter-right {
  width: 30px;
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

.footer {
  height: 110px;
  text-align: center;
  margin-bottom: 10px;
  background-color: white;
}

.settle-line {
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 50px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(233, 233, 233);
  background-color: white;
}

.settle-left-wrap {
  display: flex;
  align-items: center;
}

.total-price {
  font-size: 20px;
  color: red;
  padding-right: 8px;
}

.settle-btn {
  width: 110px;
  height: 40px;
  font-size: 17px;
}

.del-btn {
  color: #e30000;
  width: 100px;
  height: 40px;
  font-size: 17px;
}

.delBtb {
  position: absolute;
  top: 5px;
  right: 0px;
}
</style>
