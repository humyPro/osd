<template>
  <el-row class="menu-box">
    <el-col :span="24">
      <el-menu :default-active="$route.path" class="menu-bar" :router="true">
        <el-menu-item :index="menu.path" v-for="menu in menus" :key="menu.label">
          <el-icon><component :is="menu.icon"></component></el-icon>
          <span>{{ menu.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ScaleToOriginal, VideoPlay, Link, Setting, HelpFilled } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const menus = [
  {
    label: t('menu.encoding'),
    path: '/encoding',
    icon: markRaw(ScaleToOriginal)
  },
  {
    label: t('menu.video'),
    path: '/video',
    icon: markRaw(VideoPlay)
  },
  {
    label: t('menu.gimbal'),
    path: '/control',
    icon: markRaw(HelpFilled)
  },
  {
    label: t('menu.network'),
    path: '/network',
    icon: markRaw(Link)
  },
  {
    label: t('menu.system'),
    path: '/system',
    icon: markRaw(Setting)
  }
]
</script>
<style scoped>
.menu-bar {
  height: 100vh;
}
</style>
