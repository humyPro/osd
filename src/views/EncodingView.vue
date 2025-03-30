<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content" v-loading="loadEncodingForm">
      <div class="forms-box" v-for="(channel, index) in channelInfo.encode.venc" :key="index">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle
              :title="t('encoding.channelTitle', { index: index + 1 })"
              text-type="primary"
            />
          </div>
          <el-form
            :inline="true"
            :model="channel"
            label-position="left"
            style="width: 660px"
            :rules="channelRules"
            :ref="(el: unknown) => (channelRefs[index] = el as FormInstance)"
          >
            <el-form-item :label="t('encoding.encodeType')" prop="enType">
              <el-select v-model="channel.enType" :placeholder="t('common.selectPlaceholder')">
                <el-option label="H264" :value="96" />
                <el-option label="H265" :value="265" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('encoding.resolution')" prop="resolutionRatio">
              <el-select
                v-model="channel.resolutionRatio"
                :placeholder="t('common.selectPlaceholder')"
              >
                <el-option label="640x480" value="640x480" />
                <el-option label="1280x720" value="1280x720" />
                <el-option label="1920x1080" value="1920x1080" />
                <el-option label="4096x2304" value="4096x2304" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('encoding.frameRate')" prop="vencFramerate">
              <el-input
                type="number"
                :placeholder="t('encoding.frameRatePlaceholder')"
                v-model.number="channel.vencFramerate"
              />
            </el-form-item>
            <el-form-item :label="t('encoding.keyFrameInterval')" prop="vencGop">
              <el-input
                type="number"
                :placeholder="t('encoding.keyFramePlaceholder')"
                v-model.number="channel.vencGop"
              />
            </el-form-item>
            <el-form-item :label="t('encoding.bitrate')" prop="vencBitrate">
              <el-input
                type="number"
                :placeholder="t('encoding.bitratePlaceholder')"
                v-model.number="channel.vencBitrate"
              />
            </el-form-item>
            <el-form-item :label="t('encoding.dynamicBitrate')" prop="vencRcMode">
              <el-select v-model="channel.vencRcMode" :placeholder="t('common.selectPlaceholder')">
                <el-option label="CBR" :value="0" />
                <el-option label="VBR" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('encoding.minQp')" prop="vencMinQp">
              <el-input
                :placeholder="t('encoding.minQpPlaceholder')"
                type="number"
                v-model.number="channel.vencMinQp"
              />
            </el-form-item>
            <el-form-item
              :label="t('encoding.maxQp')"
              prop="vencMaxQp"
              :rules="[
                {
                  validator: forms.checkNumber(() => channel.vencMinQp, 51, t('encoding.minQp')),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input
                :placeholder="t('encoding.maxQpPlaceholder')"
                type="number"
                v-model.number="channel.vencMaxQp"
              />
            </el-form-item>
            <el-form-item
              :label="t('encoding.minIQp')"
              prop="vencMinIQp"
              :rules="[
                {
                  validator: forms.checkNumber(
                    () => channel.vencMinQp,
                    () => channel.vencMaxQp,
                    t('encoding.minIQp')
                  ),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input
                :placeholder="t('encoding.minIQpPlaceholder')"
                type="number"
                v-model.number="channel.vencMinIQp"
              />
            </el-form-item>
            <el-form-item :label="t('encoding.profile')" prop="vencProfile">
              <el-select v-model="channel.vencProfile" :placeholder="t('common.selectPlaceholder')">
                <el-option :label="t('encoding.baseline')" :value="0" />
                <el-option :label="t('encoding.main')" :value="1" />
                <el-option :label="t('encoding.high')" :value="2" />
              </el-select>
            </el-form-item>
            <el-button
              class="save-button"
              :loading="encodingFormLoading[index]"
              type="primary"
              @click="submitChannelForm(index)"
              >{{ t('common.save') }}</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered form-right" style="width: 660px">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="t('encoding.playUrlTitle', { index: index + 1 })" />
            <el-tooltip :content="channelInfo.url.rtsp[index]" placement="top" effect="light">
              <el-text class="mx-1" truncated>{{ channelInfo.url.rtsp[index] }}</el-text>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="forms-box">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="t('audio.title')" text-type="primary" />
          </div>
          <el-form
            :inline="true"
            :model="audioProp"
            label-position="left"
            style="width: 660px"
            :rules="audioRules"
            ref="audioFormRef"
          >
            <el-form-item :label="t('audio.encodeType')" prop="encoding">
              <el-select v-model="audioProp.encoding" :placeholder="t('common.selectPlaceholder')">
                <el-option :label="t('audio.aac')" :value="1" />
                <el-option :label="t('audio.mp3')" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('audio.channelLayout')" prop="layout">
              <el-select v-model="audioProp.layout" :placeholder="t('common.selectPlaceholder')">
                <el-option :label="t('audio.stereo')" :value="0" />
                <el-option :label="t('audio.leftChannel')" :value="1" />
                <el-option :label="t('audio.rightChannel')" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('audio.aacFormat')" prop="accFormat">
              <el-select v-model="audioProp.accFormat" :placeholder="t('common.selectPlaceholder')">
                <el-option :label="t('audio.lcAac')" :value="0" />
                <el-option :label="t('audio.heAac')" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('audio.bitrate')" prop="auditBit">
              <el-select v-model="audioProp.auditBit" :placeholder="t('common.selectPlaceholder')">
                <el-option
                  v-for="rate in [
                    24000, 32000, 48000, 64000, 96000, 128000, 160000, 192000, 256000, 320000
                  ]"
                  :key="rate"
                  :label="rate"
                  :value="rate"
                />
              </el-select>
            </el-form-item>
            <el-button
              class="save-button"
              type="primary"
              :loading="auditFormLoading"
              @click="submitAudioForm"
              >{{ t('common.save') }}</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered form-right" style="width: 660px">
          <div class="qrcode-image">
            <el-image style="width: 100px; height: 100px" :src="qrCode" fit="fill">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <el-text>{{ t('common.scanQRCode') }}</el-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import apis from '@/common/apis'
import type { AudioForm, EncodingForm, VencForm } from '@/common/apis/modelTypes'
import MenuBar from '@/components/MenuBar.vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import util from '@/common/util'
import useFormValidation from '@/common/forms/formValidator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const forms = useFormValidation()

type ChannelType = EncodingForm
type AuditPropType = {
  encoding: string
  layout: string
  accFormat: string
  auditBit: string
}

const channelInfo = ref<ChannelType>({
  url: { rtsp: [] },
  encode: { venc: [{} as VencForm, {} as VencForm, {} as VencForm] },
  audio: {} as AudioForm
} as ChannelType)

const channelRefs = ref<FormInstance[]>([])
const audioFormRef = ref<FormInstance>()
const audioProp = ref<AuditPropType>({} as AuditPropType)
const qrCode = ref<string>()
const loadEncodingForm = ref(false)
const encodingFormLoading = ref([] as boolean[])
const auditFormLoading = ref(false)

onMounted(() => {
  loadEncodingForm.value = true
  apis
    .getEncodingForm()
    .then((res) => {
      channelInfo.value = res
      channelInfo.value.encode.venc.forEach(
        (v) => (v.resolutionRatio = `${v.vencWidth}x${v.vencHeight}`)
      )
    })
    .finally(() => (loadEncodingForm.value = false))
})

const channelRules = reactive<FormRules>({
  enType: [{ validator: forms.checkSelect(t('encoding.encodeType')), trigger: 'change' }],
  resolutionRatio: [{ validator: forms.checkSelect(t('encoding.resolution')), trigger: 'change' }],
  vencRcMode: [{ validator: forms.checkSelect(t('encoding.dynamicBitrate')), trigger: 'change' }],
  vencProfile: [{ validator: forms.checkSelect(t('encoding.profile')), trigger: 'change' }],
  vencFramerate: [
    { validator: forms.checkNumber(5, 60, t('encoding.frameRate')), trigger: 'blur' }
  ],
  vencGop: [
    { validator: forms.checkNumber(10, 300, t('encoding.keyFrameInterval')), trigger: 'blur' }
  ],
  vencBitrate: [
    { validator: forms.checkNumber(200, 20000, t('encoding.bitrate')), trigger: 'blur' }
  ],
  vencMinQp: [{ validator: forms.checkNumber(1, 51, t('encoding.minQp')), trigger: 'blur' }]
})

const audioRules = reactive<FormRules<AuditPropType>>({
  encoding: [{ validator: forms.checkSelect(t('audio.encodeType')), trigger: 'change' }],
  layout: [{ validator: forms.checkSelect(t('audio.channelLayout')), trigger: 'change' }],
  accFormat: [{ validator: forms.checkSelect(t('audio.aacFormat')), trigger: 'change' }],
  auditBit: [{ validator: forms.checkSelect(t('audio.bitrate')), trigger: 'change' }]
})

const submitChannelForm = (index: number) => {
  const formRef = channelRefs.value[index]
  if (!formRef) {
    return
  }
  encodingFormLoading.value[index] = true
  formRef.validate((valid) => {
    if (valid) {
      const formValue = channelInfo.value.encode.venc[index]
      apis
        .submitEncodingForm(index, formValue)
        .then((res) => util.resultHandler(res))
        .finally(() => {
          encodingFormLoading.value[index] = false
        })
        .catch((e) => {
          console.error(e)
          encodingFormLoading.value[index] = false
          util.showMessage(t('error.submitFailed'), 'error')
        })
    } else {
      encodingFormLoading.value[index] = false
      util.showMessage(t('error.validationFailed'), 'warning')
    }
  })
}

const submitAudioForm = () => {
  if (!audioFormRef.value) {
    return
  }
  auditFormLoading.value = true
  audioFormRef.value
    .validate((valid) => {
      if (valid) {
        alert(t('message.submitSuccess'))
      } else {
        alert(t('error.validationFailed'))
      }
    })
    .finally(() => {
      auditFormLoading.value = false
    })
}
</script>
<style scoped>
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
