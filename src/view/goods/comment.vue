<template>
  <van-nav-bar title="全部评价" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="comment" v-for="item in comment_list" :key="item">
    <div class="user_line">
      <span class="userFirgure"><img class="firgure" :src="item.user.avatar_url || defaultImg" alt=""></span>
      <span class="userName">{{ item.user.nick_name }}</span>
      <van-rate size="3vh" v-model="item.score" color="#ffd21e" void-icon="star" void-color="#eee" allow-half
        readonly />
    </div>
    <p class="comment_content">{{ item.content }}</p>
    <div class="time">{{ item.create_time }}</div>
  </div>
  <!-- 浮动气泡 -->
  <van-floating-bubble gap='10' axis="xy" icon="back-top" magnetic="x" @click="toTop" />
</template>

<script>
export default {
  name: 'commentPage'
}
</script>
<script setup>
import defaultImg from '@/assets/default-avatar.png'
import instance from '@/utils/request';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const id = route.query.id
const total = ref(0)
const comment_list = ref([])

const onClickLeft = () => history.back()
const toTop = () => {
  // console.log('click');
  window.scrollTo({ top: 0, behavior: 'smooth' })
};

//获取评价数再获取所有评论
instance({
  url: '/comment/total',
  params: {
    goodsId: id,
  }
}).then(result => {
  // console.log(result.data.data.total.all);
  const comment_count = result.data.data.total.all
  instance({
    url: '/comment/listRows',
    params: {
      goodsId: id,
      limit: comment_count
    }
  }).then(result => {
    // console.log(result);
    const data = result.data.data
    total.value = data.total
    comment_list.value = data.list
  })
})
</script>

<style scoped>
.comment {
  width: 100%;
  height: 17vh;
  padding: 2vw;
  border-bottom: 1px solid rgb(246, 246, 246);
}

.user_line {
  display: flex;
  height: 5vh;
  padding: 0 1vw;
  align-items: center;
  justify-content: left;
}

.userFirgure,
.firgure {
  display: inline-block;
  height: 4vh;
  border-radius: 2.5vh;
}

.userFirgure,
.userName {
  margin-right: 3vw;
}

.comment_content {
  padding: 2vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  padding-left: 2vw;
  font-size: 15px;
  color: grey;
}
</style>
