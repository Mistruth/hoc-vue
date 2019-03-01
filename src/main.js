import Vue from 'vue'
import ElementUI from 'element-ui'
import '../public/css/theme/index.css'
import '@/assets/fonts/iconfont.css'
import NProgress from 'nprogress'
import messagebox from '@/components/MessageBox/index.js'
import components from '@/components/_general/index.js'
import * as filters from '@/filters/index.js'
import router from './router/index'
import bus from './store/index.js'
import detailBox from '@/components/DetailDialog'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

Vue.prototype.$delbox = messagebox
Vue.prototype.$detailbox = detailBox

Object.keys(components).forEach(key => {
  Vue.component(components[key].name, components[key])
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

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

Vue.prototype.$bus = bus
