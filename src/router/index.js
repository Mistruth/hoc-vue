import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/index.vue'
import tree from './async/tree.js'
import center from './async/center.js'
import grant from './async/grant.js'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '首页',
      icon: 'iconfont icon-dashboard',
      istop: true
    },
    children: [
      {
        path: '/dashboard/index',
        component: () => import(/* webpackChunkName: 'machine' */ '../views/DashBoard/DashBoard.vue'),
        meta: {
          title: '首页',
          isFatherTop: true,
          fatherTitle: '首页'
        }
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    alwaysShow: true,
    meta: {
      title: '应用管理',
      icon: 'iconfont icon-applications',
      istop: true // you can set roles in root nav
    },
    children: [
      {
        path: '/app/index',
        component: () => import(/* webpackChunkName: 'Application' */ '../views/Application/Application.vue'),
        name: 'application',
        meta: {
          title: '应用管理'
        }
      },
      {
        path: '/app/module',
        component: () => import(/* webpackChunkName: 'Module' */ '../views/Application/Module.vue'),
        name: 'module',
        meta: {
          title: '模块管理'
        }
      },
      {
        path: '/app/operate',
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
      icon: 'iconfont icon-miyue',
      istop: true
    },
    children: [
      {
        path: '/apiac/index',
        component: () => import(/* webpackChunkName: 'Apiac' */ '../views/Apiac/Apiac.vue'),
        name: 'apiac',
        meta: {
          title: '密钥管理', group: 'apiac'
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
  tree,
  center,
  grant,
  { path: '*', redirect: '/404', hidden: true }
]
