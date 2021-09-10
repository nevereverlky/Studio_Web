import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import Vuex from 'vuex'
import axios from 'axios'
// import VueAxios from 'vue-axios'
// import qs from 'QS'

import './assets/css/style.css'

// Vue.use(ElementUI)
// Vue.use(VueAxios)
// Vue.use(axios)
// Vue.use(Vuex)
// Vue.prototype.$axios = axios
// Vue.prototype.$qs = qs
//配置请求的根路径
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  //时间格式年月日、时分秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// vue实例化
var vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    App
  }
}).$mount('#app')
// 导出vue
export default vue;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
