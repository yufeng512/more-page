import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberCenter from './memberCenter.vue'
import routes from '@/router/memberCenter.js'
import '@/styles/index.sass'
import store from '@/store/index.js'
import Toast from '@/common/Toast'
Vue.use(Toast);
import {
  Tabs,
  TabPane,
  Button,
  Input,
  Select,
  Option,
  DatePicker,
  InputNumber,
} from 'element-ui'
Vue.use(Option)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(Input)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(InputNumber)
Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // store.dispatch('showloader')
  next()
})
router.afterEach(function (to) {
  // store.dispatch('hideloader')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(memberCenter)
})