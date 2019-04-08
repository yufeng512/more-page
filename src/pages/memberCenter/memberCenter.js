import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberCenter from './memberCenter.vue'
import routes from '@/router/memberCenter.js'
import '@/styles/index.sass'
console.log(routes)
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(memberCenter)
})