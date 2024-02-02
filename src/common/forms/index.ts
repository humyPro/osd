import { ElMessage } from 'element-plus'
type MessageType = 'success' | 'warning' | 'error' | 'info'
const showMessage = (message: string, type: MessageType) => {
  ElMessage({
    type,
    message
  })
}

export default {
  showMessage
}
