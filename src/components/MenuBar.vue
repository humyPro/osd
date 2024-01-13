<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo menu-bar"
        background-color="#545c64"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item :index="menu.path" v-for="menu in menus">
          <el-icon><component :is="menu.icon"></component></el-icon>
          <span>{{ menu.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { House, Operation, UploadFilled, Coin, Link, Setting, More } from '@element-plus/icons-vue'
import { markRaw } from 'vue'
export default {
  data() {
    return {
      menus: [
        {
          label: '首页',
          path: '/home',
          icon: markRaw(House)
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
  },
  methods: {
    handleClose(key: string, keyPath: string[]) {},
    handleOpen(key: string, keyPath: string[]) {
      console.log(key, keyPath)
      this.$router.push(key)
    }
  }
}
</script>
<style scoped>
.menu-bar {
  height: 100vh;
}
</style>
