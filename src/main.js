import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './assets/scss/style.scss'

Vue.config.productionTip = false

Vue.prototype.ZoomMtg = window.ZoomMtg;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
