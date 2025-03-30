<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div class="form-box bordered" v-loading="pageLoading">
          <FormTitle :title="$t('network.title')"></FormTitle>
          <el-form
            :rules="networkFormRules"
            ref="networkFormRef"
            :model="networkForm"
            label-position="left"
          >
            <el-form-item :label="$t('network.ip')" prop="ip">
              <el-input v-model.trim="networkForm.ip" />
            </el-form-item>
            <el-form-item :label="$t('network.mask')" prop="mask">
              <el-input v-model.trim="networkForm.mask" />
            </el-form-item>
            <el-form-item :label="$t('network.gateway')" prop="gateway">
              <el-input v-model.trim="networkForm.gateway" />
            </el-form-item>
            <el-form-item :label="$t('network.mac')" prop="mac">
              <el-input v-model.trim="networkForm.mac" />
            </el-form-item>
            <el-form-item label="dns1" prop="dns1">
              <el-input v-model.trim="networkForm.dns1" />
            </el-form-item>
            <el-form-item label="dns2" prop="dns2">
              <el-input v-model.trim="networkForm.dns2" />
            </el-form-item>
            <el-form-item :label="$t('network.dhcp')" prop="dhcp">
              <el-switch v-model="networkForm.dhcp" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item :label="$t('network.wifi')" prop="wifiExist">
              <el-switch v-model="networkForm.wifiExist" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-button class="save-button" @click="submitNetworkForm" type="primary">
              {{ $t('common.save') }}
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
import util from '@/common/util'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import useFormValidation from '@/common/forms/formValidator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const forms = useFormValidation()
const networkForm = ref<NetworkForm>({} as NetworkForm)
const networkFormRef = ref<FormInstance>()
const pageLoading = ref(true)
const saveButtonLoading = ref(false)

const networkFormRules = reactive<FormRules<NetworkForm>>({
  ip: [{ validator: forms.checkIp(t('network.ip')), trigger: 'blur' }],
  mask: [{ validator: forms.checkIp(t('network.mask')), trigger: 'blur' }],
  gateway: [{ validator: forms.checkIp(t('network.gateway')), trigger: 'blur' }]
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
  networkFormRef.value.validate((valid) => {
    if (valid) {
      apis
        .submitNetworkForm(networkForm.value)
        .then((res) => util.resultHandler(res, t('error.submitFailed')))
        .finally(() => (saveButtonLoading.value = false))
    } else {
      util.showMessage(t('error.validationFailed'), 'error')
      saveButtonLoading.value = false
    }
  })
}
</script>
<style></style>
