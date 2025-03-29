<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content" v-loading="loading">
      <div class="forms-box">
        <div class="form-box bordered" v-for="(video, index) in videos" :key="index">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'视频' + index + '参数设置'" text-type="primary" />
          </div>
          <el-form
            :model="video"
            label-position="left"
            :inline="false"
            :rules="videoFormRules"
            :ref="(el: unknown) => (videoRefs[index] = el as FormInstance)"
          >
            <el-form-item label="UDP H26X" class="dot-left" prop="udpH26x.h26xEn">
              <el-switch v-model="video.udpH26x.h26xEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.udpH26x.h26xEn">
              <el-form-item label="模式" prop="udpH26x.h26xMode">
                <el-select v-model="video.udpH26x.h26xMode" placeholder="">
                  <el-option label="单播" :value="0" />
                  <el-option label="组播" :value="1" />
                  <el-option label="广播" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="本机端口" prop="udpH26x.h26xSrcPort">
                <el-input
                  type="number"
                  v-model.number="video.udpH26x.h26xSrcPort"
                  placeholder="[0-65535]"
                  :min="0"
                  :max="65535"
                />
              </el-form-item>
              <el-form-item label="目的IP" prop="udpH26x.h26xDstIp">
                <el-input placeholder="ip" v-model.trim="video.udpH26x.h26xDstIp" />
              </el-form-item>
              <el-form-item label="目的端口" prop="udpH26x.h26xDstPort">
                <el-input
                  type="number"
                  placeholder="[0-65535]"
                  v-model.number="video.udpH26x.h26xDstPort"
                />
              </el-form-item>
              <el-form-item label="发送长度" prop="udpH26x.h26xSendLen">
                <el-input type="number" v-model.number="video.udpH26x.h26xSendLen" />
              </el-form-item>
              <el-form-item label="发送间隔" prop="udpH26x.h26xSendInterval">
                <el-input type="number" v-model.number="video.udpH26x.h26xSendInterval" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="UDP TS" class="dot-left">
              <el-switch v-model="video.udpTs.tsEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.udpTs.tsEn">
              <el-form-item label="模式" prop="udpTs.tsMode">
                <el-select v-model="video.udpTs.tsMode" placeholder="">
                  <el-option label="单播" :value="0" />
                  <el-option label="组播" :value="1" />
                  <el-option label="广播" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="本机端口" prop="udpTs.tsSrcPort">
                <el-input
                  type="number"
                  v-model.number="video.udpTs.tsSrcPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="目的IP" prop="udpTs.tsDstIp">
                <el-input placeholder="ip" v-model.trim="video.udpTs.tsDstIp" />
              </el-form-item>
              <el-form-item label="目的端口" prop="udpTs.tsDstPort">
                <el-input
                  type="number"
                  v-model.number="video.udpTs.tsDstPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="发送长度" prop="udpTs.sendLength">
                <el-input type="number" v-model.number="video.udpTs.tsSendLen" />
              </el-form-item>
              <el-form-item label="发送间隔" prop="udpTs.tsSendInterval">
                <el-input type="number" v-model.number="video.udpTs.tsSendInterval" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="RTSP" class="dot-left">
              <el-switch v-model="video.rtsp.rtspEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.rtsp.rtspEn">
              <el-form-item label="服务端口" prop="rtsp.rtspPort">
                <el-input
                  type="number"
                  v-model.number="video.rtsp.rtspPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="传输模式" prop="rtsp.transMode">
                <el-select v-model="video.rtsp.transMode" placeholder="">
                  <el-option label="UDP" :value="0" />
                  <el-option label="TCP" :value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="流名称" prop="rtsp.streamName">
                <el-input
                  maxlength="255"
                  placeholder="[格式：/stream0,重启生效]"
                  v-model.trim="video.rtsp.streamName"
                />
              </el-form-item>
              <el-form-item label="用户数" prop="rtsp.userSize">
                <el-input placeholder="[1~5]" type="number" v-model.number="video.rtsp.userSize" />
              </el-form-item>
              <el-form-item label="保活时间(ms)" prop="rtsp.keepAlive">
                <el-input
                  placeholder="[毫秒]"
                  type="number"
                  v-model.number="video.rtsp.keepAlive"
                />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="RTMP" class="dot-left">
              <el-switch v-model="video.rtmp.rtmpEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.rtmp.rtmpEn">
              <el-form-item label="推流地址" prop="rtmp.rtmpUrl">
                <el-input maxlength="255" v-model.trim="video.rtmp.rtmpUrl" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item label="GB28181" class="dot-left">
              <el-switch v-model="video.gb28181.gbEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.gb28181.gbEn">
              <el-form-item label="SIP服务器地址" prop="gb28181.gbServerIp">
                <el-input v-model.trim="video.gb28181.gbServerIp" />
              </el-form-item>
              <el-form-item label="SIP服务器端口" prop="gb28181.gbServerPort">
                <el-input
                  type="number"
                  v-model.number="video.gb28181.gbServerPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="SIP服务器ID" prop="gb28181.gbServerId">
                <el-input maxlength="255" v-model.trim="video.gb28181.gbServerId" />
              </el-form-item>
              <el-form-item label="注册有效期" prop="gb28181.gbPeriod">
                <el-input type="number" v-model.number="video.gb28181.gbPeriod" />
              </el-form-item>
              <el-form-item label="心跳周期" prop="gb28181.heartBeat">
                <el-input type="number" v-model.number="video.gb28181.heartBeat" />
              </el-form-item>
              <el-form-item label="本地SIP端口" prop="gb28181.localSipPort">
                <el-input
                  type="number"
                  v-model.number="video.gb28181.localSipPort"
                  placeholder="[0-65535]"
                />
              </el-form-item>
              <el-form-item label="SIP认证ID" prop="gb28181.gbAuthId">
                <el-input maxlength="255" v-model.trim="video.gb28181.gbAuthId" />
              </el-form-item>
              <el-form-item label="SIP认证密码" prop="gb28181.gbPasswd">
                <el-input maxlength="255" type="password" v-model.trim="video.gb28181.gbPasswd" />
              </el-form-item>
            </template>
            <el-button
              :loading="formLoading[index]"
              class="save-button"
              type="primary"
              @click="submitVideoForm(index)"
              >保存</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {
  GB28181Form,
  RTMPForm,
  RTSPForm,
  UdpH26xForm,
  UdpTsForm,
  VideoForm
} from '@/common/apis/modelTypes'
import apis from '@/common/apis'
import MenuBar from '@/components/MenuBar.vue'
import forms from '@/common/forms'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import util from '@/common/util'
const defaultForm = () => {
  return {
    udpH26x: {} as UdpH26xForm,
    udpTs: {} as UdpTsForm,
    rtsp: {} as RTSPForm,
    rtmp: {} as RTMPForm,
    gb28181: {} as GB28181Form
  }
}

const videos = ref<VideoForm[]>([defaultForm(), defaultForm(), defaultForm()])
const videoRefs = ref<FormInstance[]>([])
const loading = ref(false)
const formLoading = ref([] as boolean[])
onMounted(() => {
  loading.value = true
  apis
    .getVideoInfo()
    .then((res) => (videos.value = res))
    .finally(() => (loading.value = false))
})
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
const videoFormRules = reactive<FormRules<VideoForm>>({
  'udpH26x.h26xMode': udpFormRules.model,
  'udpH26x.h26xSrcPort': udpFormRules.localPort,
  'udpH26x.h26xDstIp': udpFormRules.targetIp,
  'udpH26x.h26xDstPort': udpFormRules.targetPort,
  'udpH26x.h26xSendLen': udpFormRules.sendLength,
  'udpH26x.h26xSendInterval': udpFormRules.sendPeriod, //
  'udpTs.tsMode': udpFormRules.model,
  'udpTs.tsSrcPort': udpFormRules.localPort,
  'udpTs.tsDstIp': udpFormRules.targetIp,
  'udpTs.tsDstPort': udpFormRules.targetPort,
  'udpTs.tsSendLen': udpFormRules.sendLength,
  'udpTs.tsSendInterval': udpFormRules.sendPeriod, //
  'rtsp.rtspPort': { validator: forms.checkNumber(0, 65535, '服务端口'), trigger: 'blur' },
  'rtsp.transMode': { validator: forms.checkSelect('传输模式'), trigger: 'change' },
  'rtsp.streamName': { validator: forms.checkString('流名称'), trigger: 'blur' },
  'rtsp.userSize': { validator: forms.checkNumber(1, 5, '用户数'), trigger: 'blur' },
  'rtsp.keepAlive': {
    validator: forms.checkNumber(0, 99999999999, '保活时间'),
    trigger: 'blur'
  },
  'rtmp.rtmpUrl': { validator: forms.checkString('推流地址'), trigger: 'blur' },
  'gb28181.gbServerIp': {
    validator: forms.checkString('SIP服务器地址'),
    trigger: 'blur'
  },
  'gb28181.gbServerPort': {
    validator: forms.checkNumber(0, 65535, 'SIP服务器端口'),
    trigger: 'blur'
  },
  'gb28181.gbServerId': { validator: forms.checkString('SIP服务器ID'), trigger: 'blur' },
  'gb28181.gbPeriod': {
    validator: forms.checkNumber(0, 65535, '注册有效期'),
    trigger: 'blur'
  },
  'gb28181.heartBeat': {
    validator: forms.checkNumber(0, 65535, '心跳周期'),
    trigger: 'blur'
  },
  'gb28181.localSipPort': {
    validator: forms.checkNumber(0, 65535, '本地SIP端口'),
    trigger: 'blur'
  },
  'gb28181.gbAuthId': { validator: forms.checkString('SIP认证ID'), trigger: 'blur' },
  'gb28181.gbPasswd': { validator: forms.checkString('SIP认证密码'), trigger: 'blur' }
})
const submitVideoForm = (index: number) => {
  const formRef = videoRefs.value[index]
  if (!formRef) {
    return
  }
  formRef.validate((valid) => {
    if (valid) {
      const formValue = videos.value[index]
      formLoading.value[index] = true
      apis
        .submitVideoInfo({
          video: {
            index,
            ...formValue
          }
        })
        .then((res) => util.resultHandler(res))
        .catch(() => {
          util.showMessage('提交数据失败', 'error')
        })
        .finally(() => {
          formLoading.value[index] = false
        })
    } else {
      util.showMessage('表单校验失败', 'warning')
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
