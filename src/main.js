import Vue from 'vue'
import App from './App.vue'
import './lazy'
import router from './router'
import store from './store'
import './mock'
import './global.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
