// import Vue from 'vue'
import axios from 'axios'
import { Promise } from 'es6-promise'
import store from '../store'

// Vue.prototype.$http = axios
//添加一个请求拦截器
axios.interceptors.request.use(config => {
  // const token = sessionStorage.getItem("token");
  config.data = JSON.stringify(config.data);
  config.headers = {
    'Content-Type': 'application/json' //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
  };
  // if (token) {
  //   config.headers.Authorization = "Token " + token; //携带权限参数
  // }
  store.state.showLoading = true
  console.log(store.state.showLoading)
  return config;
},
  err => {
    return Promise.reject(err);
  })
//添加一个响应拦截器
axios.interceptors.response.use(response => {
  store.state.showLoading = false
  console.log(store.state.showLoading)
  console.log(response);
  // if (response.status == 401) {
  //   this.$router.push('/login')//push后面是一个参数对象，可以携带很多参数，具体可以去vue-router上查看，例如query字段表示携带的参数
  // }
  return response
},
  err => {
    return Promise.reject(err)
  })

  /**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

  export function fetch(url, params = {}){
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}