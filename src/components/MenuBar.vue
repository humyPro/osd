<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo menu-bar" :router="true">
        <el-menu-item :index="menu.path" v-for="menu in menus" :key="menu.label">
          <el-icon><component :is="menu.icon"></component></el-icon>
          <span>{{ menu.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { House, VideoPlay, Link, Setting, HelpFilled } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
export default {
  data() {
    return {
      activeIndex: '/encoding',
      menus: [
        {
          label: '编码设置',
          path: '/encoding',
          icon: markRaw(House)
        },
        {
          label: '视频设置',
          path: '/video',
          icon: markRaw(VideoPlay)
        },
        {
          label: '云台控制',
          path: '/control',
          icon: markRaw(HelpFilled)
        },
        {
          label: '网络设置',
          path: '/network',
          icon: markRaw(Link)
        },
        {
          label: '系统设置',
          path: '/system',
          icon: markRaw(Setting)
        }
      ]
    }
  }
}
</script>
<style scoped>
.menu-bar {
  height: 100vh;
}
</style>
