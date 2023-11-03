import axios from 'axios'
import router from '../router/index'
import { ElMessage as Message } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth'
// import { refreshSessionUserBean } from '@/common/iszAuth.js'

let baseUrl = ''
let imgUrl = ''
const topHeight = 0

const vue_app_env = 'dev' // process.env.VUE_APP_ENV

switch (vue_app_env) {
  case 'dev': // 本地
    baseUrl = '/api'
    imgUrl = '/api/files/'
    break
  case 'test': // 测试
  case 'pre': // 预发布
  case 'master': // 生产
    baseUrl = window.VUE_APP_API_HEAD
    imgUrl = baseUrl
    break
}

const request = axios.create({
  baseURL: baseUrl,
  timeout: 120 * 1000 // 请求时长10s
})

const get = function (url, params, config) {
  try {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    return new Promise((resolve, reject) => {
      request
        .get(url, { params, headers, ...config })
        .then(res => {
          if (res.status === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  } catch (e) {
    console.log(e)
  }
}

// type: 0 -application/json格式, 1 -form表单请求, 2 -multipart/form-data格式
const post = function (url, params, type, config, headers = {}) {
  return new Promise((resolve, reject) => {
    try {
      if (sessionStorage.getItem('authorization')) {
        headers.authorization = sessionStorage.getItem('authorization')
      }

      headers['Access-Control-Allow-Origin'] = '*'

      if (type === 1) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        const formData = new FormData()
        for (const key in params) {
          if (params[key] === undefined) {
            continue
          }
          formData.append(key, params[key])
        }
        request
          .post(url, formData, { headers, ...config })
          .then(res => {
            if (res.status === 200 || res.status === 410) {
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      } else if (type === 2) {
        headers['Content-Type'] = 'multipart/form-data'
        const formData = new FormData()
        for (const key in params) {
          formData.append(key, params[key])
        }
        request
          .post(url, formData, { headers, ...config })
          .then(res => {
            if (res.status === 200 || res.status === 410) {
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      } else {
        headers['Content-Type'] = 'application/json'
        request
          .post(url, params, { headers, ...config })
          .then(res => {
            if (res.status === 200 || res.status === 410) {
              resolve(res)
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    } catch (e) {
      console.log(e)
    }
  })
}

request.interceptors.request.use(
  function (config) {
    // console.log('request token', getToken())
    config['headers']['token'] = getToken()
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.request.responseType === 'blob') {
      return response
    }

    const { status, msg } = response.data
    if (status === 401) {
      // 重新登录授权
      removeToken()
      Message({ type: 'danger', message: 'token失效，将跳转重新登录' })
      setTimeout(() => {
        router.replace({ path: '/notice' })
      }, 800)
    }
    if (status === 500) {
      if (response.request && response.request._url === '/api/ywtb/house/checkHouseByCertNo')
        return response.data

      Message({ type: 'danger', message: msg || '500 错误' })
    }
    return response
  },
  function (error) {
    if (error.message === 'Network Error') {
      Message({ type: 'danger', message: '目前暂无网络/网络较差，请稍后再试' })
      setTimeout(() => {
        document.getElementsByClassName('van-popup--top')[0].style.top = topHeight + 'px'
      })
      return Promise.reject('好像出了点问题')
    } else if (error.message.includes('timeout')) {
      Message('连接超时')
      return Promise.reject('连接超时')
    } else {
      Message(error.message)
      return Promise.reject(error)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  }
)

export { request, get, post, imgUrl }
