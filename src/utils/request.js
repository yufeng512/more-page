//  引入axios文件包
import axios from 'axios'
import Vue from 'vue'

// POST 方法封装  (参数处理)
const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// POST 方法封装  (文件上传)
const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//  GET 方法封装
const getRequest = (url) => {
  return axios({
    method: 'get',
    url: url
  });
}

//  PUT 方法封装
const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: url,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

//  DELETE 方法封装
const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: url
  });
}

//  REQUEST 请求异常拦截
axios.interceptors.request.use(config => {
  //==========  所有请求之前都要执行的操作  ==============
  return config;
}, err => {
  //==================  错误处理  ====================
  Message.error({
    message: '请求超时!'
  });
  return Promise.resolve(err);
})

//  RESPONSE 响应异常拦截
axios.interceptors.response.use(data => {
  //==============  所有请求完成后都要执行的操作  ==================

  // 第一种方式

  // 根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case '0':
      // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
      if (isIOS()) {
        // 异步以保证数据已渲染到页面上
        setTimeout(() => {
          // 通过滚动强制浏览器进行页面重绘
          document.body.scrollTop += 1
        }, 0)
      }
      // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
      return data

      // 需要重新登录
    case 'SHIRO_E5001':
      // 微信生产环境下授权登录
      if (isWeChat() && IS_PRODUCTION) {
        axios.get(apis.common.wechat.authorizeUrl).then(({
          result
        }) => {
          location.replace(global.decodeURIComponent(result))
        })
      } else {
        // 否则跳转到h5登录并带上跳转路由
        const search = encodeSearchParams({
          next: location.href,
        })

        location.replace(`/user/login`)
      }

      // 不显示提示消息
      data.description = ''
      break

    default:
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.description)

  err.data = data
  err.response = response

  // 第二种方式，仅对200和error状态处理
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error({
      message: data.data.msg
    });
    return;
  }
  return data;
}, err => {
  //==============  错误处理  ====================
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)';
        break;
      case 401:
        err.message = '未授权，请重新登录(401)';
        break;
      case 403:
        err.message = '拒绝访问(403)';
        break;
      case 404:
        err.message = '请求出错(404)';
        break;
      case 408:
        err.message = '请求超时(408)';
        break;
      case 500:
        err.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        err.message = '网络错误(502)';
        break;
      case 503:
        err.message = '服务不可用(503)';
        break;
      case 504:
        err.message = '网络超时(504)';
        break;
      case 505:
        err.message = 'HTTP版本不受支持(505)';
        break;
      default:
        err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  Message.err({
    message: err.message
  })
  return Promise.resolve(err);
})

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.uploadFileRequest = uploadFileRequest