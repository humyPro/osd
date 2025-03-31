<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content" v-loading="loading">
      <div class="forms-box">
        <div class="form-box bordered" v-for="(video, index) in videos" :key="index">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="t('video.title', { index })" text-type="primary" />
          </div>
          <el-form
            :model="video"
            label-position="left"
            :inline="false"
            :rules="videoFormRules"
            :ref="(el: unknown) => (videoRefs[index] = el as FormInstance)"
          >
            <el-form-item :label="t('video.udpH26x.label')" class="dot-left" prop="udpH26x.h26xEn">
              <el-switch v-model="video.udpH26x.h26xEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.udpH26x.h26xEn">
              <el-form-item :label="t('video.udpH26x.mode')" prop="udpH26x.h26xMode">
                <el-select v-model="video.udpH26x.h26xMode" :placeholder="t('common.selectPlaceholder')">
                  <el-option :label="t('video.udpH26x.modeOptions.unicast')" :value="0" />
                  <el-option :label="t('video.udpH26x.modeOptions.multicast')" :value="1" />
                  <el-option :label="t('video.udpH26x.modeOptions.broadcast')" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.localPort')" prop="udpH26x.h26xSrcPort">
                <el-input
                  type="number"
                  v-model.number="video.udpH26x.h26xSrcPort"
                  :placeholder="t('placeholders.number')"
                  :min="0"
                  :max="65535"
                />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.targetIp')" prop="udpH26x.h26xDstIp">
                <el-input :placeholder="t('placeholders.ip')" v-model.trim="video.udpH26x.h26xDstIp" />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.targetPort')" prop="udpH26x.h26xDstPort">
                <el-input
                  type="number"
                  :placeholder="t('placeholders.number')"
                  v-model.number="video.udpH26x.h26xDstPort"
                />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.sendLength')" prop="udpH26x.h26xSendLen">
                <el-input type="number" v-model.number="video.udpH26x.h26xSendLen" />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.sendInterval')" prop="udpH26x.h26xSendInterval">
                <el-input type="number" v-model.number="video.udpH26x.h26xSendInterval" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item :label="t('video.udpTs.label')" class="dot-left">
              <el-switch v-model="video.udpTs.tsEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.udpTs.tsEn">
              <el-form-item :label="t('video.udpH26x.mode')" prop="udpTs.tsMode">
                <el-select v-model="video.udpTs.tsMode" :placeholder="t('common.selectPlaceholder')">
                  <el-option :label="t('video.udpH26x.modeOptions.unicast')" :value="0" />
                  <el-option :label="t('video.udpH26x.modeOptions.multicast')" :value="1" />
                  <el-option :label="t('video.udpH26x.modeOptions.broadcast')" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.localPort')" prop="udpTs.tsSrcPort">
                <el-input
                  type="number"
                  v-model.number="video.udpTs.tsSrcPort"
                  :placeholder="t('placeholders.number')"
                />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.targetIp')" prop="udpTs.tsDstIp">
                <el-input :placeholder="t('placeholders.ip')" v-model.trim="video.udpTs.tsDstIp" />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.targetPort')" prop="udpTs.tsDstPort">
                <el-input
                  type="number"
                  v-model.number="video.udpTs.tsDstPort"
                  :placeholder="t('placeholders.number')"
                />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.sendLength')" prop="udpTs.sendLength">
                <el-input type="number" v-model.number="video.udpTs.tsSendLen" />
              </el-form-item>
              <el-form-item :label="t('video.udpH26x.sendInterval')" prop="udpTs.tsSendInterval">
                <el-input type="number" v-model.number="video.udpTs.tsSendInterval" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item :label="t('video.rtsp.label')" class="dot-left">
              <el-switch v-model="video.rtsp.rtspEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.rtsp.rtspEn">
              <el-form-item :label="t('video.rtsp.port')" prop="rtsp.rtspPort">
                <el-input
                  type="number"
                  v-model.number="video.rtsp.rtspPort"
                  :placeholder="t('placeholders.number')"
                />
              </el-form-item>
              <el-form-item :label="t('video.rtsp.transMode')" prop="rtsp.transMode">
                <el-select v-model="video.rtsp.transMode" :placeholder="t('common.selectPlaceholder')">
                  <el-option :label="t('video.rtsp.transModeOptions.udp')" :value="0" />
                  <el-option :label="t('video.rtsp.transModeOptions.tcp')" :value="1" />
                </el-select>
              </el-form-item>
              <el-form-item :label="t('video.rtsp.streamName')" prop="rtsp.streamName">
                <el-input
                  maxlength="255"
                  :placeholder="t('video.rtsp.streamNamePlaceholder')"
                  v-model.trim="video.rtsp.streamName"
                />
              </el-form-item>
              <el-form-item :label="t('video.rtsp.userSize')" prop="rtsp.userSize">
                <el-input :placeholder="t('placeholders.number')" type="number" v-model.number="video.rtsp.userSize" />
              </el-form-item>
              <el-form-item :label="t('video.rtsp.keepAlive')" prop="rtsp.keepAlive">
                <el-input
                  :placeholder="t('placeholders.ms')"
                  type="number"
                  v-model.number="video.rtsp.keepAlive"
                />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item :label="t('video.rtmp.label')" class="dot-left">
              <el-switch v-model="video.rtmp.rtmpEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.rtmp.rtmpEn">
              <el-form-item :label="t('video.rtmp.url')" prop="rtmp.rtmpUrl">
                <el-input maxlength="255" v-model.trim="video.rtmp.rtmpUrl" />
              </el-form-item>
            </template>
            <el-divider />
            <el-form-item :label="t('video.gb28181.label')" class="dot-left">
              <el-switch v-model="video.gb28181.gbEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.gb28181.gbEn">
              <el-form-item :label="t('video.gb28181.serverIp')" prop="gb28181.gbServerIp">
                <el-input v-model.trim="video.gb28181.gbServerIp" />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.serverPort')" prop="gb28181.gbServerPort">
                <el-input
                  type="number"
                  v-model.number="video.gb28181.gbServerPort"
                  :placeholder="t('placeholders.number')"
                />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.serverId')" prop="gb28181.gbServerId">
                <el-input maxlength="255" v-model.trim="video.gb28181.gbServerId" />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.period')" prop="gb28181.gbPeriod">
                <el-input type="number" v-model.number="video.gb28181.gbPeriod" />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.heartBeat')" prop="gb28181.heartBeat">
                <el-input type="number" v-model.number="video.gb28181.heartBeat" />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.localSipPort')" prop="gb28181.localSipPort">
                <el-input
                  type="number"
                  v-model.number="video.gb28181.localSipPort"
                  :placeholder="t('placeholders.number')"
                />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.authId')" prop="gb28181.gbAuthId">
                <el-input maxlength="255" v-model.trim="video.gb28181.gbAuthId" />
              </el-form-item>
              <el-form-item :label="t('video.gb28181.password')" prop="gb28181.gbPasswd">
                <el-input maxlength="255" type="password" v-model.trim="video.gb28181.gbPasswd" />
              </el-form-item>
            </template>
            <el-button
              :loading="formLoading[index]"
              class="save-button"
              type="primary"
              @click="submitVideoForm(index)"
              >{{ t('video.saveButton') }}</el-button
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
import useFormValidation from '@/common/forms/formValidator'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import util from '@/common/util'
import { useI18n } from 'vue-i18n'
const forms = useFormValidation()
const { t } = useI18n()

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
  model: { validator: forms.checkSelect(t('video.udpH26x.mode')), trigger: 'change' },
  localPort: { validator: forms.checkNumber(0, 65535, t('video.validation.localPort')), trigger: 'blur' },
  targetIp: { validator: forms.checkIp(), trigger: 'blur' },
  targetPort: { validator: forms.checkNumber(0, 65535, t('video.validation.targetPort')), trigger: 'blur' },
  sendLength: {
    validator: forms.checkNumber(0, 99999999999, t('video.validation.sendLength')),
    trigger: 'blur'
  },
  sendPeriod: {
    validator: forms.checkNumber(0, 99999999999, t('video.validation.sendInterval')),
    trigger: 'blur'
  }
}
const videoFormRules = reactive<FormRules<VideoForm>>({
  'udpH26x.h26xMode': udpFormRules.model,
  'udpH26x.h26xSrcPort': udpFormRules.localPort,
  'udpH26x.h26xDstIp': udpFormRules.targetIp,
  'udpH26x.h26xDstPort': udpFormRules.targetPort,
  'udpH26x.h26xSendLen': udpFormRules.sendLength,
  'udpH26x.h26xSendInterval': udpFormRules.sendPeriod,
  'udpTs.tsMode': udpFormRules.model,
  'udpTs.tsSrcPort': udpFormRules.localPort,
  'udpTs.tsDstIp': udpFormRules.targetIp,
  'udpTs.tsDstPort': udpFormRules.targetPort,
  'udpTs.tsSendLen': udpFormRules.sendLength,
  'udpTs.tsSendInterval': udpFormRules.sendPeriod,
  'rtsp.rtspPort': { validator: forms.checkNumber(0, 65535, t('video.validation.servicePort')), trigger: 'blur' },
  'rtsp.transMode': { validator: forms.checkSelect(t('video.validation.transportMode')), trigger: 'change' },
  'rtsp.streamName': { validator: forms.checkString(t('video.validation.streamName')), trigger: 'blur' },
  'rtsp.userSize': { validator: forms.checkNumber(1, 5, t('video.validation.userCount')), trigger: 'blur' },
  'rtsp.keepAlive': {
    validator: forms.checkNumber(0, 99999999999, t('video.validation.keepAlive')),
    trigger: 'blur'
  },
  'rtmp.rtmpUrl': { validator: forms.checkString(t('video.validation.pushUrl')), trigger: 'blur' },
  'gb28181.gbServerIp': {
    validator: forms.checkString(t('video.validation.sipServerIp')),
    trigger: 'blur'
  },
  'gb28181.gbServerPort': {
    validator: forms.checkNumber(0, 65535, t('video.validation.sipServerPort')),
    trigger: 'blur'
  },
  'gb28181.gbServerId': { validator: forms.checkString(t('video.validation.sipServerId')), trigger: 'blur' },
  'gb28181.gbPeriod': {
    validator: forms.checkNumber(0, 65535, t('video.validation.registrationPeriod')),
    trigger: 'blur'
  },
  'gb28181.heartBeat': {
    validator: forms.checkNumber(0, 65535, t('video.validation.heartbeatInterval')),
    trigger: 'blur'
  },
  'gb28181.localSipPort': {
    validator: forms.checkNumber(0, 65535, t('video.validation.localSipPort')),
    trigger: 'blur'
  },
  'gb28181.gbAuthId': { validator: forms.checkString(t('video.validation.sipAuthId')), trigger: 'blur' },
  'gb28181.gbPasswd': { validator: forms.checkString(t('video.validation.sipPassword')), trigger: 'blur' }
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
          util.showMessage(t('error.submitFailed'), 'error')
        })
        .finally(() => {
          formLoading.value[index] = false
        })
    } else {
      util.showMessage(t('error.validationFailed'), 'warning')
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
