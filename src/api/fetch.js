import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000, // 指定请求超时的毫秒数(0 表示无超时时间)
  withCredentials: true // 表示跨域请求时是否需要使用凭证 自动set-cookie
  // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err:')// for debug
    console.log(error)// for debug
    return Promise.reject(error)
  }
)

export default service
