import util from '../util'
import '@/mock'

export type RequestType<T> = {
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
export const request = async <T>(params: RequestType<T>): Promise<T> => {
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
      console.log(e)
      util.showMessage('网络异常，无法连接到服务器', 'error')
      return Promise.reject(e)
    })
}
