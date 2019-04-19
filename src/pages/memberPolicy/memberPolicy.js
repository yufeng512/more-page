import Vue from 'Vue'
import VueRouter from 'vue-router'
import memberPolicy from './memberPolicy.vue'
import routes from '../../router/memberPolicy.js'
import '@/styles/index.sass'
import Toast from '@/common/Toast'
Vue.use(Toast);
import {
  Input,
  Button,
  Select,
  Option,
  DatePicker,
  Checkbox,
} from 'element-ui'
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);
Vue.use(Checkbox)
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