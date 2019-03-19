import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberCenter from './memberCenter.vue'
import routes from '@/router/memberCenter.js'
import '@/styles/index.sass'
console.log(routes)
import {
  Tabs,
  TabPane,
} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
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