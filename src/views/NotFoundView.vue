<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="content-404">
        <el-image style="width: 100px; height: 100px" :src="notFoundSvg" />
        <el-text type="info">{{ t('notFound.message') }}</el-text>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import notFoundSvg from '@/assets/images/404.svg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<style scoped>
.content-404 {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
