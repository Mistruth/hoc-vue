import Layout from '@/views/layout/index.vue'

const grant = {
  path: '/grant',
  component: Layout,
  redirect: '/grant/index',
  name: 'grant',
  hidden: true,
  meta: {
    title: '权限'
  },
  children: [
    {
      path: '/grant/index',
      component: () => import(/* webpackChunkName: 'grant' */ '../../views/GrantPage/GrantPage.vue'),
      name: 'grant_index',
      meta: {
        title: '权限'
      }
    }
  ]
}

export default grant
