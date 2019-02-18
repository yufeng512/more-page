import Vue from 'Vue'
import VueRouter from 'vue-router'
import write from './write.vue'
import '@/styles/index.sass'
import routes from '../../router/write.js'
import '@/styles/index.sass'
import {
  Input,
  Button,
  Select,
  Option,
  DatePicker
} from 'element-ui'

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);

Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(write)
})