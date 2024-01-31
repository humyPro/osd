<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered">
          <FormTitle title="系统时间设置"></FormTitle>
          <el-form :model="formInline" label-position="left">
            <div>
              <el-form-item label="时间服务器">
                <el-input placeholder="0xFFFFFF" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="时区选择" class="custom-select">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option
                    v-for="(i, index) in Array(24)"
                    :key="index.toString()"
                    :label="utcStr(index)"
                    :value="index - 12"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="偏移+分钟">
                <el-input placeholder="0-59" />
              </el-form-item>
            </div>
            <el-form-item class="form-right-button">
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <FormTitle title="系统信息"></FormTitle>
          <el-form :model="formInline" label-position="left">
            <div>
              <el-form-item label="系统升级">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :auto-upload="false"
                >
                  <template #trigger>
                    <el-button type="primary">选择文件</el-button>
                  </template>
                  <el-button
                    style="margin-left: 20px; margin-top: -2px"
                    type="success"
                    @click="submitUpload"
                  >
                    更新
                  </el-button>
                </el-upload>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="时区选择" class="custom-select">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option
                    v-for="(i, index) in Array(24)"
                    :key="index.toString()"
                    :label="utcStr(index)"
                    :value="index - 12"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="偏移+分钟">
                <el-input placeholder="0-59" />
              </el-form-item>
            </div>
            <el-form-item class="form-right-button">
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="forms-box">
        <el-button type="primary" @click="showMaintenanceLogin = true">系统维护</el-button>
      </div>
    </div>
    <el-dialog v-model="showMaintenanceLogin" width="30%" :show-close="false" style="width: 360px">
      <template #header>
        <el-text>验证密码后显示系统维护页面</el-text>
      </template>
      <el-form class="custom-label-size" v-model="loginForm">
        <el-form-item label="账号">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showMaintenanceLogin = false">取消</el-button>
          <el-button type="primary" @click="confirmLogin"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showMaintenanceForm" width="30%" :show-close="false" style="width: 360px">
      <template #header>
        <el-text size="large">系统维护</el-text>
      </template>
      <el-form class="custom-label-size" v-model="loginForm" label-width="80px">
        <FormTitle title="产品信息"></FormTitle>
        <el-form-item label="产品编码">
          <el-text>123456</el-text>
        </el-form-item>
        <el-form-item label="产品SN码">
          <el-text>123456</el-text>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <FormTitle title="产品配置"></FormTitle>
        <el-form-item label="TV1型号">
          <el-input placeholder="X1/X2/X3/X4/无"></el-input>
        </el-form-item>
        <el-form-item label="TV2型号">
          <el-input placeholder="X1/X2/X3/X4/无"></el-input>
        </el-form-item>
        <el-form-item label="IR1型号">
          <el-input placeholder="X1/X2/X3/X4/无"></el-input>
        </el-form-item>
        <el-form-item label="LA型号">
          <el-input placeholder="X1/X2/X3/X4/无"></el-input>
        </el-form-item>
        <el-form-item label="用户协议">
          <el-input placeholder="X1/X2/X3/X4/无"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showMaintenanceForm = false">取消</el-button>
          <el-button type="primary" @click="confirmLogin"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import forms from '@/common/forms'

const upload = ref<UploadInstance>()
const formInline = ref({
  region: ''
})
const showMaintenanceLogin = ref(false)
const showMaintenanceForm = ref(false)
const loginForm = ref<{ account: string; password: string }>({ account: '', password: '' })
const confirmLogin = () => {
  if (loginForm.value.account === loginForm.value.password) {
    showMaintenanceLogin.value = false
    showMaintenanceForm.value = true
  } else {
    forms.showMessage('账号或密码错误', 'error')
  }
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

const utcStr = (index: number) => {
  const t = index - 12
  const symbol = t === 0 ? ' ' : t < 0 ? '-' : '+'
  return `UTC ${symbol}${Math.abs(t).toString().padStart(2, '0')}:00`
}
</script>
<style scoped></style>
