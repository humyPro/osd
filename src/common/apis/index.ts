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
const mock = true
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

type aResult = {
  a: Result
}
const resultParser = async (res: Response) => {
  let txt = await res.text()
  txt = `<a>${txt.replace('<?xml version="1.0" encoding="utf-8"?>', '')}</a>`
  const resJson = utils.xmlToJson<aResult>(txt)
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

const test = () => {
  const str = `<?xml version="1.0" encoding="utf-8"?>
  <video>
      <video_0>
          <udp_h26x>
              <h26x_en>1</h26x_en> 
              <h26x_mode>0</h26x_mode> <!-- 0:单播；1：主播；2：广播 -->
              <h26x_src_port>5000</h26x_src_port>
              <h26x_dst_ip>235.0.0.0</h26x_dst_ip>
              <h26x_dst_port>5000</h26x_dst_port>
              <h26x_send_len>200</h26x_send_len>
              <h26x_send_interval>60</h26x_send_interval>
          </udp_h26x>
          <udp_ts>
              <ts_en>0</ts_en>
              <ts_mode>0</ts_mode>
              <ts_src_port>5000</ts_src_port>
              <ts_dst_ip>235.0.0.0</ts_dst_ip>
              <ts_dst_port>5000</ts_dst_port>
              <ts_send_len>200</ts_send_len>
              <ts_send_interval>60</ts_send_interval>
          </udp_ts>
          <rtsp>
              <rtsp_en>1</rtsp_en>
              <rtsp_port>5000</rtsp_port>
              <trans_mode>0</trans_mode><!-- 0:udp; 1:tcp -->
              <stream_name>stream0</stream_name>
              <user_size>5</user_size>
              <keep_alive>30</keep_alive>
          </rtsp>
          <rtmp>
              <rtmp_en>0</rtmp_en>
              <rtmp_url>rtmp://192.168.0.500/stream0.flv</rtmp_url>
          </rtmp>
          <gb28181>
              <gb_en>0</gb_en>
              <gb_server_ip>192.168.0.1</gb_server_ip>
              <gb_server_port>8888</gb_server_port>
              <gb_server_id>5000</gb_server_id>
              <gb_period>2000</gb_period>
              <heart_beat>60</heart_beat>
              <local_sip_port>6666</local_sip_port>
              <gb_auth_id>22222222</gb_auth_id>
              <gb_passwd>1234</gb_passwd>
          </gb28181>
      </video_0>
      <video_1>
      <!-- 同video_0 -->
      </video_1>
      <video_2>
      <!-- 同video_0 -->
      </video_2>
  </video>`
  const json = utils.xmlToJson(str)
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
