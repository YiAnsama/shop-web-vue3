<template>
  <div style="background-color: white;">
    <van-nav-bar title="全部分类" />
    <van-sidebar v-model="active" style="height: 90vh; overflow-y: auto; position: fixed;">
      <van-sidebar-item v-for="value in categoryList" :key="value.category_id" :title="value.name" />
    </van-sidebar>
    <div v-if="categoryList.length !== 0" class="category-wrap">
      <div class="category-item" v-for="item in categoryList[active].children" :key="item.category_id"
        @click="toSearchList(item.name)">
        <img :src="item.image.preview_url" alt="" class="category-img">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
  <div style="height: 50px; background-color: white;"></div>
</template>

<script>
export default {
  name: 'categoryPage'
}
</script>
<script setup>
import { ref } from 'vue';
import { useTagStore } from '@/stores/tag';
import instance from '@/utils/request';
import router from '@/router';
const tag = useTagStore()
tag.tag_value = 1

const active = ref(0);
const categoryList = ref([])

instance({
  url: '/category/list'
}).then(result => {
  console.log(result.data.data.list);
  categoryList.value = result.data.data.list
})

function toSearchList(name) {
  router.push(`/searchList?search=${name}`)
}
</script>

<style scoped>
.van-sidebar-item--select:before {
  background-color: rgb(240, 0, 0);
}

.category-wrap {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin-left: 80px;
}

.category-item {
  text-align: center;
  padding: 10px;
}

.category-img {
  width: 100%;
}
</style>
