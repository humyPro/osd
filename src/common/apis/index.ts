import type { EncodingForm } from './modelTypes'
import confis from '../configs'

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
    credentials: 'same-origin',
    method
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
  return fetch(url, init).then((response) => {
    if (respParser) {
      return respParser(response)
    }
    return response.json() as Promise<T>
  })
}
/**
 * XML转换为json
 * @param xmlString
 * @returns
 */
const xmlToJson = (xmlString: string) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
  const json: { [key: string]: any } = {}
  const parseElement = function (element: Node) {
    if (element.hasChildNodes()) {
      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i]
        if (child.nodeType === 1) {
          if (child.hasChildNodes()) {
            json[child.nodeName] = parseElement(child)
          } else {
            json[child.nodeName] = child.textContent
          }
        }
      }
    }
  }
  parseElement(xmlDoc)
  return json
}

const getEncodingForm: () => Promise<EncodingForm> = () => {
  return request({
    url: `${confis.serverHost}/api`,
    method: 'get',
    respParser: (response: Response) => {
      return response.json() as Promise<EncodingForm>
    }
  })
}

export default {
  getEncodingForm,
  xmlToJson
}
