// import Vue from 'vue'
import axios from 'axios'
import { Promise } from 'es6-promise'
import store from '../store/index.js'

window.baseURL = process.env.BASE_API

const service = axios.create({
  baseURL: baseURL,
  // timeout: 2000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  }
});
//添加一个请求拦截器
service.interceptors.request.use(config => {
    config.data = JSON.stringify(config.data)
    store.dispatch('showloader')
    return config;
},
err => {
  return Promise.reject(err);
})

//添加一个响应拦截器
service.interceptors.response.use(response => {
    store.dispatch('hideloader')
    if (response.status == 401) {
      this.$router.push('/login')
    }
    return response.data
},
err => {
    return Promise.reject(err)
})

export default service
