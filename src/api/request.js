import http from '@/http/index.js'
const baseUrl = '/resource/v1'
export const dashboard = 'https://dashboard-mng.bilibili.co'

export function queryByService(params) {
  return http.post(`${baseUrl}/query.json`, params)
}

export function getUserInfo() {
  return http.get(`${baseUrl}/get_login_user.json`)
}
