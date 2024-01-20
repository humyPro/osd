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
import { House, Tickets, UploadFilled, Coin, Link, Setting, More } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
export default {
  data() {
    return {
      activeIndex: '/home',
      menus: [
        {
          label: '首页',
          path: '/home',
          icon: markRaw(House)
        },
        {
          label: '协议设置',
          path: '/encoding',
          icon: markRaw(Tickets)
        },
        {
          label: '推流设置',
          path: '/rtmp',
          icon: markRaw(UploadFilled)
        },
        {
          label: '资源设置',
          path: '/source',
          icon: markRaw(Coin)
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
        },
        {
          label: '附加功能',
          path: '/additional',
          icon: markRaw(More)
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
