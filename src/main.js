import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
axios.defaults.baseURL = 'http://127.0.0.1:8081/api/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

axios.interceptors.response.use(response => {
  NProgress.done()
  if (response.data.code === 222 || response.data.code === 111) {
    ElementUI.Message.error('登录信息已过期，请重新登录!')
    router.push('/login')
    return
  }
  return response
})

Vue.filter('formatTime', time => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const d = (date.getDate() + '').padStart(2, '0')

  const hh = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
