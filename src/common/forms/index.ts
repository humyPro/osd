import { ElMessage } from 'element-plus'
type MessageType = 'success'|'warning'|'message'|'error'
const shwoMessage = (message:string, type:MessageType) => {
  ElMessage({
    type,
    message
  })
}

export default {
  shwoMessage
}
