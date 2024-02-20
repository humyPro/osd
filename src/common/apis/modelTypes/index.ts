type EncodingForm = {
  enType: string
  vencAspectRation: string
  vencBitrate: number
  vencFramerate: number
  vencGop: number
  vencProfile: string
  vencRcMode: string
  vencMaxQp: number
  vencMinIqp: number
  vencMinQp: number
  urls: string[]
}

type UDPForm = {
  model: string //模式
  localPort: number //本机端口
  targetIp: string //目的IP
  targetPort: number //目的端口
  sendLength: number //发送长度
  sendPeriod: number //发送周期
}
type RTSPForm = {
  serverPort: number //服务器端口
  transferModel: 'UDP' | 'TCP' //传输模式
  streamName: string //流名称
  userNumber: number //用户数
  keepAlive: number //保活时间
}
type RTMPForm = {
  streamAddress: string //推流地址
}
type GB28181Form = {
  sipServerAddres: string //SIP服务器地址
  sipServerPort: number //SIP服务器地址
  sipServerId: string //SIP服务器ID
  registerTerm: number //注册有效期
  heartBeatPeriod: number //心跳周期
  sipLocalPort: number //本地SIP端口
  sipAuthId: string //SIP认证ID
  sipAuthPassword: string //SIP认证密码
}
type VideoForm = {
  udpH26XEnable: boolean //是否启用UDP H26X
  udpH26XInfo: UDPForm
  udpTsEnable: boolean //是否启用UDP TS
  udpTsInfo: UDPForm
  rtspEnable: boolean //是否启用RTSP
  rtspInfo: RTSPForm
  rtmpEnable: boolean //是否启用rtmp
  rtmpInfo: RTMPForm
  gb28181Enable: boolean //是否启用GB28181
  gb28181Info: GB28181Form
}
export type { EncodingForm, UDPForm, VideoForm, RTSPForm, RTMPForm, GB28181Form }
