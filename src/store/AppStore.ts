import apis from '@/common/apis'
type ConfigType = {
  baseUrl: string
  getEncodingUrl: string
  submitEncodingFormUrl: string
}

const res = await apis.request<ConfigType>({ url: '/static/config.json', method: 'get' })

const store = reactive({
  config: res
})
export default store
