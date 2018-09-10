import Vue from 'Vue'
import VueRouter from 'vue-router'
import Cell from './cell.vue'
import routes from '../../router/cell.js'
console.log(routes)

Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Cell)
})