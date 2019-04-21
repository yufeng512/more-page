import Vue from 'Vue'
import VueRouter from 'vue-router'
import tiandun from './tiandun.vue'
import routes from '@/router/tiandun.js'
import '@/styles/index.sass'
import {
  Carousel,
  CarouselItem
} from 'element-ui'

Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(tiandun)
})