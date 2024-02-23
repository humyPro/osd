<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box" v-for="(channel, index) in channels" :key="index">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'编码通道' + index + '参数设置'" text-type="primary" />
          </div>
          <el-form
            :inline="true"
            :model="channel"
            label-position="left"
            style="width: 660px"
            :rules="channelRules"
            :ref="(el: unknown) => (channelRefs[index] = el as FormInstance)"
          >
            <el-form-item label="编码类型" prop="enType">
              <el-select v-model="channel.enType" placeholder="">
                <el-option label="H264" value="H264" />
                <el-option label="H265" value="H265" />
              </el-select>
            </el-form-item>
            <el-form-item label="分辨率" prop="vencAspectRation">
              <el-select v-model="channel.vencAspectRation" placeholder="">
                <el-option label="640x480" value="640x480" />
                <el-option label="1280x720" value="1280x720" />
                <el-option label="1920x1080" value="2048x1152" />
                <el-option label="4096x2304" value="4096x2304" />
              </el-select>
            </el-form-item>
            <el-form-item label="帧率" prop="vencFramerate">
              <el-input type="number" placeholder="[5-60]" v-model.number="channel.vencFramerate" />
            </el-form-item>
            <el-form-item label="关键帧间隔" prop="vencGop">
              <el-input type="number" placeholder="[10-300]" v-model.number="channel.vencGop" />
            </el-form-item>
            <el-form-item label="码率(kbps)" prop="vencBitrate">
              <el-input
                type="number"
                placeholder="200-20000"
                v-model.number="channel.vencBitrate"
              />
            </el-form-item>
            <el-form-item label="动态码率" prop="vencRcMode">
              <el-select v-model="channel.vencRcMode" placeholder="">
                <el-option label="CBR" value="CBR" />
                <el-option label="VBR" value="VBR" />
              </el-select>
            </el-form-item>
            <el-form-item label="MinQp" prop="vencMinQp">
              <el-input placeholder="[1-51]" type="number" v-model.number="channel.vencMinQp" />
            </el-form-item>
            <el-form-item
              label="MaxQp"
              prop="vencMaxQp"
              :rules="[
                {
                  validator: forms.checkNumber(() => channel.vencMinQp, 51, 'MinIQq'),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input placeholder="[MinQp,51]" type="number" v-model.number="channel.vencMaxQp" />
            </el-form-item>
            <el-form-item
              label="MinIQp"
              prop="vencMinIqp"
              :rules="[
                {
                  validator: forms.checkNumber(
                    () => channel.vencMinQp,
                    () => channel.vencMaxQp,
                    'MinIQq'
                  ),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input
                placeholder="[MinQp,MaxQp]"
                type="number"
                v-model.number="channel.vencMinIqp"
              />
            </el-form-item>
            <el-form-item label="Profile" prop="vencProfile">
              <el-select v-model="channel.vencProfile" placeholder="">
                <el-option label="baseline" value="baseline" />
                <el-option label="main" value="main" />
                <el-option label="high" value="high" />
              </el-select>
            </el-form-item>
            <el-button class="save-button" type="primary" @click="submitChannelForm(index)"
              >保存</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered form-right" style="width: 660px">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'编码通道' + index + '播放地址'" />
            <template v-for="url in channel.urls" :key="url">
              <el-tooltip :content="url" placement="top" effect="light">
                <el-text class="mx-1" truncated>{{ url }}</el-text>
              </el-tooltip>
              <p></p>
            </template>
          </div>
        </div>
      </div>
      <div class="forms-box">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle title="音频参数" text-type="primary" />
          </div>
          <el-form
            :inline="true"
            :model="audioProp"
            label-position="left"
            style="width: 660px"
            :rules="audioRules"
            ref="audioFormRef"
          >
            <el-form-item label="音频编码" prop="encoding">
              <el-select v-model="audioProp.encoding" placeholder="">
                <el-option label="ACC" value="ACC" />
              </el-select>
            </el-form-item>
            <el-form-item label="声道布局" prop="layout">
              <el-select v-model="audioProp.layout" placeholder="">
                <el-option label="立体声" value="立体声" />
              </el-select>
            </el-form-item>
            <el-form-item label="ACC格式" prop="accFormat">
              <el-select v-model="audioProp.accFormat" placeholder="">
                <el-option label="LC-ACC" value="LC-ACC" />
              </el-select>
            </el-form-item>
            <el-form-item label="音频比特率" prop="auditBit">
              <el-select v-model="audioProp.auditBit" placeholder="">
                <el-option label="24000" value="24000" />
              </el-select>
            </el-form-item>
            <el-button class="save-button" type="primary" @click="submitAudioForm">保存</el-button>
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
            <el-text>扫描下载app|扫描连接设备</el-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import apis from '@/common/apis'
import forms from '@/common/forms'
import type { EncodingForm } from '@/common/apis/modelTypes'
import MenuBar from '@/components/MenuBar.vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
type ChannelType = EncodingForm
type AuditPropType = {
  encoding: string
  layout: string
  accFormat: string
  auditBit: string
}
const channels = ref<ChannelType[]>([{} as ChannelType, {} as ChannelType, {} as ChannelType])
const channelRefs = ref<FormInstance[]>([])
const audioFormRef = ref<FormInstance>()
const audioProp = ref<AuditPropType>({} as AuditPropType)
const qrCode = ref<string>()
onMounted(() => {
  apis.getEncodingForm().then((res) => {
    channels.value = [res, { ...res }]
  })
})
const channelRules = reactive<FormRules>({
  enType: [{ validator: forms.checkSelect('编码类型'), trigger: 'change' }],
  vencAspectRation: [{ validator: forms.checkSelect('分辨率'), trigger: 'change' }],
  vencRcMode: [{ validator: forms.checkSelect('动态码率'), trigger: 'change' }],
  vencProfile: [{ validator: forms.checkSelect('Profile'), trigger: 'change' }],
  vencFramerate: [{ validator: forms.checkNumber(5, 60, '帧率'), trigger: 'blur' }],
  vencGop: [{ validator: forms.checkNumber(10, 300, '关键帧间隔'), trigger: 'blur' }],
  vencBitrate: [{ validator: forms.checkNumber(200, 20000, '码率'), trigger: 'blur' }],
  vencMinQp: [{ validator: forms.checkNumber(1, 51, 'MinQq'), trigger: 'blur' }]
})
const audioRules = reactive<FormRules<AuditPropType>>({
  encoding: [{ validator: forms.checkSelect('音频编码'), trigger: 'change' }],
  layout: [{ validator: forms.checkSelect('升到布局'), trigger: 'change' }],
  accFormat: [{ validator: forms.checkSelect('ACC格式'), trigger: 'change' }],
  auditBit: [{ validator: forms.checkSelect('音频比特率'), trigger: 'change' }]
})

const submitChannelForm = (index: number) => {
  const formRef = channelRefs.value[index]
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
const submitAudioForm = () => {
  if (!audioFormRef.value) {
    return
  }
  audioFormRef.value.validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
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
