import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberPolicy from './memberPolicy.vue'
import routes from '../../router/memberPolicy.js'
import '@/styles/index.sass'
import {
  Button,
  Select,
  Option
} from 'element-ui'

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);

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