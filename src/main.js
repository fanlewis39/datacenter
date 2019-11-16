import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI from 'view-design'
import ECharts from './echarts'

import './style/index.scss'

if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

Vue.use(ViewUI, {
  transfer: true
})

Vue.component('Chart', ECharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
