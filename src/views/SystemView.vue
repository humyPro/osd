<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered">
          <FormTitle title="系统信息"></FormTitle>
          <el-form :model="systemInfo" label-position="left" :rules="systemInfoRules">
            <el-form-item label="系统版本" prop="systemVersion">
              <el-input v-model.trim="systemInfo.systemVersion" />
            </el-form-item>
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
            <el-divider />
            <div style="width: 100%; display: flex; justify-content: space-around">
              <el-button type="danger">恢复出厂设置</el-button>
              <el-button type="danger">重启</el-button>
            </div>
          </el-form>
        </div>
        <div class="form-box bordered">
          <FormTitle title="用户通信配置"></FormTitle>
          <el-form
            :model="userCommConfigForm"
            label-position="left"
            :rules="userCommConfigRules"
            ref="userCommConfigRef"
          >
            <el-form-item label="UDP" prop="udpEnable">
              <el-switch v-model="userCommConfigForm.udpEnable" />
            </el-form-item>
            <el-form-item label="本机端口" prop="localPort">
              <el-input type="number" v-model.number="userCommConfigForm.localPort" />
            </el-form-item>
            <el-form-item label="目的地址" prop="targetAddr">
              <el-input v-model.trim="userCommConfigForm.targetAddr" />
            </el-form-item>
            <el-form-item label="目的端口" prop="targetPort">
              <el-input type="number" v-model.number="userCommConfigForm.targetPort" />
            </el-form-item>
            <el-divider />

            <el-form-item label="UART" prop="udpH26XEnable">
              <el-switch v-model="userCommConfigForm.uartEnabel" />
            </el-form-item>
            <el-form-item type="number" label="波特率" prop="baudRate">
              <el-input v-model.number="userCommConfigForm.baudRate" />
            </el-form-item>
            <el-form-item label="数据位" prop="dataBit">
              <el-input
                type="number"
                placeholder="5/6/7/8"
                v-model.number="userCommConfigForm.dataBit"
              />
            </el-form-item>
            <el-form-item label="停止位" prop="stopBit">
              <el-input
                type="number"
                placeholder="1/1.5/2"
                v-model.number="userCommConfigForm.stopBit"
              />
            </el-form-item>
            <el-form-item label="校验位" prop="checkBit">
              <el-input
                placeholder="奇校验/偶校验/无"
                v-model.number="userCommConfigForm.checkBit"
              />
            </el-form-item>
            <el-divider />

            <el-form-item label="检测数据">
              <el-switch v-model="userCommConfigForm.dataCheckEnable" />
            </el-form-item>
            <el-button type="primary" class="save-button" @click="confirmUserCommConfig"
              >保存</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered">
          <FormTitle title="存储"></FormTitle>
          <el-form
            :model="storageForm"
            label-position="left"
            ref="storageRef"
            :rules="storageRules"
          >
            <el-form-item label="录像格式" prop="videoFormat">
              <el-select v-model="storageForm.videoFormat">
                <el-option label="H26X" value="H26X" />
                <el-option label="MP4" value="MP4" />
                <el-option label="AVI" value="AVI" />
                <el-option label="FLV" value="AFLVVI" />
              </el-select>
            </el-form-item>
            <el-form-item label="录像模式" prop="videoModel">
              <el-radio-group v-model="storageForm.videoModel">
                <el-radio label="1">循环</el-radio>
                <el-radio label="2">非循环</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文件时长" prop="fileDuration">
              <el-select v-model="storageForm.fileDuration">
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
              <el-text>{{ storageForm.freeSize }}MB</el-text>
            </el-form-item>
            <el-form-item label=" ">
              <el-popconfirm
                title="确定要格式化吗?"
                @confirm="confirmFormat"
                confirm-button-text="确定"
                cancel-button-text="取消"
              >
                <template #reference>
                  <el-button type="danger">格式化</el-button>
                </template>
              </el-popconfirm>
            </el-form-item>
            <el-form-item label="通道0">
              <div class="channel-content">
                <el-switch v-model="storageForm.channel1" />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-form-item label="通道1">
              <div class="channel-content">
                <el-switch v-model="storageForm.channel2" />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-form-item label="通道2">
              <div class="channel-content">
                <el-switch v-model="storageForm.channel3" />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-button type="primary" class="save-button" @click="confirmStorage">保存</el-button>
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
import { genFileId } from 'element-plus'
import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from 'element-plus'
import util from '@/common/util'
import { CameraFilled } from '@element-plus/icons-vue'
import forms from '@/common/forms'
type SystemInfoType = { systemVersion: string }
type UserCommConfigType = {
  udpEnable: boolean
  localPort: number
  targetAddr: string
  targetPort: number
  uartEnabel: boolean
  baudRate: number
  dataBit: number
  stopBit: number
  checkBit: number
  dataCheckEnable: boolean
}
type StorageType = {
  videoFormat: string
  videoModel: number
  fileDuration: number
  freeSize: number
  channel1: boolean
  channel2: boolean
  channel3: boolean
}
type LoginFormType = { account: string; password: string }
const upload = ref<UploadInstance>()
const systemConfigModel = ref([] as string[])

const systemInfo = ref<SystemInfoType>({} as SystemInfoType)
const userCommConfigForm = ref<UserCommConfigType>({} as UserCommConfigType)
const storageForm = ref<StorageType>({} as StorageType)
const showMaintenanceLogin = ref(false)
const showMaintenanceForm = ref(false)
const loginForm = ref<LoginFormType>({} as LoginFormType)
const userCommConfigRef = ref()
const storageRef = ref()
const loginFormRef = ref(null)
const systemInfoRules = reactive<FormRules<SystemInfoType>>({
  systemVersion: [{ validator: forms.checkString('系统版本'), trigger: 'blur' }]
})
const userCommConfigRules = reactive<FormRules<UserCommConfigType>>({
  localPort: [{ validator: forms.checkNumber(0, 65535, '本机端口'), trigger: 'blur' }],
  targetAddr: [{ validator: forms.checkString('目的地址'), trigger: 'blur' }],
  targetPort: [{ validator: forms.checkNumber(0, 65535, '目的端口'), trigger: 'blur' }],
  baudRate: [{ validator: forms.checkNumber(0, 10000, '波特率'), trigger: 'blur' }],
  dataBit: [{ validator: forms.checkNumber(0, 10, '数据位'), trigger: 'blur' }],
  stopBit: [{ validator: forms.checkNumber(0, 10, '停止位'), trigger: 'blur' }],
  checkBit: [{ validator: forms.checkNumber(0, 10, '校验位'), trigger: 'blur' }]
})
const storageRules = reactive<FormRules<StorageType>>({
  videoFormat: [{ validator: forms.checkSelect('录像格式'), trigger: 'change' }],
  videoModel: [{ validator: forms.checkSelect('录像模式'), trigger: 'change' }],
  fileDuration: [{ validator: forms.checkSelect('文件时长'), trigger: 'change' }]
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
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
const confirmFormat = () => {
  // todo format
}
const confirmUserCommConfig = () => {
  if (!userCommConfigRef.value) {
    return
  }
  ;(userCommConfigRef.value as FormInstance).validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
  })
}
const confirmStorage = () => {
  if (!storageRef.value) {
    return
  }
  ;(storageRef.value as FormInstance).validate((valid) => {
    if (valid) {
      alert('表单提交成功')
    } else {
      alert('表单校验失败')
    }
  })
}
</script>
<style scoped>
.channel-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
