import { ElMessage } from 'element-plus'
import xml2js from 'xml2js'
type MessageType = 'success' | 'warning' | 'error' | 'info'
const showMessage = (message: string, type: MessageType = 'success') => {
  ElMessage({
    type,
    message
  })
}

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
let currentToken: string
const setToken = (token: string) => {
  currentToken = token
}
const getToken = () => currentToken

const saveStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}
const getStorage = (key: string) => {
  return localStorage.getItem(key)
}

const xmlToJson = <T>(xml: string) => {
  const parser = new DOMParser()
  const result = {} as any
  const xmlDoc = parser.parseFromString(xml, 'text/xml')
  const nodeName = xmlDoc.documentElement.nodeName
  const parseElement = function (element: HTMLElement | ChildNode) {
    if (element.nodeType === 1) {
      if (element.hasChildNodes()) {
        const subJson = {} as any
        for (let i = 0; i < element.childNodes.length; i++) {
          const child = element.childNodes[i]
          const propName = child.nodeName
          const match = propName.match(/^(\w[\w\d]*)_(\d+)$/)
          let value
          if (child.childNodes.length === 1 && child.childNodes[0].nodeType === 3) {
            value = child.childNodes[0].nodeValue
          } else {
            value = parseElement(child)
          }
          if (match) {
            // 符合fieldName_fieldIndex样式的元素转换为数组形式
            const realPropName = match[1]
            const index = match[2]
            subJson[realPropName] = subJson[realPropName] || []
            subJson[realPropName][index] = value
          } else {
            subJson[propName] = value
          }
        }
        return subJson
      }
    } else if (element.nodeType === 3) {
      return element.nodeValue
    }
    return null
  }
  result[nodeName] = parseElement(xmlDoc.documentElement)
  return result as T
}

export default {
  showMessage,
  saveStorage,
  getStorage,
  setToken,
  getToken,
  guid,
  xmlToJson
}
