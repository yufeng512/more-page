import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberRule from './memberRule.vue'
import routes from '@/router/memberRule.js'
import '@/styles/index.sass'
console.log(routes)

Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(memberRule)
})