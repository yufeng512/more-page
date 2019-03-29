import Vue from 'Vue'
import VueRouter from 'vue-router'
import point from './point.vue'
import '@/styles/index.sass'
import routes from '../../router/point.js'
import '@/styles/index.sass'
import {
  Pagination,
  Tabs,
  TabPane,
} from 'element-ui'
Vue.use(Pagination);
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
  render: h => h(point)
})