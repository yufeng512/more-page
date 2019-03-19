import Vue from 'Vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import memberPolicy from './memberPolicy.vue'
import routes from '../../router/memberPolicy.js'
import Toast from '@/components/Toast'
Vue.use(Toast);

import '@/styles/index.sass'
import {
  Input,
  Button,
  Select,
  Option,
  DatePicker,
  Message,
  MessageBox,
  Tabs,
  TabPane,
} from 'element-ui'
Vue.prototype.$ajax = axios;
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Toast)
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