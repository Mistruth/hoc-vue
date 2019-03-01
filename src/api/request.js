import http from '@/http/index.js'
const baseUrl = '/resource/v1'
export const dashboard = 'https://dashboard-mng.bilibili.co'

export function queryByService(params) {
  return http.post(`${baseUrl}/query.json`, params)
}

export function getUserInfo() {
  return http.get(`${baseUrl}/get_login_user.json`)
}

export function getModules(params) {
  return http.get(`${baseUrl}/get_app_module_types.json`, params)
}

// 通用删除
export function delCommon(params) {
  return http.get(`${baseUrl}/delete_common.json`, params)
}

// 通用查询
export function getCommon(params) {
  return http.get(`${baseUrl}/get_common.json`, params)
}

// 通用添加
export function addCommon(params) {
  return http.post(`${baseUrl}/add_common.json`, params)
}

// 通用编辑
export function editCommon(params) {
  return http.post(`${baseUrl}/edit_common.json`, params)
}

// 查询模块下的动作
export function getOperateByModule(id) {
  return http.get(`${baseUrl}/get_operate_by_module.json`, { params: { module_id: id }})
}

export function getRoleByName(params) {
  return http.get(`${baseUrl}/get_role.json`, params)
}
