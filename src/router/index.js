import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/view/login/login.vue'
import Layout from '@/view/layout/layout.vue'
import SearchPage from '@/view/search/searchPage.vue'
import SearchList from '@/view/search/searchList.vue'
import Goods from '@/view/goods/goods.vue'
import Pay from '@/view/pay/pay.vue'
import Order from '@/view/order/order.vue'
import Index from '@/view/layout/index.vue'
import Category from '@/view/layout/category.vue'
import Cart from '@/view/layout/cart.vue'
import My from '@/view/layout/my.vue'
import Comment from '@/view/goods/comment.vue'
import authority from '@/utils/authority'
import Address from '@/view/pay/address.vue'
import EditAddress from '@/view/pay/editAddress.vue'
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
