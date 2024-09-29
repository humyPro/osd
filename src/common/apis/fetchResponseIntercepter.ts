import router from '@/router'
import util from '../util'

const whiteList = ['']
const authIntercepter: (request: { url: string }, resp: Response) => Promise<Response> = (
  { url },
  res
) => {
  if (res.status === 401) {
    router.push('/login')
    util.showMessage('认证过期，请重新登录', 'error')
  }
  return Promise.resolve(res)
}

export default { authIntercepter }
