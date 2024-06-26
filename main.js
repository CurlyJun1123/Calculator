import App from './App'
import http from './utils/service'

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$http = http
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0])
          } else {
            resolve(res[1])
          }
        })
      })
    }
  })
} catch (error) {}

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.$http = http
  app.config.globalProperties.$static = 'http://8.134.9.215/prod-api'
  return { app }
}
// #endif
