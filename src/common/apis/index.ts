import type { EncodingForm } from './modelTypes'
import confis from '../configs'

type methodType = 'get' | 'post' | 'put' | 'delete'

const request = <T>(params: {
  url: string
  method: methodType
  timeout?: number
  respParser?: (resp: Response) => Promise<T>
}): Promise<T> => {
  const { url, method, timeout, respParser } = params
  const init: RequestInit = {
    credentials: 'same-origin',
    method
  }
  if (timeout !== undefined) {
    let abort: (() => void) | null = null
    const abortPromise = new Promise((resolve, reject) => {
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

const getEncodingForm: () => Promise<EncodingForm> = () => {
  return request({
    url: `${confis.serverHost}/api`,
    method: 'get',
    respParser: (response: Response) => {
      return response.json() as Promise<EncodingForm>
    }
  })
}

getEncodingForm()
