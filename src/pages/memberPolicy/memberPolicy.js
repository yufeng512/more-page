import Vue from 'Vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import memberPolicy from './memberPolicy.vue'
import routes from '../../router/memberPolicy.js'
import '@/styles/index.sass'
import {
  Input,
  Button,
  Select,
  Option,
  DatePicker,
  Message
} from 'element-ui'
Vue.prototype.$ajax = axios;
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);

Vue.prototype.$message = Message;

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