import 'element-plus/dist/index.css'
import '@/style/common.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAppConfig } from './store/AppStore'
import { createPinia } from 'pinia'
const env = import.meta.env.VITE_ENV
const app = createApp(App)
app.use(router)
const pinia = createPinia()
app.use(pinia)
fetch('/static/config.json')
  .then((res) => {
    return res.json()
  })
  .then((config) => {
    if (config) {
      useAppConfig().setBaseUrl(config.baseUrl)
    }
    mock()
    app.mount('#app')
  })

const mock = () => {
  if (env === 'development') {
    import('@/mock')
    console.warn('mock数据加载完毕')
  } else {
    console.warn('mock数据未加载')
  }
}
