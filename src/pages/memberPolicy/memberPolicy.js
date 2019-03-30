import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberPolicy from './memberPolicy.vue'
import routes from '../../router/memberPolicy.js'
import '@/styles/index.sass'
import Toast from '@/components/Toast'

import ElementUI from './config'
import '@/styles/theme/index.css'
Vue.use(ElementUI)
Vue.use(Toast)
Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(memberPolicy)
})