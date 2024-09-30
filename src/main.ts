import 'element-plus/dist/index.css'
import '@/style/common.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './store/AppStore'
const env = import.meta.env.VITE_ENV
if (env === 'development') {
  import('@/mock')
  console.warn('mock数据加载完毕')
} else {
  console.warn('mock数据未加载')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
