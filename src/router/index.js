import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/view/layout/layout.vue'
import Index from '@/view/layout/index.vue'
import Category from '@/view/layout/category.vue'
import Cart from '@/view/layout/cart.vue'
import My from '@/view/layout/my.vue'

//组件异步加载
const Login = () => import('@/view/login/login.vue')
const SearchPage = () => import('@/view/search/searchPage.vue')
const SearchList = () => import('@/view/search/searchList.vue')
const Goods = () => import('@/view/goods/goods.vue')
const Pay = () => import('@/view/pay/pay.vue')
const Order = () => import('@/view/order/order.vue')
const Comment = () => import('@/view/goods/comment.vue')
const authority = () => import('@/utils/authority')
const Address = () => import('@/view/pay/address.vue')
const EditAddress = () => import('@/view/pay/editAddress.vue')
import AddAddress from '@/view/pay/addAddress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/login', component: Login },
    {
      path: '/layout',
      component: Layout,
      children: [
        { path: '/index', component: Index },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/my', component: My },
      ],
    },
    { path: '/searchPage', component: SearchPage },
    { path: '/searchList', component: SearchList },
    { path: '/goods', component: Goods },
    { path: '/pay', component: Pay },
    { path: '/order', component: Order },
    { path: '/comment', component: Comment },
    { path: '/address', component: Address },
    { path: '/editAddress', component: EditAddress },
    { path: '/addAddress', component: AddAddress },
  ],
})

router.beforeEach(async (to, from) => {
  console.log(to, from)
  //需登录界面在未登录时,跳转至登录界面
  if ((to.path === '/pay' || to.path === '/order') && !authority) {
    console.log(authority)
    return '/login'
  }
})

export default router
