import Layout from '@/views/layout/index.vue'

const user = {
  path: '/users',
  component: Layout,
  redirect: '/users/index',
  name: 'users',
  hidden: true,
  meta: {
    title: '用户'
  },
  children: [
    {
      path: '/users/index',
      component: () => import(/* webpackChunkName: 'users' */ '../../views/UserPage/UserPage.vue'),
      name: 'user',
      meta: {
        title: '用户'
      }
    }
  ]
}

export default user
