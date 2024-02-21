import { createRouter, createWebHistory } from 'vue-router'
import EncodingView from '@/views/EncodingView.vue'
import NetworkView from '@/views/NetworkView.vue'
import SystemView from '@/views/SystemView.vue'
import VideoView from '@/views/VideoView.vue'
import ControlView from '@/views/ControlView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/encoding'
    },
    {
      path: '/encoding',
      name: '编码设置',
      component: EncodingView
    },
    {
      path: '/video',
      name: '视频设置',
      component: VideoView
    },
    {
      name: '云台控制',
      path: '/control',
      component: ControlView
    },
    {
      name: '网络设置',
      path: '/network',
      component: NetworkView
    },
    {
      name: '系统设置',
      path: '/system',
      component: SystemView
    }
  ]
})

export default router
