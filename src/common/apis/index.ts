import type { EncodingForm } from './modelTypes'
import utils from '@/common/util'
import requestUrl from './requestUrl'
type RequestType<T> = {
  url: string // 请求地址
  method: 'get' | 'post' | 'put' | 'delete'
  timeout?: number //超时时间
  respParser?: (resp: Response) => Promise<T> // 自定义的response解析
}
/**
 *  通用request方法
 * @param params
 * @returns
 */
const request = async <T>(params: RequestType<T>): Promise<T> => {
  const { url, method, timeout, respParser } = params
  const init: RequestInit = {
    // credentials: 'include',
    method,
    headers: {
      'Content-type': 'application/json'
    },
    mode: 'cors'
  }
  if (timeout) {
    let abort: (() => void) | null = null
    const abortPromise = new Promise((_resolve, reject) => {
      abort = () => reject(new Error('请求超时'))
    })
    const result = Promise.race([
      fetch(url, init).then((response) => response.json() as Promise<T>),
      abortPromise
    ])
    const timer = setTimeout(() => {
      abort && abort()
    }, timeout)

    return result.then((res) => {
      clearTimeout(timer)
      return res as Promise<T>
    })
  }
  return fetch(url, init)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response)
      }
      if (respParser) {
        return respParser(response)
      }
      return response.json() as Promise<T>
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

const getEncodingForm: () => Promise<EncodingForm> = () => {
  // return request({
  //   url: `${requestUrl.baseUrl}${requestUrl.getEncodingInfo}`,
  //   method: 'get',
  //   respParser: (response: Response) => {
  //     return response.json() as Promise<EncodingForm>
  //   }
  // })
  const resp = `<?xml version="1.0" encoding="utf-8"?><device_status><url><ts_0>ts disable</ts_0><rtsp_0>rtsp://192.168.1.100:554/stream0</rtsp_0><rtp_0>rtp disable</rtp_0><ts_1>ts disable</ts_1><rtsp_1>rtsp://192.168.1.100:554/stream1</rtsp_1><rtp_1>rtp disable</rtp_1><ts_2>ts disable</ts_2><rtsp_2>rtsp://192.168.1.100:554/stream2</rtsp_2></url><encode><venc_0><enType>96</enType><venc_aspect_ration>0</venc_aspect_ration><venc_bitrate>0</venc_bitrate><venc_framerate>0</venc_framerate><venc_gop>0</venc_gop><venc_width>0</venc_width><venc_height>0</venc_height><venc_profile>0</venc_profile><venc_rc_mode>0</venc_rc_mode><venc_max_qp>32</venc_max_qp><venc_min_i_qp>5</venc_min_i_qp><venc_min_qp>5</venc_min_qp></venc_0><venc_1><enType>96</enType><venc_aspect_ration>0</venc_aspect_ration><venc_bitrate>2000</venc_bitrate><venc_framerate>30</venc_framerate><venc_gop>150</venc_gop><venc_width>1920</venc_width><venc_height>1080</venc_height><venc_profile>0</venc_profile><venc_rc_mode>0</venc_rc_mode><venc_max_qp>32</venc_max_qp><venc_min_i_qp>5</venc_min_i_qp><venc_min_qp>5</venc_min_qp></venc_1><venc_2><enType>96</enType><venc_aspect_ration>0</venc_aspect_ration><venc_bitrate>2000</venc_bitrate><venc_framerate>30</venc_framerate><venc_gop>150</venc_gop><venc_width>1920</venc_width><venc_height>1080</venc_height><venc_profile>0</venc_profile><venc_rc_mode>0</venc_rc_mode><venc_max_qp>32</venc_max_qp><venc_min_i_qp>5</venc_min_i_qp><venc_min_qp>5</venc_min_qp></venc_2></encode><audio><audio_type>1</audio_type><aenc_bitrate>128000</aenc_bitrate><audio_channel>0</audio_channel><is_he_aac>1</is_he_aac></audio><video><hdmi_video_size>1920 * 1080P</hdmi_video_size><hdmi_video_fps>30</hdmi_video_fps><venc_size_1>9999 * 9999</venc_size_1><venc_fps_1>100</venc_fps_1><venc_size_2>640 * 512</venc_size_2><venc_fps_2>5</venc_fps_2></video></device_status>`
  return new Promise(() => utils.xmlToJson<EncodingForm>(resp))
}

export default {
  getEncodingForm
}
