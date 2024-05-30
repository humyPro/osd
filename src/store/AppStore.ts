import { request } from '@/common/apis/common'
import configJson from '@/../public/static/config.json'
type ConfigType = typeof configJson

const res = await request<ConfigType>({ url: '/static/config.json', method: 'get' })

const store = reactive({
  config: res
})
export default store
