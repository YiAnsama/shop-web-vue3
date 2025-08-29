import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "./styles/common.css"

//全局注册vant组件,导入样式
import 'vant/lib/index.css'
import {
  NavBar,
  Notify,
  Toast,
  Swipe,
  SwipeItem,
  NoticeBar,
  Grid,
  GridItem,
  Tabbar,
  TabbarItem,
  Icon,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Button,
  Rate,
  Popup,
  FloatingBubble,
  Badge,
  Empty,
  SubmitBar,
  AddressList,
  AddressEdit,
  Area,
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
} from 'vant'

const app = createApp(App)
const pinia = createPinia()

app
  .use(NavBar)
  .use(Notify)
  .use(Toast)
  .use(Swipe)
  .use(SwipeItem)
  .use(NoticeBar)
  .use(Grid)
  .use(GridItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Dialog)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Button)
  .use(Rate)
  .use(Popup)
  .use(FloatingBubble)
  .use(Badge)
  .use(Empty)
  .use(SubmitBar)
  .use(AddressList)
  .use(AddressEdit)
  .use(Area)
  .use(Tab)
  .use(Tabs)
  .use(Sidebar)
  .use(SidebarItem)
app.use(pinia)
app.use(router)

app.mount('#app')
