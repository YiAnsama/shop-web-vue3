<template>
  <div>
    <van-nav-bar title="地址选择" left-text="返回" right-text="确认" left-arrow @click-left="onClickLeft"
      @click-right="onClickRight" /> <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认"
      @add="onAdd" @edit="onEdit" @click="chooseAddress" />
  </div>
</template>

<script>
export default {
  name: "addressEdit"
}
</script>

<script setup>
import { ref } from 'vue';
// import { showToast } from 'vant';
import router from '@/router';
import instance from '@/utils/request';

//获取收货地址列表
instance({
  url: '/address/list'
}).then(result => {
  console.log(result);
})

const chosenAddressId = ref('1');
const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
])
//default
const chosenAddress = ref(list.value[0])

const chooseAddress = () => {
  // console.log(chosenAddressId.value);
  chosenAddress.value = list.value[parseInt(chosenAddressId.value) - 1]
  localStorage.setItem('chosenAddress', JSON.stringify(chosenAddress.value))
}
const onAdd = () => router.push('/addAddress');
const onEdit = (item, index) => {
  console.log(item, index);
  localStorage.setItem("editedAddress", JSON.stringify(item))
  router.push('/editAddress')
};
const onClickLeft = () => history.back();
const onClickRight = () => router.back();
</script>
