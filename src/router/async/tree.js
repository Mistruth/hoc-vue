import Layout from '@/views/layout/index.vue'

const tree = {
  path: '/tree',
  component: Layout,
  redirect: '/tree/role',
  name: 'tree',
  meta: {
    title: '服务树管理',
    icon: 'iconfont icon-Group',
    permissions: ['super.admin', 'treerole.admin', 'treenode.admin']
  },
  children: [
    {
      path: '/tree/role',
      component: () => import(/* webpackChunkName: 'TreeRole' */ '../../views/Tree/TreeRole.vue'),
      name: 'tree_role',
      meta: { title: '树角色管理', permissions: ['super.admin', 'treerole.admin'] }
    },
    {
      path: '/tree/node',
      component: () => import(/* webpackChunkName: 'TreeNode' */ '../..//views/Tree/TreeNode.vue'),
      name: 'tree_node',
      meta: { title: '树节点管理', permissions: ['super.admin', 'treenode.admin'] }
    }
  ]
}

export default tree
