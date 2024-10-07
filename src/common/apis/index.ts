import {
  type EncodingForm,
  type NetworkForm,
  type Result,
  type StorageForm,
  type UserCommunicationForm,
  type VencForm,
  type VideoForm,
  type VersionInfo,
  type SystemMaintenance,
  type UpProgress
} from './modelTypes'
import utils from '@/common/util'
import { request } from './common'
import { useAppConfig } from '@/store/AppStore'
const xmlHeader = `<?xml version="1.0" encoding="utf-8"?>`
const getConfig = () => {
  return useAppConfig().config
}

const resultParser = async (res: Response) => {
  let txt = await res.text()
  txt = `<a>${txt.replace(xmlHeader, '')}</a>`
  const resJson = utils.xmlToJson<Result>(txt)
  return resJson
}

const login: (account: string, password: string) => Promise<Result> = (
  account: string,
  password: string
) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().loginUrl}`,
    method: 'post',
    body: `${xmlHeader}<logon><user>${account}</user><passwd>${password}</passwd></logon>`,
    respParser: resultParser
  })
}

const getEncodingForm: () => Promise<EncodingForm> = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getEncodingUrl}`,
    method: 'post',
    body: `${xmlHeader}<device_status></device_status>`,
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
    url: `${getConfig().baseUrl}${getConfig().submitEncodingFormUrl}`,
    method: 'post',
    body: data,
    respParser: resultParser
  })
}

const getNetworkInfo = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getNetworkInfoUrl}`,
    method: 'post',
    body: `${xmlHeader}<network></network>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<NetworkForm>(txt)
    }
  })
}

const submitNetworkForm = (form: NetworkForm) => {
  const data = utils.jsonToXml(form, utils.castFromCamelCase)
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().submitNetworkFormUrl}`,
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
    url: `${getConfig().baseUrl}${getConfig().getVideoInfoUrl}`,
    method: 'post',
    body: `${xmlHeader}<video></video>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<videoInfo>(txt).video
    }
  })
}
const submitVideoInfo = (data: { video: { index: number } & VideoForm }) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().submitVideoFormUrl}`,
    method: 'post',
    body: utils.jsonToXml(data, utils.castFromCamelCase),
    respParser: resultParser
  })
}
const getVersionInfo = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getVersionInfoUrl}`,
    method: 'post',
    body: `${xmlHeader}<get_version></get_version>`,
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
    url: `${getConfig().baseUrl}${getConfig().submitSystemSettingFormUrl}`,
    method: 'post',
    body: `${xmlHeader}<system_set>${type}</system_set>`,
    respParser: resultParser
  })
}

const getUserCommunicationInfo = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getUserCommunicationInfoUrl}`,
    method: 'post',
    body: `${xmlHeader}<communication></communication>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<UserCommunicationForm>(txt)
    }
  })
}

const submitUserCommunicationForm = (form: UserCommunicationForm) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().submitUserCommunicationFormUrl}`,
    method: 'post',
    body: utils.jsonToXml({ communication: form }, utils.castFromCamelCase),
    respParser: resultParser
  })
}

const getStorageInfo = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getRecordInfoUrl}`,
    method: 'post',
    body: `${xmlHeader}<get_record></get_record>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<StorageForm>(txt)
    }
  })
}

const submitStorageForm = (form: StorageForm) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().submitRecordFormUrl}`,
    method: 'post',
    body: utils.jsonToXml({ record: form }, utils.castFromCamelCase),
    respParser: resultParser
  })
}

const formatDisk = () => {
  //格式化
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().sdCardClearUrl}`,
    method: 'post',
    body: `${xmlHeader}<format></format>`,
    respParser: resultParser
  })
}
const getUpProgress = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getUpProgress}`,
    method: 'post',
    body: utils.jsonToXml({ getUpgrade: { upProgress: 0 } }, utils.castFromCamelCase),
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<UpProgress>(txt)
    }
  })
}

const getSystemMaintenanceInfo = () => {
  return request({
    url: `${getConfig().baseUrl}${getConfig().getSystemMaintenance}`,
    method: 'post',
    body: `${xmlHeader}<maintenance></maintenance>`,
    respParser: async (response: Response) => {
      const txt = await response.text()
      return utils.xmlToJson<SystemMaintenance>(txt)
    }
  })
}

const submitSystemMaintenance = (form: SystemMaintenance) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().submitSystemMaintenance}`,
    method: 'post',
    body: utils.jsonToXml({ maintenance: form }, utils.castFromCamelCase),
    respParser: resultParser
  })
}
// 根据类型提交系统维护页面表单
const submitSplitSystemMaintenanceForm = (type: string, form: Record<string, any>) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().submitSplitSystemMaintenanceForm}`,
    query: { type: type },
    method: 'post',
    body: utils.jsonToXml(form, utils.castFromCamelCase),
    respParser: resultParser
  })
}

const ytControlAction = (action: string) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().ytControl}`,
    method: 'post',
    body: `${xmlHeader}<ptz><action>${action}</action></ptz>`,
    respParser: resultParser
  })
}
const submitCameraAction = (device: number, action: number) => {
  return request<Result>({
    url: `${getConfig().baseUrl}${getConfig().cameraControl}`,
    method: 'post',
    body: `${xmlHeader}<lens_ctl><dev>${device}</dev><op>${action}</op></lens_ctl>`,
    respParser: resultParser
  })
}
export default {
  request,
  login,
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
  formatDisk,
  getSystemMaintenanceInfo,
  submitSystemMaintenance,
  submitSplitSystemMaintenanceForm,
  ytControlAction,
  submitCameraAction,
  getUpProgress
}
