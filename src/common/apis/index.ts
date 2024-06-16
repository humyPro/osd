import {
  type EncodingForm,
  type NetworkForm,
  type Result,
  type StorageForm,
  type UserCommunicationForm,
  type VencForm,
  type VideoForm,
  type VersionInfo
} from './modelTypes'
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

const resultParser = async (res: Response) => {
  let txt = await res.text()
  txt = `<a>${txt.replace('<?xml version="1.0" encoding="utf-8"?>', '')}</a>`
  const resJson = utils.xmlToJson<Result>(txt)
  return resJson
}

const getEncodingForm: () => Promise<EncodingForm> = () => {
  return request({
    url: `${config.baseUrl}${config.getEncodingUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><device_status></device_status>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<EncodingForm>(txt)
    }
  })
}

const submitEncodingForm = (index: number, form: VencForm) => {
  const resolutionRatio = form.resolutionRatio
  if (resolutionRatio) {
    const [width, height] = resolutionRatio.split('x')
    height && (form.vencHeight = parseInt(height))
    width && (form.vencWidth = parseInt(width))
  }
  const requestData = {
    encode: {
      ['venc_' + index]: form
    }
  }
  const data = utils.jsonToXml(requestData, utils.castFromCamelCase)

  return request<Result>({
    url: `${config.baseUrl}${config.submitEncodingFormUrl}`,
    method: 'post',
    body: data,
    respParser: resultParser
  })
}

const getNetworkInfo = () => {
  return request({
    url: `${config.baseUrl}${config.getNetworkInfoUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><network></network>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<NetworkForm>(txt)
    }
  })
}

const submitNetworkForm = (form: NetworkForm) => {
  const data = utils.jsonToXml(form, utils.castFromCamelCase)
  return request<Result>({
    url: `${config.baseUrl}${config.submitEncodingFormUrl}`,
    method: 'post',
    body: data,
    respParser: resultParser
  })
}

const getVideoInfo = () => {
  type videoInfo = {
    video: VideoForm[]
  }
  return request({
    url: `${config.baseUrl}${config.getVideoInfoUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><video></video>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<videoInfo>(txt).video
    }
  })
}
const submitVideoInfo = (data: { video: { index: number } & VideoForm }) => {
  return request<Result>({
    url: `${config.baseUrl}${config.submitVideoFormUrl}`,
    method: 'post',
    body: utils.jsonToXml(data, utils.castFromCamelCase),
    respParser: resultParser
  })
}
const getVersionInfo = () => {
  return request({
    url: `${config.baseUrl}${config.getVersionInfoUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><get_version></get_version>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<VersionInfo>(txt)
    }
  })
}

/**
 *
 * @param type 1: 重启，2: 恢复出厂
 * @returns
 */
const systemSetting = (type: number) => {
  return request({
    url: `${config.baseUrl}${config.submitSystemSettingFormUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><system_set>${type}</system_set>`,
    respParser: resultParser
  })
}

const getUserCommunicationInfo = () => {
  return request({
    url: `${config.baseUrl}${config.getUserCommunicationInfoUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><communication></communication>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<UserCommunicationForm>(txt)
    }
  })
}

const submitUserCommunicationForm = (form: UserCommunicationForm) => {
  return request<Result>({
    url: `${config.baseUrl}${config.submitUserCommunicationFormUrl}`,
    method: 'post',
    body: utils.jsonToXml({ communication: form }, utils.castFromCamelCase),
    respParser: resultParser
  })
}

const getStorageInfo = () => {
  return request({
    url: `${config.baseUrl}${config.getRecordInfoUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><get_record></get_record>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<StorageForm>(txt)
    }
  })
}

const submitStorageForm = (form: StorageForm) => {
  return request<Result>({
    url: `${config.baseUrl}${config.submitRecordFormUrl}`,
    method: 'post',
    body: utils.jsonToXml({ record: form }, utils.castFromCamelCase),
    respParser: resultParser
  })
}

const formatDisk = () => {
  //格式化
  return request<Result>({
    url: `${config.baseUrl}${config.sdCardClearUrl}`,
    method: 'post',
    body: `<?xml version="1.0" encoding="utf-8"?><format></format>`,
    respParser: resultParser
  })
}
export default {
  request,
  getEncodingForm,
  submitEncodingForm,
  getNetworkInfo,
  submitNetworkForm,
  getVideoInfo,
  submitVideoInfo,
  getVersionInfo,
  systemSetting,
  getUserCommunicationInfo,
  submitUserCommunicationForm,
  getStorageInfo,
  submitStorageForm,
  formatDisk
}
