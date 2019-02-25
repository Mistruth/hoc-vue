import axios from 'axios'
import { Message } from 'element-ui'
import { dashboard } from '@/api/request.js'

const http = axios.create({
  baseURL: '/',
  timeout: 3000,
  withCredentials: true
})

http.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json'
  }
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  if (response.status === 401) {
    window.location.href = dashboard
  }
  return response
}, error => {
  if (error.response.status === 401) {
    window.location.href = dashboard
  }
  Message({
    message: `${error.response.status}:${error.response.statusText}` || error.response.data,
    type: 'error'
  })
  return Promise.reject(error)
})

export default http
