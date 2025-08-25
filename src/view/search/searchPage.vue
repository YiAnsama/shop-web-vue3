<template>
  <div>
    <van-nav-bar title="商品搜索" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="search-wrap">
      <van-icon name="search" class="search-icon" size="20" />
      <input class="search-input" type="search" v-model.trim="search_input"
        @keyup.enter="addSearchHistory(search_input), toSearchList()" placeholder="请输入要搜索的商品" autofocus>
      <button class="searchBtn" @click="addSearchHistory(search_input), toSearchList()">搜索</button>
    </div>
    <div class="search-history-wrap background">
      <p class="search-history-title">最近搜索 <van-icon v-if="!isShow" name="delete-o" size="18" class="del-btn"
          @click="del_mode_switch" />
        <span v-if="isShow" class="del-mode-text" @click="del_mode_switch">完成</span><span v-if="isShow"
          class="del-mode-text" @click="showConfirm">全部删除</span>
      </p>
      <span class="search-history-item" v-for="item in search_history" :key="item"
        @click="addSearchHistory(item), search_input = item, toSearchList()">{{ item }} <i v-if="isShow"
          class="del-item" @click.stop="delHistory(item)">X</i></span>
    </div>


  </div>
</template>

<script>
export default {
  name: 'searchPage',
}
</script>

<script setup>
import { ref } from 'vue';
import { showConfirmDialog } from 'vant';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const isShow = ref(false)
const search_input = ref('')
search_input.value = route.query.search || ''
const search_history = ref([])

const onClickLeft = () => history.back();

function toSearchList() {
  router.push(`/searchList?search=${search_input.value}`)
}

function addSearchHistory(search) {
  if (search === '') return
  delHistory(search)
  search_history.value.unshift(search)
  storeHistory()
}

function delHistory(history) {
  search_history.value = search_history.value.filter((ele) => ele !== history)
  storeHistory()
}

function storeHistory() {
  localStorage.setItem('goods-search-history', JSON.stringify(search_history.value))
}
function getHistory() {
  search_history.value = JSON.parse(localStorage.getItem('goods-search-history')) || []
}

function showConfirm() {
  showConfirmDialog({
    title: '删除历史记录',
    message:
      '确认删除全部搜索记录吗?',
    confirmButtonColor: 'red'
  })
    .then(() => {
      // on confirm
      search_history.value = []
      isShow.value = false
      storeHistory()
    })
    .catch(() => {
      // on cancel
    });
}

function del_mode_switch() {
  isShow.value = !isShow.value
}

getHistory()
</script>

<style scoped>
body {
  width: 100%;
  height: 100vh;
  background-color: rgb(235, 235, 235);
}

.search-wrap {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  text-align: center;
  background-color: rgb(235, 235, 235);
}

.search-icon {
  position: absolute;
  top: 10px;
  left: 25px;
  width: 18px;
  height: 18px;
}

.search-input {
  width: 95%;
  height: 30px;
  padding-left: 30px;
  border: 0;
  border-radius: 10px;
}

.searchBtn {
  position: absolute;
  right: 18px;
  width: 80px;
  height: 30px;
  border-radius: 0 10px 10px 0;
  border: 0;
  color: white;
  background-color: rgb(221, 43, 43);
}

.del-btn {
  float: right;
}

.del-mode-text {
  float: right;
  padding-left: 15px;
  font-size: 14px;
  color: grey;
}

.background {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(235, 235, 235);
}

.search-history-wrap {
  padding: 15px;
}

.search-history-title {
  font-size: 15px;
  margin-bottom: 20px;
}

.search-history-item {
  display: inline-block;
  position: relative;
  padding: 5px 20px;
  margin: 5px 10px 5px 0;
  border-radius: 10px;
  background-color: white;
}

.del-item {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  padding: 2px;
  text-align: right;
  color: grey;
  font-size: 14px;
}
</style>
