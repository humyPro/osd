import type { EncodingForm, NetworkForm, VencForm } from './modelTypes'
import utils from '@/common/util'
import { request } from './common'
import store from '@/store/AppStore'
const config = store.config
const castFormKey = (form: {}) => {
  return Object.entries(form).reduce(
    (pre, [key, value]) => {
      pre[utils.castFromCamelCase(key.toString())] = value
      return pre
    },
    {} as Record<string, any>
  )
}

const getEncodingForm: () => Promise<EncodingForm> = () => {
  type FormType = { deviceStatus: EncodingForm }
  return request({
    url: `${config.baseUrl}${config.getEncodingUrl}`,
    method: 'get',
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<FormType>(txt).deviceStatus
    }
  })
}

const submitEncodingForm = (index: number, form: VencForm) => {
  const resolutionRatio = form.resolutionRatio
  if (resolutionRatio) {
    const [heigth, width] = resolutionRatio.split('x')
    heigth && (form.vencHeight = parseInt(heigth))
    width && (form.vencWidth = parseInt(width))
  }
  const queryFromForm = castFormKey(form)

  const query = { type: 'venc', index: index, ...queryFromForm }
  return request<void>({
    url: `${config.baseUrl}${config.submitEncodingFormUrl}`,
    method: 'get',
    query
  })
}

const getNetworkInfo: () => Promise<NetworkForm> = () => {
  return request({
    url: `${config.baseUrl}${config.getNetworkInfoUrl}`,
    method: 'get'
  })
}

export default {
  request,
  getEncodingForm,
  submitEncodingForm,
  getNetworkInfo
}
