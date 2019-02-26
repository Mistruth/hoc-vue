import Vue from 'vue'
import App from '../App.vue'
import router from '@/router/index.js'

export default new Vue({
  data() {
    return {

    }
  },
  created() {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  },
  methods: {
  }
})
