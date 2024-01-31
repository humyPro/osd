import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SourceView from '@/views/SourceView.vue'
import NetworkView from '@/views/NetworkView.vue'
import SystemView from '@/views/SystemView.vue'
import VideoViewVue from '@/views/VideoView.vue'
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
      component: HomeView
    }, {
      path: '/video',
      name: '视频设置',
      component: VideoViewVue
    }, 
    {
      name: '资源设置',
      path: '/source',
      component: SourceView
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
