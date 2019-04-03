import Vue from 'Vue'
import VueRouter from 'vue-router'
import pointShop from './pointShop.vue'
import routes from '@/router/pointShop.js'
import store from '../../store'
import '@/styles/index.sass'
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
  store,
  render: h => h(pointShop)
})