<template>
  <div class="changeLang">
    <el-button type="text" :disabled="localLang === 'zh-CN'" @click="changeLang('zh-CN')"
      >中文</el-button
    >
    <el-button type="text" :disabled="localLang === 'en'" @click="changeLang('en')"
      >English</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

function getBrowserLanguage() {
  const l = localStorage.getItem('userLang') || ''
  if (['zh-CN', 'en'].includes(l)) {
    return l
  }
  const lang = navigator.language
  return lang.startsWith('zh') ? 'zh-CN' : 'en' // 只支持中英文
}

const localLang = ref(getBrowserLanguage())
const changeLang = (lang: string) => {
  locale.value = lang
  localLang.value = lang
  localStorage.setItem('userLang', lang) // 持久化存储
}
onMounted(()=>{
  changeLang(localLang.value)
})
</script>

<style scoped>
.changeLang {
  position: fixed;
  top: 0;
  right: 40px;
  z-index: 1000;
}
</style>
