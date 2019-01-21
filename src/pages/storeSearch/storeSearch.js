import Vue from 'Vue'
import VueRouter from 'vue-router'
import storeSearch from './storeSearch.vue'
import routes from '@/router/storeSearch.js'
import '@/styles/index.sass'
import 'mint-ui/lib/style.css';
import '@/styles/my-mint.scss';
// import BaiduMap from 'vue-baidu-map'

import {
  Picker,
  Popup
} from 'mint-ui';

Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);

// Vue.use(BaiduMap, {
//   ak: 'dH8eZmQpKiPGtwAOS83sZPpb76hmaA1O'
// })
Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(storeSearch)
})