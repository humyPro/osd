import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: 'zh-CN', // 默认语言
    availableLocales: ['en', 'zh-CN'] // 支持的语言列表
  }),
  actions: {
    setLocale(locale: string) {
      if (this.availableLocales.includes(locale)) {
        this.currentLocale = locale
        localStorage.setItem('userLang', locale)
      }
    }
  }
})
