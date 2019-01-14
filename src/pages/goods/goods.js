import Vue from 'Vue'
import VideoPlayer from 'vue-video-player'
import VueRouter from 'vue-router'
import Goods from './goods.vue'
import '@/styles/index.sass'
import routes from '../../router/goods.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)

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