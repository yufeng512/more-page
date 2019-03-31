import Vue from 'Vue'
import VueRouter from 'vue-router'
import card from './card.vue'
import '@/styles/index.sass'
import routes from '../../router/card.js'
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
  render: h => h(card)
})