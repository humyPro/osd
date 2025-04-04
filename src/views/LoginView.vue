<template>
  <div class="login-page">
    <div class="login-form-container">
      <el-text style="font-size: 39px; padding-bottom: 49px">{{ t('user.login') }}</el-text>
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-text>{{ t('user.username') }}</el-text>
          <el-form-item prop="account">
            <el-input maxlength="36" v-model="loginForm.account" @keyup.enter="login" />
          </el-form-item>

          <el-text>{{ t('user.password') }}</el-text>
          <el-form-item prop="password">
            <el-input
              maxlength="36"
              type="password"
              v-model="loginForm.password"
              @keyup.enter="login"
            />
          </el-form-item>
        </el-form>
      </div>
      <el-button
        :loading="loginButtonLoading"
        @click="login"
        type="primary"
        style="width: 100%; margin-top: 30px"
        round
        >{{ t('user.login') }}</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import apis from '@/common/apis'
import util from '@/common/util'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useFormValidation from '@/common/forms/formValidator'
const forms = useFormValidation()
const { t } = useI18n()
const router = useRouter()
type LoginFormType = {
  account: string
  password: string
}
const loginFormRef = ref()
const loginForm = ref<LoginFormType>({} as LoginFormType)
const loginFormRules = reactive<FormRules<LoginFormType>>({
  account: [{ validator: forms.checkString(t('user.username')), trigger: 'blur' }],
  password: [{ validator: forms.checkString(t('user.password')), trigger: 'blur' }]
})
const loginButtonLoading = ref(false)
const login = () => {
  if (!loginFormRef.value) {
    return
  }
  loginButtonLoading.value = true
  ;(loginFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      apis.login(loginForm.value.account, loginForm.value.password).then((res) => {
        util.resultHandler(res, t('auth.authFailed'), () => {
          util.showMessage(t('auth.loginSuccess'))
          router.push('/encoding')
        })
        loginButtonLoading.value = false
      })
    } else {
      loginButtonLoading.value = false
    }
  })
}
</script>
<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--el-bg-color-page);
}
.login-form-container {
  flex-direction: column;
  border-radius: 10px;
  padding: 50px 30px;
  border: 1px solid var(--el-color-primary);
  background-color: var(--el-bg-color);
  display: flex;
  align-items: center;
}
.login-form .el-form-item {
  margin-right: 0px !important;
  margin-top: 5px;
}

.login-form .custom-form-item {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
