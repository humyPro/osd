import { ElMessage } from 'element-plus'
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

const castToCamelCase = (name: string) => {
  return name.replace(/_(\w)/g, (s, f) => f.toUpperCase())
}
const castFromCamelCase = (name: string) => {
  return name.replace(/([A-Z])/g, (s, f) => '_' + f.toLowerCase())
}
const parseToInt = (value: string) => {
  return /^\d+$/.test(value) ? parseInt(value) : value
}
const xmlToJson = <T>(xml: string) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'text/xml')
  const parseElement = function (element: HTMLElement | ChildNode) {
    if (element.nodeType === 1) {
      if (element.hasChildNodes()) {
        const subJson = {} as any
        for (let i = 0; i < element.childNodes.length; i++) {
          const child = element.childNodes[i]
          const propName = child.nodeName
          if (propName.startsWith('#')) {
            continue
          }
          const match = propName.match(/^(\w[\w\d]*)_(\d+)$/)
          let value
          if (child.childNodes.length === 1 && child.childNodes[0].nodeType === 3) {
            value = child.childNodes[0].nodeValue
          } else {
            value = parseElement(child)
          }
          if (match) {
            // 符合fieldName_fieldIndex样式的元素转换为数组形式
            const realPropName = castToCamelCase(match[1])
            const index = match[2]
            subJson[realPropName] = subJson[realPropName] || []
            subJson[realPropName][index] = parseToInt(value)
          } else {
            subJson[castToCamelCase(propName)] = parseToInt(value)
          }
        }
        return subJson
      }
    } else if (element.nodeType === 3) {
      return element.nodeValue
    }
    return null
  }
  const result = parseElement(xmlDoc.documentElement)
  return result as T
}

const jsonToXml = (json: Record<string, any>, keyParse = (k: string) => k) => {
  let xml = '<?xml version="1.0" encoding="utf-8"?>\n'
  for (const key in json) {
    const value = json[key]
    if (typeof value === 'object') {
      xml += `<${keyParse(key)}>`
      xml += jsonToXml(value, keyParse)
      xml += `</${keyParse(key)}>`
    } else {
      xml += `<${keyParse(key)}>${json[key]}</${keyParse(key)}>\n`
    }
  }
  return xml
}

export default {
  showMessage,
  saveStorage,
  getStorage,
  setToken,
  getToken,
  guid,
  xmlToJson,
  jsonToXml,
  castFromCamelCase,
  castToCamelCase,
  parseToInt
}
