import Vue from 'Vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import pointLink from './pointLink.vue'
import routes from '@/router/pointLink.js'
import store from '@/store'
import '@/styles/index.sass'
import { Tabs, TabPane, } from 'element-ui'

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Vuex)
Vue.use(VueRouter)
var router = new VueRouter({ routes })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(pointLink)
})