<template>
  <div>
    <van-nav-bar title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" show-set-default show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
export default {
  name: 'editAddress'
}
</script>
<script setup>
import { ref } from 'vue';
// import { showToast } from 'vant';
import instance from '@/utils/request';
import { areaList } from '@vant/area-data';

const searchResult = ref([]);
const onClickLeft = () => history.back()
const onSave = () => {
  const inputList = document.querySelectorAll('input')
  const name = inputList[0].value
  const tel = inputList[1].value
  // const area = inputList[2].value
  const detailAddress = document.querySelector('textarea').value
  instance({
    url: '/address/add',
    method: 'post',
    data: {
      form: {
        name: name,
        phone: tel,
        region: [{

        }],
        detail: detailAddress
      }
    }
  })
};
const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: '烈士陵园',
        address: '广州市越秀区',
      },
    ];
  } else {
    searchResult.value = [];
  }
};

instance({
  url: '/region/tree',
}).then(result => {
  console.log(result);
})
</script>
