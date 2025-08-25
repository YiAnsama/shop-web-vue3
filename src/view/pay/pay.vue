<template>
  <div>
    <van-nav-bar title="订单结算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="address-bar" @click="editAddress">
      <van-icon name="logistics" />
      <div class="address-info">
        <div>
          <span style="padding-right: 10px;">姓名</span>
          <span>联系电话</span>
        </div>
        <div><span>地址</span></div>
      </div>
      <span style="font-size: 20px;">＞</span>
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
    <van-submit-bar class="submit-bar" :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  name: 'payPage'
}
</script>

<script setup>
// import { ref } from 'vue';
import { showToast } from 'vant';
// import { useRoute } from 'vue-router';
// const route = useRoute()
const onClickLeft = () => history.back();
const onSubmit = () => showToast('点击按钮');

function editAddress() {

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
</style>
