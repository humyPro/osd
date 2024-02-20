<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered" v-for="(video, index) in videos" :key="index">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'视频' + index + '参数设置'" text-type="primary" />
          </div>
          <el-form :model="video" label-position="left" :inline="false">
            <el-form-item label="UDP H26X" class="dot-left">
              <el-switch v-model="video.udpH26XEnable" />
            </el-form-item>
            <template v-if="video.udpH26XEnable">
              <el-form-item label="模式">
                <el-select v-model="video.udpH26XInfo.model" placeholder="">
                  <el-option label="单播" value="单播" />
                  <el-option label="组播" value="组播" />
                  <el-option label="广播" value="广播" />
                </el-select>
              </el-form-item>
              <el-form-item label="本机端口">
                <el-input v-model.number="video.udpH26XInfo.localPort" placeholder="[0-65535]" />
              </el-form-item>
              <el-form-item label="目的IP">
                <el-input placeholder="ip" v-model="video.udpH26XInfo.targetIp" />
              </el-form-item>
              <el-form-item label="目的端口">
                <el-input placeholder="[0-65535]" v-model.number="video.udpH26XInfo.targetPort" />
              </el-form-item>
              <el-form-item label="发送长度">
                <el-input v-model.number="video.udpH26XInfo.sendLength" />
              </el-form-item>
              <el-form-item label="发送间隔">
                <el-input v-model="video.udpH26XInfo.sendPeriod" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="UDP TS" class="dot-left">
              <el-switch v-model="video.udpTsEnable" />
            </el-form-item>
            <template v-if="video.udpTsEnable">
              <el-form-item label="模式">
                <el-select v-model="video.udpTsInfo.model" placeholder="">
                  <el-option label="单播" value="单播" />
                  <el-option label="组播" value="组播" />
                  <el-option label="广播" value="广播" />
                </el-select>
              </el-form-item>
              <el-form-item label="本机端口">
                <el-input v-model.number="video.udpTsInfo.localPort" placeholder="[0-65535]" />
              </el-form-item>
              <el-form-item label="目的IP">
                <el-input placeholder="ip" v-model="video.udpTsInfo.targetIp" />
              </el-form-item>
              <el-form-item label="目的端口">
                <el-input v-model.number="video.udpTsInfo.targetPort" placeholder="[0-65535]" />
              </el-form-item>
              <el-form-item label="发送长度">
                <el-input v-model.number="video.udpTsInfo.sendLength" />
              </el-form-item>
              <el-form-item label="发送间隔">
                <el-input v-model.number="video.udpTsInfo.sendPeriod" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="RTSP" class="dot-left">
              <el-switch v-model="video.rtspEnable" />
            </el-form-item>
            <template v-if="video.rtspEnable">
              <el-form-item label="服务端口">
                <el-input v-model.number="video.rtspInfo.serverPort" placeholder="[0-65535]" />
              </el-form-item>
              <el-form-item label="传输模式">
                <el-select v-model="video.rtspInfo.transferModel" placeholder="">
                  <el-option label="UDP" value="UDP" />
                  <el-option label="TCP" value="TCP" />
                </el-select>
              </el-form-item>
              <el-form-item label="流名称">
                <el-input
                  placeholder="[格式：/stream0,重启生效]"
                  v-model="video.rtspInfo.streamName"
                />
              </el-form-item>
              <el-form-item label="用户数">
                <el-input placeholder="[1~5]" v-model.number="video.rtspInfo.userNumber" />
              </el-form-item>
              <el-form-item label="保活时间(ms)">
                <el-input placeholder="[毫秒]" v-model.number="video.rtspInfo.keepAlive" />
              </el-form-item>
              <el-divider />
              <el-form-item label="RTMP" class="dot-left">
                <el-switch v-model="video.rtmpEnable" />
              </el-form-item>
              <el-form-item label="推流地址">
                <el-input v-model="video.rtmpInfo.streamAddress" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="GB28181" class="dot-left">
              <el-switch v-model="video.gb28181Enable" />
            </el-form-item>
            <template v-if="video.gb28181Enable">
              <el-form-item label="SIP服务器地址">
                <el-input v-model="video.gb28181Info.sipServerAddres" />
              </el-form-item>
              <el-form-item label="SIP服务器端口">
                <el-input
                  v-model.number="video.gb28181Info.sipServerPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="SIP服务器ID">
                <el-input v-model="video.gb28181Info.sipServerId" />
              </el-form-item>
              <el-form-item label="注册有效期">
                <el-input v-model="video.gb28181Info.registerTerm" />
              </el-form-item>
              <el-form-item label="心跳周期">
                <el-input v-model.number="video.gb28181Info.heartBeatPeriod" />
              </el-form-item>
              <el-form-item label="本地SIP端口">
                <el-input v-model.number="video.gb28181Info.sipLocalPort" placeholder="[0-65535]" />
              </el-form-item>
              <el-form-item label="SIP认证ID">
                <el-input v-model="video.gb28181Info.sipAuthId" />
              </el-form-item>
              <el-form-item label="SIP认证密码">
                <el-input v-model="video.gb28181Info.sipAuthPassword" />
              </el-form-item>
            </template>
            <el-button class="save-button" type="primary">保存</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { RTMPForm, RTSPForm, UDPForm, VideoForm, GB28181Form } from '@/common/apis/modelTypes'
import MenuBar from '@/components/MenuBar.vue'
import { ref } from 'vue'
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
