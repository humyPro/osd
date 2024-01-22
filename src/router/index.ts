import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EncodingSetting from '@/views/EncodingSetting.vue'
import RtmpView from '@/views/RtmpView.vue'
import SourceView from '@/views/SourceView.vue'
import NetworkView from '@/views/NetworkView.vue'
import SystemView from '@/views/SystemView.vue'
import AdditionalView from '@/views/AdditionalView.vue'
import VideoViewVue from '@/views/VideoView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, 
    {
      path: '/home',
      name: '编码设置',
      component: HomeView
    }, {
      path: '/video',
      name: '视频设置',
      component: VideoViewVue
    }, 
    {
      path: '/encoding',
      name: '协议设置',
      component: EncodingSetting
    },
    {
      name: '推流设置',
      path: '/rtmp',
      component: RtmpView
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
    },
    {
      name: '附加功能',
      path: '/additional',
      component: AdditionalView
    }
  ]
})

export default router
