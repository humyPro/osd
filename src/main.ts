import 'element-plus/dist/index.css'
import '@/style/common.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './store/AppStore'

const app = createApp(App)
app.use(router)
app.mount('#app')
