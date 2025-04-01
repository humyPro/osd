import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import { useLocaleStore } from '@/store/locale'
function getBrowserLanguage() {
  const l = localStorage.getItem('userLang') || ''
  if (['zh-CN', 'en'].includes(l)) {
    return l
  }
  const lang = navigator.language
  return lang.startsWith('zh') ? 'zh-CN' : 'en' // 只支持中英文
}
export async function setupI18n(app: App<Element>) {
  const lang = getBrowserLanguage()
  const localeStore = useLocaleStore()
  localeStore.setLocale(lang)
  // 动态加载语言文件
  const messages = {
    en: await import('@/locales/en.json'),
    'zh-CN': await import('@/locales/zh-CN.json')
  }

  const i18n = createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'zh-CN',
    messages
  })

  app.use(i18n)
}
