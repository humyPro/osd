<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content" v-loading="loading">
      <div class="forms-box">
        <div class="form-box bordered" v-for="(video, index) in videos" :key="index">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="$t('video.title', { index: index + 1 })" text-type="primary" />
          </div>
          <el-form
            :model="video"
            label-position="left"
            :inline="false"
            :rules="videoFormRules"
            :ref="(el: unknown) => (videoRefs[index] = el as FormInstance)"
          >
            <el-form-item :label="$t('video.udpH26x.label')" class="dot-left" prop="udpH26x.h26xEn">
              <el-switch v-model="video.udpH26x.h26xEn" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <template v-if="video.udpH26x.h26xEn">
              <el-form-item :label="$t('video.udpH26x.mode')" prop="udpH26x.h26xMode">
                <el-select
                  v-model="video.udpH26x.h26xMode"
                  :placeholder="$t('common.selectPlaceholder')"
                >
                  <el-option :label="$t('video.modeOptions.unicast')" :value="0" />
                  <el-option :label="$t('video.modeOptions.multicast')" :value="1" />
                  <el-option :label="$t('video.modeOptions.broadcast')" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('video.udpH26x.localPort')" prop="udpH26x.h26xSrcPort">
                <el-input
                  type="number"
                  v-model.number="video.udpH26x.h26xSrcPort"
                  placeholder="[0-65535]"
                  :min="0"
                  :max="65535"
                />
              </el-form-item>
              <!-- 其他表单项同理改造 -->
            </template>

            <!-- 保存按钮改造示例 -->
            <el-button
              :loading="formLoading[index]"
              class="save-button"
              type="primary"
              @click="submitVideoForm(index)"
            >
              {{ $t('video.saveButton') }}
            </el-button>
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
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import util from '@/common/util'
import useFormValidation from '@/common/forms/formValidator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const forms = useFormValidation()
const defaultForm = (): VideoForm => {
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
const formLoading = ref<boolean[]>([])

onMounted(() => {
  loading.value = true
  apis
    .getVideoInfo()
    .then((res) => (videos.value = res))
    .finally(() => (loading.value = false))
})

const udpFormRules = {
  model: { validator: forms.checkSelect(t('video.udpH26x.mode')), trigger: 'change' },
  localPort: {
    validator: forms.checkNumber(0, 65535, t('video.udpH26x.localPort')),
    trigger: 'blur'
  },
  targetIp: { validator: forms.checkIp(t('video.udpH26x.targetIp')), trigger: 'blur' },
  targetPort: {
    validator: forms.checkNumber(0, 65535, t('video.udpH26x.targetPort')),
    trigger: 'blur'
  },
  sendLength: {
    validator: forms.checkNumber(0, 99999999999, t('video.udpH26x.sendLength')),
    trigger: 'blur'
  },
  sendPeriod: {
    validator: forms.checkNumber(0, 99999999999, t('video.udpH26x.sendInterval')),
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
  'rtsp.rtspPort': {
    validator: forms.checkNumber(0, 65535, t('video.rtsp.port')),
    trigger: 'blur'
  },
  'rtsp.transMode': { validator: forms.checkSelect(t('video.rtsp.transMode')), trigger: 'change' },
  'rtsp.streamName': { validator: forms.checkString(t('video.rtsp.streamName')), trigger: 'blur' },
  'rtsp.userSize': {
    validator: forms.checkNumber(1, 5, t('video.rtsp.userSize')),
    trigger: 'blur'
  },
  'rtsp.keepAlive': {
    validator: forms.checkNumber(0, 99999999999, t('video.rtsp.keepAlive')),
    trigger: 'blur'
  },
  'rtmp.rtmpUrl': { validator: forms.checkString(t('video.rtmp.url')), trigger: 'blur' },
  'gb28181.gbServerIp': {
    validator: forms.checkString(t('video.gb28181.serverIp')),
    trigger: 'blur'
  },
  'gb28181.gbServerPort': {
    validator: forms.checkNumber(0, 65535, t('video.gb28181.serverPort')),
    trigger: 'blur'
  },
  'gb28181.gbServerId': {
    validator: forms.checkString(t('video.gb28181.serverId')),
    trigger: 'blur'
  },
  'gb28181.gbPeriod': {
    validator: forms.checkNumber(0, 65535, t('video.gb28181.period')),
    trigger: 'blur'
  },
  'gb28181.heartBeat': {
    validator: forms.checkNumber(0, 65535, t('video.gb28181.heartBeat')),
    trigger: 'blur'
  },
  'gb28181.localSipPort': {
    validator: forms.checkNumber(0, 65535, t('video.gb28181.localSipPort')),
    trigger: 'blur'
  },
  'gb28181.gbAuthId': { validator: forms.checkString(t('video.gb28181.authId')), trigger: 'blur' },
  'gb28181.gbPasswd': { validator: forms.checkString(t('video.gb28181.password')), trigger: 'blur' }
})

const submitVideoForm = async (index: number) => {
  const formRef = videoRefs.value[index]
  if (!formRef) return

  try {
    const valid = await formRef.validate()
    if (valid) {
      formLoading.value[index] = true
      const res = await apis.submitVideoInfo({
        video: {
          index,
          ...videos.value[index]
        }
      })
      util.resultHandler(res)
    }
  } catch (error) {
    util.showMessage(t('message.submitFailed'), 'error')
  } finally {
    formLoading.value[index] = false
  }
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
