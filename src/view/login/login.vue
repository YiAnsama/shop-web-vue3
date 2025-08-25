<template>
  <van-nav-bar title="账号登录" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="login">
    <h1 class="head">手机号登录</h1>
    <p class="tip">未注册的手机号登录后将自动注册</p>
    <div class="input-wrap">
      <input type="text" class="input" placeholder="请输入手机号码" v-model="phoneNum">
    </div>
    <div class="input-wrap">
      <input type=" text" class="input" placeholder="请输入图形验证码" v-model="picCode">
      <img :src="imgUrl" alt="图像验证码" class="imgCode" @click="getImgCode">
    </div>
    <div class="input-wrap">
      <input type="text" class="input" placeholder="请输入短信验证码" v-model="code">
      <span v-if="count === 0" class='code' @click="getCode">获取验证码</span>
      <span v-else class='code'>重新获取({{ count }}s)</span>
    </div>
    <button class="login-btn" @click="login">登录</button>
  </div>


</template>

<script>
export default {
  name: 'LoginPage',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import '@/styles/common.css'
import instance from '@/utils/request';
import { showNotify } from 'vant';
import { showToast } from 'vant';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { setInfo } from '@/utils/storage';
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

//数据
const phoneNum = ref()
const picCode = ref('')
const code = ref('')
const imgUrl = ref('')
const count = ref(0)

//方法
const onClickLeft = () => router.back();
function getImgCode() {
  instance({
    url: '/captcha/image'
  }).then(result => {
    // console.log(result);
    imgUrl.value = result.data.data.base64

  }).catch(error => console.log(error));
}
function getCode() {
  count.value = 30
  const id = setInterval(() => {
    if (count.value >= 1)
      count.value -= 1
  }, 1000)
  setTimeout(() => {
    clearInterval(id)
  }, count.value * 1000)

  instance({
    url: '/captcha/sendSmsCaptcha'
  }).then(result => {
    console.log(result.data);
    showToast('短信已发送,请注意查收');
  }).catch(error => console.log(error));
}
function login() {
  console.log(phoneNum.value, code.value);
  instance({
    url: '/passport/login',
    method: 'post',
    data: {
      form: {
        isParty: false,
        partyData: {},
        mobile: phoneNum.value,
        smsCode: code.value
      }
    }
  }).then(result => {
    console.log(result);
    userStore.token = result.data.data.token
    userStore.userId = result.data.data.userId
    setInfo(userStore.token, userStore.userId)
    console.log(userStore.token, userStore.userId);

    showNotify({ type: 'success', message: '登陆成功' })
    const url = route.query.backUrl || '/'
    router.replace(url)
  }).catch(error => {
    console.log(error)
  }
  )
}

//生命周期函数
//created
onMounted(() => {
  // console.log('vue已挂载');
  getImgCode()
})

</script>
<style scoped>
.login {
  width: 100%;
  padding: 45px 20px;
}

.head {
  padding: 10px 0;
  font-weight: 600;
}

.tip {
  padding-bottom: 10px;
  color: rgb(145, 145, 145)
}

.input-wrap {
  padding: 20px 0;
  height: 80px;
  border-bottom: 1px solid rgb(183, 183, 183);
}

.input {
  width: 200px;
  font-size: 18px;
  line-height: 50px;
  border: 0;
}

.imgCode {
  float: right;
  width: 135px;
}

.code {
  cursor: pointer;
  color: rgb(255, 159, 22)
}

.login-btn {
  width: 100%;
  height: 45px;
  margin-top: 30px;
  cursor: pointer;
  border: 0;
  border-radius: 45px;
  color: white;
  background-color: rgb(246, 173, 44);
}
</style>
