import type { EncodingForm, NetworkForm, VencForm } from './modelTypes'
import utils from '@/common/util'
import config from '@/../public/static/config.json'
import util from '@/common/util'
type RequestType<T> = {
  url: string // 请求地址
  method: 'get' | 'post' | 'put' | 'delete'
  body?: BodyInit | null
  query?: Record<string, any>
  timeout?: number //超时时间
  respParser?: (resp: Response) => Promise<T> // 自定义的response解析
}
/**
 *  通用request方法
 * @param params
 * @returns
 */
const request = async <T>(params: RequestType<T>): Promise<T> => {
  const { url, method, timeout, query, body, respParser } = params
  let requestUrl = url
  if (query) {
    const urlObj = new URL(url)
    const searchParams = urlObj.searchParams
    for (const [key, value] of Object.entries(query)) {
      if (value != null && value != undefined) {
        searchParams.append(key, value.toString())
      }
    }
    urlObj.search = searchParams.toString()
    requestUrl = urlObj.toString()
  }
  const init: RequestInit = {
    // credentials: 'include',
    method,
    headers: {
      'Content-type': 'application/json'
    },
    mode: 'cors',
    body: body
  }
  if (timeout) {
    let abort: (() => void) | null = null
    const abortPromise = new Promise((_resolve, reject) => {
      abort = () => reject(new Error('请求超时'))
    })
    const result = Promise.race([
      fetch(requestUrl, init).then((response) => response.json() as Promise<T>),
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
  return fetch(requestUrl, init)
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
    .catch((e) => {
      console.log(e)
      util.showMessage('网络异常，无法连接到服务器', 'error')
      throw e
    })
}

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
