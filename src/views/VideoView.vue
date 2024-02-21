<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered" v-for="(video, index) in videos" :key="index">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'视频' + index + '参数设置'" text-type="primary" />
          </div>
          <el-form
            :model="video"
            label-position="left"
            :inline="false"
            :rules="videoFormRuls"
            :ref="(el) => (videoRefs[index] = el as FormInstance)"
          >
            <el-form-item label="UDP H26X" class="dot-left" prop="udpH26XEnable">
              <el-switch v-model="video.udpH26XEnable" />
            </el-form-item>
            <template v-if="video.udpH26XEnable">
              <el-form-item label="模式" prop="udpH26XInfo.model">
                <el-select v-model="video.udpH26XInfo.model" placeholder="">
                  <el-option label="单播" value="单播" />
                  <el-option label="组播" value="组播" />
                  <el-option label="广播" value="广播" />
                </el-select>
              </el-form-item>
              <el-form-item label="本机端口" prop="udpH26XInfo.localPort">
                <el-input
                  type="number"
                  v-model.number="video.udpH26XInfo.localPort"
                  placeholder="[0-65535]"
                  :min="0"
                  :max="65535"
                />
              </el-form-item>
              <el-form-item label="目的IP" prop="udpH26XInfo.targetIp">
                <el-input placeholder="ip" v-model.trim="video.udpH26XInfo.targetIp" />
              </el-form-item>
              <el-form-item label="目的端口" prop="udpH26XInfo.targetPort">
                <el-input
                  type="number"
                  placeholder="[0-65535]"
                  v-model.number="video.udpH26XInfo.targetPort"
                />
              </el-form-item>
              <el-form-item label="发送长度" prop="udpH26XInfo.sendLength">
                <el-input type="number" v-model.number="video.udpH26XInfo.sendLength" />
              </el-form-item>
              <el-form-item label="发送间隔" prop="udpH26XInfo.sendPeriod">
                <el-input type="number" v-model.number="video.udpH26XInfo.sendPeriod" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="UDP TS" class="dot-left">
              <el-switch v-model="video.udpTsEnable" />
            </el-form-item>
            <template v-if="video.udpTsEnable">
              <el-form-item label="模式" prop="udpTsInfo.model">
                <el-select v-model="video.udpTsInfo.model" placeholder="">
                  <el-option label="单播" value="单播" />
                  <el-option label="组播" value="组播" />
                  <el-option label="广播" value="广播" />
                </el-select>
              </el-form-item>
              <el-form-item label="本机端口" prop="udpTsInfo.localPort">
                <el-input
                  type="number"
                  v-model.number="video.udpTsInfo.localPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="目的IP" prop="udpTsInfo.targetIp">
                <el-input placeholder="ip" v-model.trim="video.udpTsInfo.targetIp" />
              </el-form-item>
              <el-form-item label="目的端口" prop="udpTsInfo.targetPort">
                <el-input
                  type="number"
                  v-model.number="video.udpTsInfo.targetPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="发送长度" prop="udpTsInfo.sendLength">
                <el-input type="number" v-model.number="video.udpTsInfo.sendLength" />
              </el-form-item>
              <el-form-item label="发送间隔" prop="udpTsInfo.sendPeriod">
                <el-input type="number" v-model.number="video.udpTsInfo.sendPeriod" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="RTSP" class="dot-left">
              <el-switch v-model="video.rtspEnable" />
            </el-form-item>
            <template v-if="video.rtspEnable">
              <el-form-item label="服务端口" prop="rtspInfo.serverPort">
                <el-input
                  type="number"
                  v-model.number="video.rtspInfo.serverPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="传输模式" prop="rtspInfo.transferModel">
                <el-select v-model="video.rtspInfo.transferModel" placeholder="">
                  <el-option label="UDP" value="UDP" />
                  <el-option label="TCP" value="TCP" />
                </el-select>
              </el-form-item>
              <el-form-item label="流名称" prop="rtspInfo.streamName">
                <el-input
                  maxlength="255"
                  placeholder="[格式：/stream0,重启生效]"
                  v-model.trim="video.rtspInfo.streamName"
                />
              </el-form-item>
              <el-form-item label="用户数" prop="rtspInfo.userNumber">
                <el-input
                  placeholder="[1~5]"
                  type="number"
                  v-model.number="video.rtspInfo.userNumber"
                />
              </el-form-item>
              <el-form-item label="保活时间(ms)" prop="rtspInfo.keepAlive">
                <el-input
                  placeholder="[毫秒]"
                  type="number"
                  v-model.number="video.rtspInfo.keepAlive"
                />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="RTMP" class="dot-left">
              <el-switch v-model="video.rtmpEnable" />
            </el-form-item>
            <template v-if="video.rtmpEnable">
              <el-form-item label="推流地址" prop="rtmpInfo.streamAddress">
                <el-input maxlength="255" v-model.trim="video.rtmpInfo.streamAddress" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="GB28181" class="dot-left">
              <el-switch v-model="video.gb28181Enable" />
            </el-form-item>
            <template v-if="video.gb28181Enable">
              <el-form-item label="SIP服务器地址" prop="gb28181Info.sipServerAddres">
                <el-input v-model.trim="video.gb28181Info.sipServerAddres" />
              </el-form-item>
              <el-form-item label="SIP服务器端口" prop="gb28181Info.sipServerPort">
                <el-input
                  type="number"
                  v-model.number="video.gb28181Info.sipServerPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="SIP服务器ID" prop="gb28181Info.sipServerId">
                <el-input maxlength="255" v-model.trim="video.gb28181Info.sipServerId" />
              </el-form-item>
              <el-form-item label="注册有效期" prop="gb28181Info.registerTerm">
                <el-input type="number" v-model.number="video.gb28181Info.registerTerm" />
              </el-form-item>
              <el-form-item label="心跳周期" prop="gb28181Info.heartBeatPeriod">
                <el-input type="number" v-model.number="video.gb28181Info.heartBeatPeriod" />
              </el-form-item>
              <el-form-item label="本地SIP端口" prop="gb28181Info.sipLocalPort">
                <el-input
                  type="number"
                  v-model.number="video.gb28181Info.sipLocalPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="SIP认证ID" prop="gb28181Info.sipAuthId">
                <el-input maxlength="255" v-model.trim="video.gb28181Info.sipAuthId" />
              </el-form-item>
              <el-form-item label="SIP认证密码" prop="gb28181Info.sipAuthPassword">
                <el-input
                  maxlength="255"
                  type="password"
                  v-model.trim="video.gb28181Info.sipAuthPassword"
                />
              </el-form-item>
            </template>
            <el-button class="save-button" type="primary" @click="submitVideoForm(index)"
              >保存</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { RTMPForm, RTSPForm, UDPForm, VideoForm, GB28181Form } from '@/common/apis/modelTypes'
import MenuBar from '@/components/MenuBar.vue'
import forms from '@/common/forms'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const defaultForm = {
  udpH26XEnable: false,
  udpH26XInfo: {} as UDPForm,
  udpTsEnable: false,
  udpTsInfo: {} as UDPForm,
  rtspEnable: false,
  rtspInfo: {} as RTSPForm,
  rtmpEnable: false,
  rtmpInfo: {} as RTMPForm,
  gb28181Enable: false,
  gb28181Info: {} as GB28181Form
}
const videos = ref<VideoForm[]>([
  {
    ...defaultForm
  },
  {
    ...defaultForm
  },
  {
    ...defaultForm
  }
])
const videoRefs = ref<FormInstance[]>([])
const udpFormRules = {
  model: { validator: forms.checkSelect('模式'), trigger: 'change' },
  localPort: { validator: forms.checkNumber(0, 65535, '本机端口'), trigger: 'blur' },
  targetIp: { validator: forms.checkIp(), trigger: 'blur' },
  targetPort: { validator: forms.checkNumber(0, 65535, '目的端口'), trigger: 'blur' },
  sendLength: {
    validator: forms.checkNumber(0, 99999999999, '发送长度'),
    trigger: 'blur'
  },
  sendPeriod: {
    validator: forms.checkNumber(0, 99999999999, '发送间隔'),
    trigger: 'blur'
  }
}
type s = keyof typeof videoFormRuls
const videoFormRuls = reactive<FormRules<typeof defaultForm>>({
  'udpH26XInfo.model': udpFormRules.model,
  'udpH26XInfo.localPort': udpFormRules.localPort,
  'udpH26XInfo.targetIp': udpFormRules.targetIp,
  'udpH26XInfo.targetPort': udpFormRules.targetPort,
  'udpH26XInfo.sendLength': udpFormRules.sendLength,
  'udpH26XInfo.sendPeriod': udpFormRules.sendPeriod,
  //
  'udpTsInfo.model': udpFormRules.model,
  'udpTsInfo.localPort': udpFormRules.localPort,
  'udpTsInfo.targetIp': udpFormRules.targetIp,
  'udpTsInfo.targetPort': udpFormRules.targetPort,
  'udpTsInfo.sendLength': udpFormRules.sendLength,
  'udpTsInfo.sendPeriod': udpFormRules.sendPeriod,
  'rtspInfo.serverPort': { validator: forms.checkNumber(0, 65535, '服务端口'), trigger: 'blur' },
  'rtspInfo.transferModel': { validator: forms.checkSelect('传输模式'), trigger: 'change' },
  'rtspInfo.streamName': { validator: forms.checkString('流名称'), trigger: 'blur' },
  'rtspInfo.userNumber': { validator: forms.checkNumber(1, 5, '用户数'), trigger: 'blur' },
  'rtspInfo.keepAlive': {
    validator: forms.checkNumber(0, 99999999999, '保活时间'),
    trigger: 'blur'
  },
  'rtmpInfo.streamAddress': { validator: forms.checkString('推流地址'), trigger: 'blur' },
  'gb28181Info.sipServerAddres': { validator: forms.checkString('SIP服务器地址'), trigger: 'blur' },
  'gb28181Info.sipServerPort': {
    validator: forms.checkNumber(0, 65535, 'SIP服务器端口'),
    trigger: 'blur'
  },
  'gb28181Info.sipServerId': { validator: forms.checkString('SIP服务器ID'), trigger: 'blur' },
  'gb28181Info.registerTerm': {
    validator: forms.checkNumber(0, 65535, '注册有效期'),
    trigger: 'blur'
  },
  'gb28181Info.heartBeatPeriod': {
    validator: forms.checkNumber(0, 65535, '心跳周期'),
    trigger: 'blur'
  },
  'gb28181Info.sipLocalPort': {
    validator: forms.checkNumber(0, 65535, '本地SIP端口'),
    trigger: 'blur'
  },
  'gb28181Info.sipAuthId': { validator: forms.checkString('SIP认证ID'), trigger: 'blur' },
  'gb28181Info.sipAuthPassword': { validator: forms.checkString('SIP认证密码'), trigger: 'blur' }
})
const submitVideoForm = (index: number) => {
  const formRef = videoRefs.value[index]
  if (!formRef) {
    return
  }
  formRef.validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
  })
}
</script>
<style scoped>
.forms-box {
  display: flex;
}
.form-box {
  display: flex;
  flex-direction: column;
}
.qrcode-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.qrcode-image .el-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-fill-color-light);
  margin-bottom: 10px;
}
</style>
