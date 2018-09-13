import Vue from 'Vue'
import VueRouter from 'vue-router'
import Goods from './goods.vue'
import routes from '../../router/goods.js'
console.log(routes)

Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Goods)
})