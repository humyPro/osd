type Result = {
  retcode: number
  describe: string
  data: unknown
}

type VencForm = {
  enType: number
  vencAspectRation: number
  vencBitrate: number
  vencFramerate: number
  vencGop: number
  vencWidth: number
  vencHeight: number
  vencProfile: number
  vencRcMode: number
  vencMaxQp: number
  vencMinIQp: number
  vencMinQp: number
  resolutionRatio: string //分辨率 vencWidth x vencHeight
}
type AudioForm = {
  audioType: number
  aencBitrate: number
  audioChannel: number
  isHeAac: number
}
type EncodingForm = {
  url: {
    rtsp: string[]
  }
  encode: {
    venc: VencForm[]
  }
  audio: AudioForm
}
type NetworkForm = {
  ip: string
  mask: string
  gateway: string
  mac: string
  dns1: string
  dns2: string
  dhcp: number
  wifiExist: number
}

type RTSPForm = {
  rtspEn: number
  rtspPort: number //服务器端口
  transMode: 0 | 1 //'UDP' | 'TCP' //传输模式
  streamName: string //流名称
  userSize: number //用户数
  keepAlive: number //保活时间
}
type RTMPForm = {
  rtmpEn: number
  rtmpUrl: string //推流地址
}
type GB28181Form = {
  gbEn: number
  gbServerIp: string //SIP服务器地址
  gbServerPort: number //SIP服务器地址
  gbServerId: string //SIP服务器ID
  gbPeriod: number //注册有效期
  heartBeat: number //心跳周期
  localSipPort: number //本地SIP端口
  gbAuthId: string //SIP认证ID
  gbPasswd: string //SIP认证密码
}
type UdpH26xForm = {
  h26xEn: number
  h26xMode: number
  h26xSrcPort: number
  h26xDstIp: string
  h26xDstPort: number
  h26xSendLen: number
  h26xSendInterval: number
}
type UdpTsForm = {
  tsEn: number
  tsMode: number
  tsSrcPort: number
  tsDstIp: string
  tsDstPort: number
  tsSendLen: number
  tsSendInterval: number
}
type VideoForm = {
  udpH26x: UdpH26xForm
  udpTs: UdpTsForm
  rtsp: RTSPForm
  rtmp: RTMPForm
  gb28181: GB28181Form
}
type VersionInfo = {
  version: string
}

type UserCommUdpForm = {
  udpEn: number
  udpLocalPort: number
  udpDstIp: string
  udpDstPort: number
}
type UserCommUartForm = {
  uartEn: number
  baudrate: number
  dataBit: number
  stopBit: number
  parityBit: number // <!-- 0:无，1，奇校验；2，偶校 -->
}
type UserCommunicationForm = {
  udp: UserCommUdpForm
  uart: UserCommUartForm
  checkData: number
}
type StorageForm = {
  recordType: number
  recordMode: number
  recordDuration: number
  diskTotalSize: number
  diskFreeSize: number
  ch0RecordEn: number
  ch1RecordEn: number
  ch2RecordEn: number
}
type SystemProduct = {
  productNo: string
  productSn: string
  note: string
  lock: string
}
type SystemProductConfig = {
  tv1: string
  tv2: string
  ir1: string
  ir2: string
  la: string
  userProtocol: string
}
type SystemPtzInstallZero = {
  installYaw: number
  installPitch: number
  installRoll: number
}
type SystemPtzAngleZero = {
  angleYaw: number
  anglePitch: number
  angleRoll: number
  type: '0' | '1' | String
}
type SystemYtYaw = {
  yawKp: number
  yawKi: number
  yawFp: number
}
type SystemYtPitch = {
  pitchKp: number
  pitchKi: number
  pitchFp: number
}
type SystemYtRoll = {
  rollKp: number
  rollKi: number
  rollFp: number
}
type SystemGyroscope = {
  xa: number
  xb: number
  ya: number
  yb: number
  za: number
  zb: number
}

/**
 *    <moter_yaw_zero>1.2</moter_yaw_zero> <!-- 电机方位零 -->
			<moter_pitch_zero>0.00</moter_pitch_zero> <!-- 电机方位零 -->
			<moter_out_yaw_zero>0.00</moter_out_yaw_zero> <!-- 电机外方位零 -->
			<moter_out_pitch_zero>0.00</moter_out_pitch_zero> <!-- 电机外俯仰零 -->
			<moter_roll_zero>0.00</moter_roll_zero> <!-- 电机方位零 -->
 */
type SystemMoter = {
  moterYawZero: number
  moterPitchZero: number
  moterOutYawZero: number
  moterOutPitchZero: number
  moterRollZero: number
}
type SystemMaintenance = {
  product: SystemProduct
  config: SystemProductConfig
  ptz: {
    angleZero: SystemPtzAngleZero[]
    installZero: SystemPtzInstallZero
  } & SystemYtYaw &
    SystemYtPitch &
    SystemYtRoll &
    SystemGyroscope &
    SystemMoter
}
type UpProgress = {
  upProgress: number
}
export type {
  Result,
  EncodingForm,
  VencForm,
  AudioForm,
  UdpH26xForm,
  UdpTsForm,
  VideoForm,
  RTSPForm,
  RTMPForm,
  GB28181Form,
  NetworkForm,
  VersionInfo,
  UserCommunicationForm,
  UserCommUdpForm,
  UserCommUartForm,
  StorageForm,
  SystemMaintenance,
  SystemProduct,
  SystemProductConfig,
  SystemPtzAngleZero,
  SystemPtzInstallZero,
  SystemYtYaw,
  SystemYtPitch,
  SystemYtRoll,
  SystemGyroscope,
  UpProgress,
  SystemMoter
}
