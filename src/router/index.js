import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/index.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/app',
    hidden: true
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    alwaysShow: true,
    meta: {
      title: '应用管理',
      icon: 'iconfont icon-yingyong',
      istop: true // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: 'Application' */ '../views/Application/Application.vue'),
        name: 'application',
        meta: {
          title: '应用管理'
        }
      },
      {
        path: 'module',
        component: () => import(/* webpackChunkName: 'Module' */ '../views/Application/Module.vue'),
        name: 'module',
        meta: {
          title: '模块管理'
        }
      },
      {
        path: 'operate',
        component: () => import(/* webpackChunkName: 'Operate' */ '../views/Application/Operate.vue'),
        name: 'operate',
        meta: {
          title: '操作管理'
        }
      }
    ]
  },
  {
    path: '/apiac',
    component: Layout,
    redirect: '/apiac/index',
    alwaysShow: true,
    meta: {
      title: '密钥管理',
      icon: 'iconfont icon-miyao42',
      istop: true
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: 'Apiac' */ '../views/Apiac/Apiac.vue'),
        name: 'apiac',
        meta: {
          title: '密钥管理', group: 'apiac'
        }
      },
      {
        path: '/apiac_grant',
        component: () => import(/* webpackChunkName: 'ApiacGrant' */ '../views/Apiac/ApiacGrant.vue'),
        name: 'apiac_grant',
        meta: {
          title: '密钥权限管理', group: 'apiac'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: '404' */ '../views/404.vue'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: '403' */ '../views/403.vue'),
    hidden: true
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
