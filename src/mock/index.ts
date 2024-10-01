import fetchMock, { type MockRequest, type MockResponseObject } from 'fetch-mock'
import data from './data'
const option = { delay: 1000 }
import store from '@/store/AppStore'
const baseConfig = store.config
fetchMock.post(baseConfig.baseUrl + baseConfig.loginUrl, data.successResult, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.getEncodingUrl, data.getEncoding, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.submitEncodingFormUrl, data.successResult, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.getNetworkInfoUrl, data.getNetwork, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.submitNetworkFormUrl, data.successResult, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.getVersionInfoUrl, data.getVersion, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.getVideoInfoUrl, data.getVideo, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.submitVideoFormUrl, data.successResult, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.getRecordInfoUrl, data.getStore, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.submitRecordFormUrl, data.successResult, option)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.getUserCommunicationInfoUrl,
  data.getUserCommunication,
  option
)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.submitUserCommunicationFormUrl,
  (url: string, opts: MockRequest) => {
    const body = opts.body
    console.log('submit user communication payload:', body)
    return data.successResult
  },
  option
)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.submitSystemSettingFormUrl,
  data.successResult,
  option
)
fetchMock.post(baseConfig.baseUrl + baseConfig.sdCardClearUrl, data.successResult, option)
fetchMock.post(baseConfig.baseUrl + baseConfig.upgradeSystemFileUrl, data.successResult, option)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.ytControl,
  (url, request) => {
    console.log(url, request.body)
    return data.successResult
  },
  option
)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.cameraControl,
  (url, request) => {
    console.log(url, request.body)
    return data.successResult
  },
  option
)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.getSystemMaintenance,
  data.getSystemMaintenance,
  option
)
fetchMock.post(baseConfig.baseUrl + baseConfig.submitSystemMaintenance, data.successResult, option)
let progress = 0
const getProgress = () => {
  if (progress > 100) {
    progress = 0
    return progress
  }
  progress = progress + 10
  return progress
}
fetchMock.post(
  baseConfig.baseUrl + baseConfig.getUpProgress,
  () => data.getUpProgress(getProgress()),
  option
)
fetchMock.post(
  new RegExp('.*'),
  (url, request) => {
    console.log(url, request)
    return data.successResult
  },
  option
)
