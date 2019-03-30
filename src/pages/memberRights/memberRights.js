import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberRights from './memberRights.vue'
import '@/styles/index.sass'
import routes from '../../router/memberRights.js'
Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(memberRights)
})