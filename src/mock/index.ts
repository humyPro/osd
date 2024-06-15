import fetchMock from 'fetch-mock'
import data from './data'
const option = { delay: 2000 }

const baseConfig = {
  baseUrl: 'http://127.0.0.1:5173',
  getEncodingUrl: '/get_status?type=device_status',
  submitEncodingFormUrl: '/set_codec?type=venc',
  getNetworkInfoUrl: '/get_codec?type=network',
  submitNetworkFormUrl: '/set_net',
  getVideoInfoUrl: '/get_codec?type=video',
  submitVideoFormUrl: '/set_codec?type=video',
  getVersionInfoUrl: '/get_version',
  submitSystemSettingFormUrl: '/system_set',
  getUserCommunicationInfoUrl: '/get_codec?type=communication',
  submitUserCommunicationFormUrl: '/set_codec?type=communication',
  getRecordInfoUrl: '/get_codec?type=record',
  submitRecordFormUrl: '/set_codec?type=record',
  sdCardClearUrl: '/set_codec?type=sdcard_clear'
}

fetchMock.mock(
  {
    url: '/static/config.json',
    ...option
  },
  () => {
    return baseConfig
  },
  option
)
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
  data.successResult,
  option
)
fetchMock.post(
  baseConfig.baseUrl + baseConfig.submitSystemSettingFormUrl,
  data.successResult,
  option
)
fetchMock.post(baseConfig.baseUrl + baseConfig.sdCardClearUrl, data.successResult, option)
