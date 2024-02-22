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

export default {
  showMessage,
  saveStorage,
  getStorage,
  setToken,
  getToken,
  guid
}
