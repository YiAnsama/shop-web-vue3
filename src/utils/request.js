import axios from 'axios'
import { showNotify, closeToast, showLoadingToast } from 'vant'
import { getInfo } from './storage'
const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 6000,
  headers: { platform: 'H5' },
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 开启loading，禁止背景点击 (节流处理，防止多次无效触发)
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,
    })
    const token = getInfo().token

    if (token) {
      config.headers['Access-Token'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么 (默认axios会多包装一层data，需要响应拦截器中处理一下)
    closeToast(1)
    const res = response.data
    if (res.status !== 200) {
      // 给错误提示, Toast 默认是单例模式，后面的 Toast调用了，会将前一个 Toast 效果覆盖
      // 同时只能存在一个 Toast
      // 抛出一个错误的promise
      showNotify({ type: 'danger', message: res.message })
      return Promise.reject(res.message)
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    showNotify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  },
)
export default instance
