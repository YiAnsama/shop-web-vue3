<template>
  <div style="background-color:rgb(246, 246, 246) ;">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24" @message="changeActive()">
      <van-tabbar-item to="/index" icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage'
}
</script>
<script setup>
import { useTagStore } from '@/stores/tag';
import { onMounted, ref } from 'vue';
const tag = useTagStore()
const active = ref(0)
onMounted(() => { active.value = tag.tag_value })
</script>

<style scoped>
.nav {
  width: 100%;
  position: fixed;
  z-index: 100;
  bottom: 0px;
  display: flex;
  align-content: center;
  justify-content: space-around;
  border-top: 1px solid rgb(202, 202, 202);
}

.nav .wrap {
  width: 100%;
  padding: 10px;
  text-align: center;
  color: black;
  background-color: white;
}

.nav .wrap a {
  text-decoration: none;
  color: black;
}

.nav .wrap .router-link-active {
  color: red;
}
</style>
