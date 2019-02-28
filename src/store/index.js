import Vue from 'vue'
import App from '../App.vue'
import router from '@/router/index.js'
import { asyncRouterMap, constantRouterMap } from '@/router/index.js'
import { getUserInfo } from '@/api/request.js'
export default new Vue({
  data() {
    return {
      userInfo: {},
      permissionList: [],
      renderRouters: []
    }
  },
  async created() {
    await this.getUserInfo()
    const accessedRouters = this.filterAsyncRouter(asyncRouterMap, this.permissionList)
    this.renderRouters = this.concatRoutes(constantRouterMap, accessedRouters)
    this.GenerateRoutes(accessedRouters)
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  },
  methods: {
    async getUserInfo() {
      const res = await getUserInfo()
      const { data } = res.data
      this.userInfo = data
      // 获取权限
      this.userInfo.permissions.forEach(item => {
        const first = item.indexOf(':')
        const last = item.lastIndexOf(':')
        this.permissionList.push(item.slice(first + 1, last))
      })
    },
    filterAsyncRouter(asyncRouterMap, permissions) {
      const accessedRouters = asyncRouterMap.filter(route => {
        if (this.hasPermission(permissions, route)) {
          if (route.children && route.children.length) {
            route.children = this.filterAsyncRouter(route.children, permissions)
          }
          return true
        }
        return false
      })
      return accessedRouters
    },
    hasPermission(permissions, route) {
      if (route.meta && route.meta.permissions) {
        return permissions.some(item => route.meta.permissions.indexOf(item) >= 0)
      } else {
        return true
      }
    },
    GenerateRoutes(additionalRouter) {
      router.addRoutes(additionalRouter)
    },
    concatRoutes(constant, async) {
      return constant.concat(async)
    }
  }
})
