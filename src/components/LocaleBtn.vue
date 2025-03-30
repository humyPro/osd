<template>
  <div class="changeLang">
    <el-button
      type="text"
      :disabled="currentLocale.currentLocale === 'zh-CN'"
      @click="changeLocale('zh-CN')"
      >中文</el-button
    >
    <el-button
      type="text"
      :disabled="currentLocale.currentLocale === 'en'"
      @click="changeLocale('en')"
      >English</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { useLocaleStore } from '@/store/locale'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const currentLocale = useLocaleStore()
const changeLocale = (lang: string) => {
  currentLocale.setLocale(lang)
  locale.value = lang
}
</script>

<style scoped>
.changeLang {
  position: fixed;
  top: 0;
  right: 40px;
  z-index: 1000;
}
</style>
