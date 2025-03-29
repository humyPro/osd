import configJson from '@/router/config.json'
import { defineStore } from 'pinia'
export const useAppConfig = defineStore('appConfig', {
  state: () => ({
    config: configJson
  }),
  actions: {
    setBaseUrl(url: string) {
      this.config.baseUrl = url
    }
  }
})
