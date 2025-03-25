import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhCN from './zh-CN.json'
const messages = {
  en,
  'zh-CN': zhCN
}
const i18n = createI18n({
  legacy: false, // 启用 Composition API 模式（Vue 3 需要）
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages
})

export default i18n
