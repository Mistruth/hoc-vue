import Layout from '@/views/layout/index.vue'

const center = {
  path: '/center',
  component: Layout,
  redirect: '/center/user',
  name: 'center',
  meta: {
    title: '管理中心',
    icon: 'iconfont icon-guanlizhongxin',
    permissions: ['super.admin', 'user.admin', 'group.admin', 'role.admin']
  },
  children: [
    {
      path: '/center/user',
      component: () => import(/* webpackChunkName: 'user_manage' */ '../../views/Center/User.vue'),
      name: 'user',
      meta: { title: '用户管理', permissions: ['super.admin', 'user.admin'] }
    },
    {
      path: 'dep',
      component: () => import(/* webpackChunkName: 'Dep' */ '../../views/Center/Dep.vue'),
      name: 'dep',
      meta: { title: '部门管理', permissions: ['super.admin', 'group.admin'] }
    },
    {
      path: 'role',
      component: () => import(/* webpackChunkName: 'Role' */ '../../views/Center/Role.vue'),
      name: 'role',
      meta: { title: '角色管理', permissions: ['super.admin', 'role.admin'] }
    }
  ]
}

export default center
