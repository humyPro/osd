import router from '@/router'

const authIntercepter: (request: { url: string }, resp: Response) => Promise<Response> = (
  _,
  res
) => {
  if (res.status === 401) {
    router.replace('/login')
    throw new Error('认证过期，请重新登录')
  }
  return (async () => res)()
}

export default { authIntercepter }
