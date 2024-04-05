import { createRouter, createWebHistory } from 'vue-router'
import EncodingView from '@/views/EncodingView.vue'
import NetworkView from '@/views/NetworkView.vue'
import SystemView from '@/views/SystemView.vue'
import VideoView from '@/views/VideoView.vue'
import ControlView from '@/views/ControlView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoginView from '@/views/LoginView.vue'
import util from '@/common/util'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: LoginView
    },

    {
      path: '/encoding',
      name: '编码设置',
      component: EncodingView,
      meta: {
        KeepAlive: true
      }
    },
    {
      path: '/video',
      name: '视频设置',
      component: VideoView,
      meta: {
        KeepAlive: true
      }
    },
    {
      name: '云台控制',
      path: '/control',
      component: ControlView,
      meta: {
        KeepAlive: true
      }
    },
    {
      name: '网络设置',
      path: '/network',
      component: NetworkView,
      meta: {
        KeepAlive: true
      }
    },
    {
      name: '系统设置',
      path: '/system',
      component: SystemView,
      meta: {
        KeepAlive: true
      }
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (
    // 检查用户是否已登录 'jta123k', 't1jhasd89dkj-u1h31k29asdkja'
    util.getStorage('jta123k') !== util.getToken() &&
    to.name !== '登录'
  ) {
    // 将用户重定向到登录页面
    return { name: '登录' }
  }
})

export default router
