import Vue from 'Vue'
import VueRouter from 'vue-router'
import serviceIssue from './serviceIssue.vue'
import '@/styles/index.sass'
import routes from '../../router/serviceIssue.js'
import Toast from '@/common/Toast'
Vue.use(Toast);
import {
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Button,
} from 'element-ui'
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Input);
Vue.use(Button)
Vue.use(VueRouter)
var router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(serviceIssue)
})