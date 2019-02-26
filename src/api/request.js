import http from '@/http/index.js'
const baseUrl = '/resource/v1'
export const dashboard = 'https://dashboard-mng.bilibili.co'

export function queryByService(params) {
  return http.post(`${baseUrl}/query.json`, params)
}
