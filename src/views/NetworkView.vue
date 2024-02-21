<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div class="form-box bordered">
          <FormTitle title="有线网络参数"></FormTitle>
          <el-form
            :rules="networkFormRules"
            ref="networkFormRef"
            :model="networkForm"
            label-position="left"
          >
            <el-form-item label="IP地址" class="custom-select" prop="ip">
              <el-input v-model.trim="networkForm.ip" />
            </el-form-item>
            <el-form-item label="子网掩码" class="custom-select" prop="mask">
              <el-input v-model.trim="networkForm.mask" />
            </el-form-item>
            <el-form-item label="默认网关" class="custom-select" prop="gateway">
              <el-input v-model.trim="networkForm.gateway" />
            </el-form-item>
            <el-button class="save-button" @click="submitNetworkForm" type="primary">
              保存
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import forms from '@/common/forms'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
type NetworkType = {
  ip: string
  mask: string
  gateway: string
}
const networkForm = ref<NetworkType>({} as NetworkType)
const networkFormRef = ref()
const networkFormRules = reactive<FormRules<NetworkType>>({
  ip: [{ validator: forms.checkIp('IP地址'), trigger: 'blur' }],
  mask: [{ validator: forms.checkIp('子网掩码'), trigger: 'blur' }],
  gateway: [{ validator: forms.checkIp('默认网关'), trigger: 'blur' }]
})
const submitNetworkForm = () => {
  if (!networkFormRef.value) {
    return
  }
  ;(networkFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
  })
}
</script>
<style></style>
