<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div class="form-box bordered">
          <FormTitle title="采集编码"></FormTitle>
          <el-form
            ref="collectFormRef"
            :model="collectEncoding"
            label-position="left"
            :rules="collectRules"
          >
            <el-form-item label="音频选择" class="custom-select" prop="audioSelect">
              <el-select v-model="collectEncoding.audioSelect" placeholder="">
                <el-option label="HDMI" value="HDMI" />
              </el-select>
            </el-form-item>
            <el-form-item class="form-right-button">
              <el-button @click="submitCollectForm" type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form ref="hdmiFormRef" :model="hdmiConfig" label-position="left" :rules="hdmiRules">
            <div>
              <el-form-item label="HDMI输出" class="dot-left">
                <el-switch v-model="hdmiConfig.hdmiOutput" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="输出分辨率" class="custom-select" prop="hdmiResolutionRatio">
                <el-select v-model="hdmiConfig.hdmiResolutionRatio" placeholder="">
                  <el-option label="1080P24" value="1080P24" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="音频输出" class="custom-select" prop="audioOutput">
                <el-select v-model="hdmiConfig.audioOutput" placeholder="">
                  <el-option label="关闭" :value="false" />
                  <el-option label="开启" :value="true" />
                </el-select>
              </el-form-item>
            </div>
            <el-form-item class="form-right-button">
              <el-button @click="submitHdmiForm" type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import forms from '@/common/forms'
import type { FormInstance, FormRules } from 'element-plus'
import type { VNodeRef } from 'vue'
import { ref, reactive } from 'vue'
type CollectEncodingType = {
  audioSelect: string
}
type HDMIConfigType = {
  hdmiOutput: boolean
  hdmiResolutionRatio: string
  audioOutput: boolean
}
const collectFormRef = ref()
const hdmiFormRef = ref()
const collectEncoding = ref<CollectEncodingType>({} as CollectEncodingType)
const hdmiConfig = ref<HDMIConfigType>({} as HDMIConfigType)

const collectRules = reactive<FormRules<CollectEncodingType>>({
  audioSelect: [{ validator: forms.checkSelect('音频'), trigger: 'change' }]
})
const hdmiRules = reactive<FormRules<HDMIConfigType>>({
  hdmiResolutionRatio: [{ validator: forms.checkSelect('输出分辨率'), trigger: 'change' }],
  audioOutput: [{ validator: forms.checkSelect('音频输出'), trigger: 'change' }]
})
const submitCollectForm = () => {
  if (!collectFormRef.value) {
    return
  }
  ;(collectFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
  })
}
const submitHdmiForm = () => {
  if (!hdmiFormRef.value) {
    return
  }
  ;(hdmiFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
  })
}
</script>
<style></style>
