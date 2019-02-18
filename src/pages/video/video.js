import Vue from 'Vue'
import VueRouter from 'vue-router'
import video from './video.vue'
import '@/styles/index.sass'
import routes from '../../router/video.js'
import '@/styles/index.sass'

Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(video)
})