<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered" v-loading="loading.userConmunicationSectionLoading">
          <FormTitle title="用户通信配置"></FormTitle>
          <el-form
            :model="userCommConfigForm"
            label-position="left"
            :rules="userCommConfigRules"
            ref="userCommConfigRef"
          >
            <el-form-item label="UDP" prop="udp.udpEn">
              <el-switch
                v-model="userCommConfigForm.udp.udpEn"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="本机端口" prop="udp.udpLocalPort">
              <el-input type="number" v-model.number="userCommConfigForm.udp.udpLocalPort" />
            </el-form-item>
            <el-form-item label="目的地址" prop="udp.udpDstIp">
              <el-input v-model.trim="userCommConfigForm.udp.udpDstIp" />
            </el-form-item>
            <el-form-item label="目的端口" prop="udp.udpDstPort">
              <el-input type="number" v-model.number="userCommConfigForm.udp.udpDstPort" />
            </el-form-item>
            <el-divider />

            <el-form-item label="UART" prop="uart.uartEn">
              <el-switch
                v-model="userCommConfigForm.uart.uartEn"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item type="number" label="波特率" prop="uart.baudrate">
              <el-input v-model.number="userCommConfigForm.uart.baudrate" />
            </el-form-item>
            <el-form-item label="数据位" prop="uart.dataBit">
              <el-input
                type="number"
                placeholder="5/6/7/8"
                v-model.number="userCommConfigForm.uart.dataBit"
              />
            </el-form-item>
            <el-form-item label="停止位" prop="uart.stopBit">
              <el-input
                type="number"
                placeholder="1/1.5/2"
                v-model.number="userCommConfigForm.uart.stopBit"
              />
            </el-form-item>
            <el-form-item label="校验位" prop="uart.parityBit">
              <el-input
                placeholder="奇校验/偶校验/无"
                v-model.number="userCommConfigForm.uart.parityBit"
              />
            </el-form-item>
            <el-divider />

            <el-form-item label="检测数据">
              <el-switch
                v-model="userCommConfigForm.checkData"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-button
              type="primary"
              class="save-button"
              @click="confirmUserCommConfig"
              :loading="loading.submitUserCommunicationBtnLoding"
              >保存</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered" v-loading="loading.storageSectionLoading">
          <FormTitle title="存储"></FormTitle>
          <el-form
            :model="storageForm"
            label-position="left"
            ref="storageRef"
            :rules="storageRules"
          >
            <el-form-item label="录像格式" prop="recordType">
              <el-select v-model="storageForm.recordType">
                <el-option label="H26X" value="H26X" />
                <el-option label="MP4" value="MP4" />
                <el-option label="AVI" value="AVI" />
                <el-option label="FLV" value="AFLVVI" />
              </el-select>
            </el-form-item>
            <el-form-item label="录像模式" prop="recordMode">
              <el-radio-group v-model="storageForm.recordMode">
                <el-radio label="1">循环</el-radio>
                <el-radio label="2">非循环</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文件时长" prop="recordDuration">
              <el-select v-model="storageForm.recordDuration">
                <el-option label="1分钟" :value="1" />
                <el-option label="3分钟" :value="3" />
                <el-option label="5分钟" :value="5" />
                <el-option label="10分钟" :value="10" />
                <el-option label="15分钟" :value="15" />
                <el-option label="20分钟" :value="20" />
                <el-option label="30分钟" :value="30" />
              </el-select>
            </el-form-item>
            <el-form-item label="剩余容量">
              <el-text>{{ storageForm.diskFreeSize }}MB</el-text>
            </el-form-item>
            <el-form-item label="磁盘容量">
              <el-text>{{ storageForm.diskTotalSize }}MB</el-text>
            </el-form-item>
            <el-form-item label=" ">
              <el-popconfirm
                title="确定要格式化吗?"
                @confirm="confirmFormat"
                confirm-button-text="确定"
                cancel-button-text="取消"
              >
                <template #reference>
                  <el-button type="danger" :loading="loading.formatBtnLoading">格式化</el-button>
                </template>
              </el-popconfirm>
            </el-form-item>
            <el-form-item label="通道0">
              <div class="channel-content">
                <el-switch
                  v-model="storageForm.ch0RecordEn"
                  :active-value="1"
                  :inactive-value="0"
                />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-form-item label="通道1">
              <div class="channel-content">
                <el-switch
                  v-model="storageForm.ch1RecordEn"
                  :active-value="1"
                  :inactive-value="0"
                />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-form-item label="通道2">
              <div class="channel-content">
                <el-switch
                  v-model="storageForm.ch2RecordEn"
                  :active-value="1"
                  :inactive-value="0"
                />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-button
              type="primary"
              class="save-button"
              @click="confirmStorage"
              :loading="loading.submitStorageInfoBtnLoading"
              >保存</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered" v-loading="loading.systemSectionLoading">
          <FormTitle title="系统信息"></FormTitle>
          <el-form :model="systemInfo" label-position="left" class="system-form">
            <el-form-item label="系统版本">
              <el-text>{{ systemInfo.version || 'unknown' }}</el-text>
            </el-form-item>
            <el-form-item label="系统升级" v-if="false">
              <el-upload ref="upload" class="upload-demo" action="" :limit="1" :auto-upload="false">
                <template #trigger>
                  <el-button type="primary" :loading="loading.selectFileBtnLoding"
                    >选择文件</el-button
                  >
                </template>
                <el-button
                  style="margin-left: 20px; margin-top: -2px"
                  type="success"
                  @click="submitUpload"
                  :loading="loading.updateSystemBtnLoading"
                >
                  更新
                </el-button>
              </el-upload>
            </el-form-item>
            <el-divider />
            <div style="width: 100%; display: flex; justify-content: space-around">
              <el-button type="danger" :loading="loading.resetSystemBtnLoading" @click="resetSystem"
                >恢复出厂设置</el-button
              >
              <el-button type="danger" :loading="loading.restartBtnLoding" @click="restartSystem"
                >重启</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
      <div class="forms-box">
        <div class="form-box bordered">
          <el-collapse
            v-model="systemConfigModel"
            @change="handSystemFormExpand"
            style="border: none"
          >
            <el-collapse-item name="1" title="系统维护">
              <template #title>
                <div style="width: 309px; display: flex; align-items: flex-start">
                  <el-text type="primary" size="large">系统维护</el-text>
                </div>
              </template>
              <div v-if="showMaintenanceForm">
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
                  <el-form-item>
                    <el-button @click="showMaintenanceForm = false">取消</el-button>
                    <el-button type="primary" @click="confirmLogin"> 确认 </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <el-dialog v-model="showMaintenanceLogin" width="30%" :show-close="false" style="width: 360px">
      <template #header>
        <el-text>验证密码后显示系统维护页面</el-text><br />
        <el-text>测试tips:密码与账号相同则验证通过</el-text>
      </template>
      <el-form
        class="custom-label-size"
        :model="loginForm"
        label-position="left"
        ref="loginFormRef"
        :rules="loginFormRules"
      >
        <el-form-item label="账号" label-width="50px" prop="account">
          <el-input v-model.trim="loginForm.account" @keyup.enter="confirmLogin" />
        </el-form-item>
        <el-form-item label="密码" label-width="50px" prop="password">
          <el-input v-model="loginForm.password" @keyup.enter="confirmLogin" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showMaintenanceLogin = false">取消</el-button>
          <el-button type="primary" @click="confirmLogin"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules, UploadInstance } from 'element-plus'
import util from '@/common/util'
import { CameraFilled } from '@element-plus/icons-vue'
import forms from '@/common/forms'
import apis from '@/common/apis'
import type {
  StorageForm,
  VersionInfo,
  userCommUartForm,
  userCommUdpForm,
  UserCommunicationForm
} from '@/common/apis/modelTypes'

type LoginFormType = { account: string; password: string }
const upload = ref<UploadInstance>()
const systemConfigModel = ref([] as string[])

const systemInfo = ref<VersionInfo>({} as VersionInfo)
const userCommConfigForm = ref<UserCommunicationForm>({
  udp: {} as userCommUdpForm,
  uart: {} as userCommUartForm,
  checkData: 0
} as UserCommunicationForm)
const storageForm = ref<StorageForm>({} as StorageForm)
const showMaintenanceLogin = ref(false)
const showMaintenanceForm = ref(false)
const loginForm = ref<LoginFormType>({} as LoginFormType)
const userCommConfigRef = ref()
const storageRef = ref()
const loginFormRef = ref(null)
const loading = ref({
  systemSectionLoading: false,
  userConmunicationSectionLoading: false,
  storageSectionLoading: false,
  // button loading
  selectFileBtnLoding: false,
  updateSystemBtnLoading: false,
  resetSystemBtnLoading: false,
  restartBtnLoding: false,
  submitUserCommunicationBtnLoding: false,
  submitStorageInfoBtnLoading: false,
  formatBtnLoading: false
})
const userCommConfigRules = reactive<FormRules<UserCommunicationForm>>({
  'udp.udpLocalPort': [{ validator: forms.checkNumber(0, 65535, '本机端口'), trigger: 'blur' }],
  'udp.udpDstIp': [{ validator: forms.checkIp('目的地址'), trigger: 'blur' }],
  'udp.udpDstPort': [{ validator: forms.checkNumber(0, 65535, '目的端口'), trigger: 'blur' }],
  'uart.baudrate': [{ validator: forms.checkNumber(0, 1000000, '波特率'), trigger: 'blur' }],
  'uart.dataBit': [{ validator: forms.checkNumber(0, 10, '数据位'), trigger: 'blur' }],
  'uart.stopBit': [{ validator: forms.checkNumber(0, 10, '停止位'), trigger: 'blur' }],
  'uart.parityBit': [{ validator: forms.checkNumber(0, 10, '校验位'), trigger: 'blur' }]
})
const storageRules = reactive<FormRules<StorageForm>>({
  recordType: [{ validator: forms.checkSelect('录像格式'), trigger: 'change' }],
  recordMode: [{ validator: forms.checkSelect('录像模式'), trigger: 'change' }],
  recordDuration: [{ validator: forms.checkSelect('文件时长'), trigger: 'change' }]
})
const loginFormRules = reactive<FormRules<LoginFormType>>({
  account: [{ validator: forms.checkString('账号'), trigger: 'blur' }],
  password: [{ validator: forms.checkString('密码'), trigger: 'blur' }]
})
const handSystemFormExpand = () => {
  if (!showMaintenanceForm.value) {
    showMaintenanceLogin.value = true
    systemConfigModel.value = []
  }
}
const confirmLogin = () => {
  if (!loginFormRef.value) {
    return
  }
  ;(loginFormRef.value as FormInstance).validate((valid) => {
    if (!valid) {
      return
    }
    if (loginForm.value.account === loginForm.value.password) {
      util.showMessage('认证成功')
      showMaintenanceLogin.value = false
      showMaintenanceForm.value = true
      systemConfigModel.value = ['1']
    } else {
      util.showMessage('账号或密码错误', 'error')
    }
  })
}
const resetSystem = () => {
  loading.value.resetSystemBtnLoading = true
  apis
    .systemSetting(2)
    .then((res) => util.resultHandler(res, '恢复出厂设置失败'))
    .finally(() => (loading.value.resetSystemBtnLoading = false))
}
const restartSystem = () => {
  loading.value.restartBtnLoding = true
  apis
    .systemSetting(1)
    .then((res) => util.resultHandler(res, '重启系统失败'))
    .finally(() => (loading.value.restartBtnLoding = false))
}

const submitUpload = () => {
  upload.value!.submit()
}
const confirmFormat = () => {
  loading.value.formatBtnLoading = true
  apis
    .formatDisk()
    .then((res) => util.resultHandler(res, '格式化硬盘失败'))
    .finally(() => (loading.value.formatBtnLoading = false))
  // todo format
}
const confirmUserCommConfig = () => {
  if (!userCommConfigRef.value) {
    return
  }
  ;(userCommConfigRef.value as FormInstance).validate((valid) => {
    if (valid) {
      loading.value.submitUserCommunicationBtnLoding = true
      apis
        .submitUserCommunicationForm(userCommConfigForm.value)
        .then((res) => util.resultHandler(res, '提交用户通信配置信息失败'))
        .finally(() => {
          loading.value.submitUserCommunicationBtnLoding = false
        })
    } else {
      util.showMessage('表单校验失败', 'error')
    }
  })
}
const confirmStorage = () => {
  if (!storageRef.value) {
    return
  }
  ;(storageRef.value as FormInstance).validate((valid) => {
    if (valid) {
      loading.value.submitStorageInfoBtnLoading = true
      apis
        .submitStorageForm(storageForm.value)
        .then((res) => util.resultHandler(res, '提交配置信息失败'))
        .finally(() => (loading.value.submitStorageInfoBtnLoading = false))
    } else {
      util.showMessage('表单校验失败', 'error')
    }
  })
}

onMounted(() => {
  loading.value.systemSectionLoading = true
  loading.value.userConmunicationSectionLoading = true
  loading.value.storageSectionLoading = true
  apis
    .getVersionInfo()
    .then((res) => (systemInfo.value = res))
    .finally(() => {
      loading.value.systemSectionLoading = false
    })
  apis
    .getUserCommunicationInfo()
    .then((res) => (userCommConfigForm.value = res))
    .finally(() => {
      loading.value.userConmunicationSectionLoading = false
    })
  apis
    .getStorageInfo()
    .then((res) => (storageForm.value = res))
    .finally(() => (loading.value.storageSectionLoading = false))
})
</script>
<style scoped>
.channel-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
::v-deep .system-form .el-upload-list__item-name {
  width: 200px;
}
</style>
