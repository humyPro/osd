<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div class="form-box bordered" v-loading="pageLoading">
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
import apis from '@/common/apis'
import type { NetworkForm } from '@/common/apis/modelTypes'
import forms from '@/common/forms'
import util from '@/common/util'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'

const networkForm = ref<NetworkForm>({} as NetworkForm)
const networkFormRef = ref()
const pageLoading = ref(true)
const saveButtonLoading = ref(false)
const networkFormRules = reactive<FormRules<NetworkForm>>({
  ip: [{ validator: forms.checkIp('IP地址'), trigger: 'blur' }],
  mask: [{ validator: forms.checkIp('子网掩码'), trigger: 'blur' }],
  gateway: [{ validator: forms.checkIp('默认网关'), trigger: 'blur' }]
})

onMounted(() => {
  apis
    .getNetworkInfo()
    .then((res) => {
      networkForm.value = res
    })
    .finally(() => (pageLoading.value = false))
})
const submitNetworkForm = () => {
  if (!networkFormRef.value) {
    return
  }
  saveButtonLoading.value = true
  ;(networkFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      apis
        .submitNetworkForm(networkForm.value)
        .then((res) => util.resultHandler(res, '提交数据失败'))
        .finally(() => (saveButtonLoading.value = false))
    } else {
      util.showMessage('表单校验失败', 'error')
      saveButtonLoading.value = false
    }
  })
}
</script>
<style></style>
