import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '../public/css/theme/index.css'
import NProgress from 'nprogress'
import router from './router/index'
Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

Vue.prototype.$bus = new Vue()

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  // 请求用户数据
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
  window.scrollTo(0, 0)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
