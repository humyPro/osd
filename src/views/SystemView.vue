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
              <el-select v-model="userCommConfigForm.uart.parityBit">
                <el-option label="无" :value="0" />
                <el-option label="奇校验" :value="1" />
                <el-option label="偶校验" :value="2" />
              </el-select>
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
                <el-option label="H26X" :value="0" />
                <el-option label="MP4" :value="1" />
                <el-option label="AVI" :value="2" />
                <el-option label="FLV" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="录像模式" prop="recordMode">
              <el-radio-group v-model="storageForm.recordMode">
                <el-radio label="1" :value="0">循环</el-radio>
                <el-radio label="2" :value="1">非循环</el-radio>
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
              <el-text :title="systemInfo.version" :line-clamp="5">{{
                systemInfo.version || 'unknown'
              }}</el-text>
            </el-form-item>
            <el-form-item label="系统升级">
              <el-upload
                ref="upload"
                class="upload-demo"
                v-model:file-list="fileList"
                :action="upgradeUrl"
                :limit="1"
                :auto-upload="false"
                :on-error="onUploadError"
                :on-success="onUploadSuccess"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
              >
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
                  :disabled="upgradeBtnDisabled"
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
        <div class="form-box bordered" v-loading="loading.systemMaintenanceLoading">
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
              <div v-if="showMaintenanceForm" class="system-info-box">
                <div class="system-info-wrap">
                  <div>
                    <el-form
                      class="custom-label-size"
                      :rules="systemProductRules"
                      :model="systemMaintenance.product"
                      label-width="80px"
                      ref="systemProductRef"
                    >
                      <FormTitle title="产品信息"></FormTitle>
                      <el-form-item label="产品编码" prop="productNo">
                        <el-input
                          :disabled="systemMaintenance.product.lock === 'true'"
                          v-model="systemMaintenance.product.productNo"
                        />
                      </el-form-item>
                      <el-form-item label="产品SN码" prop="productSn">
                        <el-input
                          :disabled="systemMaintenance.product.lock === 'true'"
                          v-model="systemMaintenance.product.productSn"
                        />
                      </el-form-item>
                      <el-form-item label="备注" prop="note">
                        <el-input
                          :disabled="systemMaintenance.product.lock === 'true'"
                          v-model="systemMaintenance.product.note"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                      <el-button
                        :disabled="systemMaintenance.product.lock === 'true'"
                        :loading="loading.productInfoBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmSystemProduct"
                        >保存</el-button
                      >
                    </el-form>
                  </div>
                  <div>
                    <el-form
                      class="custom-label-size"
                      :rules="systemProductConfigRules"
                      :model="systemMaintenance.config"
                      label-width="80px"
                      ref="systemProductConfigRef"
                    >
                      <FormTitle title="产品配置"></FormTitle>
                      <el-form-item label="TV1型号" prop="tv1">
                        <el-input v-model="systemMaintenance.config.tv1" />
                      </el-form-item>
                      <el-form-item label="TV2型号" prop="tv2">
                        <el-input v-model="systemMaintenance.config.tv2" />
                      </el-form-item>
                      <el-form-item label="IR1型号" prop="ir1">
                        <el-input v-model="systemMaintenance.config.ir1" />
                      </el-form-item>
                      <el-form-item label="IR2型号" prop="ir2">
                        <el-input v-model="systemMaintenance.config.ir2" />
                      </el-form-item>
                      <el-form-item label="LA型号" prop="la">
                        <el-input v-model="systemMaintenance.config.la" />
                      </el-form-item>
                      <el-form-item label="用户协议" prop="userProtocol">
                        <el-input v-model="systemMaintenance.config.userProtocol" />
                      </el-form-item>
                      <el-button
                        :loading="loading.productConfigBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmSystemProductConfig"
                        >保存
                      </el-button>
                    </el-form>
                  </div>
                </div>

                <!-- <FormTitle title="云台参数"></FormTitle> -->
                <div class="system-info-wrap">
                  <div>
                    <el-form
                      class="custom-label-size"
                      :rules="systemPtzAngleZeroRules"
                      :model="systemMaintenance.ptz.angleZero"
                      label-width="80px"
                      ref="systemYtAngleZeroRef"
                    >
                      <FormTitle title="角度零位"></FormTitle>
                      <el-form-item label="方位" prop="angleYaw">
                        <el-input v-model="systemMaintenance.ptz.angleZero.angleYaw" />
                      </el-form-item>
                      <el-form-item label="俯仰" prop="anglePitch">
                        <el-input v-model="systemMaintenance.ptz.angleZero.anglePitch" />
                      </el-form-item>
                      <el-form-item label="滚转" prop="angleRoll">
                        <el-input v-model="systemMaintenance.ptz.angleZero.angleRoll" />
                      </el-form-item>
                      <el-button
                        :loading="loading.ytZeroBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmAngleZero"
                        >保存
                      </el-button>
                    </el-form>
                    <el-form
                      class="custom-label-size"
                      :rules="systemPtzInstallZeroRules"
                      :model="systemMaintenance.ptz.installZero"
                      label-width="80px"
                      ref="systemYtInstallRef"
                    >
                      <FormTitle title="安装误差"></FormTitle>
                      <el-form-item label="方位" prop="installYaw">
                        <el-input v-model="systemMaintenance.ptz.installZero.installYaw" />
                      </el-form-item>
                      <el-form-item label="俯仰" prop="installPitch">
                        <el-input v-model="systemMaintenance.ptz.installZero.installPitch" />
                      </el-form-item>
                      <el-form-item label="滚转" prop="installRoll">
                        <el-input v-model="systemMaintenance.ptz.installZero.installRoll" />
                      </el-form-item>
                      <el-button
                        :loading="loading.ytInstallBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmInstall"
                        >保存
                      </el-button>
                    </el-form>
                  </div>
                  <div>
                    <FormTitle title="伺服参数"></FormTitle>
                    <el-tabs v-model="activeName" class="demo-tabs">
                      <el-tab-pane label="方位" name="yaw">
                        <el-form
                          class="custom-label-size"
                          :rules="systemYtYawRules"
                          :model="systemMaintenance.ptz"
                          label-width="80px"
                          ref="systemYtYawRef"
                        >
                          <el-form-item label="方位Kp" prop="yawKp">
                            <el-input v-model="systemMaintenance.ptz.yawKp" />
                          </el-form-item>
                          <el-form-item label="方位Ki" prop="yawKi">
                            <el-input v-model="systemMaintenance.ptz.yawKi" />
                          </el-form-item>
                          <el-form-item label="方位Fp" prop="yawFp">
                            <el-input v-model="systemMaintenance.ptz.yawFp" />
                          </el-form-item>
                          <el-button
                            :loading="loading.ptzServoBtnLoding"
                            class="save-button"
                            type="primary"
                            @click="confirmServoParams('yaw')"
                            >保存
                          </el-button>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="俯仰" name="pitch">
                        <el-form
                          class="custom-label-size"
                          :rules="systemYtPitchRules"
                          :model="systemMaintenance.ptz"
                          label-width="80px"
                          ref="systemYtPitchRef"
                        >
                          <el-form-item label="俯仰Kp" prop="pitchKp">
                            <el-input v-model="systemMaintenance.ptz.pitchKp" />
                          </el-form-item>
                          <el-form-item label="俯仰Ki" prop="pitchKi">
                            <el-input v-model="systemMaintenance.ptz.pitchKi" />
                          </el-form-item>
                          <el-form-item label="俯仰Fp" prop="pitchFp">
                            <el-input v-model="systemMaintenance.ptz.pitchFp" />
                          </el-form-item>
                          <el-button
                            :loading="loading.ptzServoBtnLoding"
                            class="save-button"
                            type="primary"
                            @click="confirmServoParams('pitch')"
                            >保存
                          </el-button>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="滚转" name="roll">
                        <el-form
                          class="custom-label-size"
                          :rules="systemYtRollRules"
                          :model="systemMaintenance.ptz"
                          label-width="80px"
                          ref="systemYtRollRef"
                        >
                          <el-form-item label="滚转Kp" prop="rollKp">
                            <el-input v-model="systemMaintenance.ptz.rollKp" />
                          </el-form-item>
                          <el-form-item label="滚转Ki" prop="rollKi">
                            <el-input v-model="systemMaintenance.ptz.rollKi" />
                          </el-form-item>
                          <el-form-item label="滚转Fp" prop="rollFp">
                            <el-input v-model="systemMaintenance.ptz.rollFp" />
                          </el-form-item>
                          <el-button
                            :loading="loading.ptzServoBtnLoding"
                            class="save-button"
                            type="primary"
                            @click="confirmServoParams('rollch')"
                            >保存
                          </el-button>
                        </el-form>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <div>
                  <FormTitle title="陀螺补偿"></FormTitle>
                  <el-form
                    class="custom-label-size"
                    :rules="systemGyroscopeRules"
                    :model="systemMaintenance.ptz"
                    label-width="80px"
                    ref="systemGyroscopeRef"
                  >
                    <el-form-item label="Xa" prop="xa">
                      <el-input v-model="systemMaintenance.ptz.xa" />
                    </el-form-item>
                    <el-form-item label="Xb" prop="xb">
                      <el-input v-model="systemMaintenance.ptz.xb" />
                    </el-form-item>
                    <el-form-item label="Ya" prop="ya">
                      <el-input v-model="systemMaintenance.ptz.ya" />
                    </el-form-item>
                    <el-form-item label="Yb" prop="yb">
                      <el-input v-model="systemMaintenance.ptz.yb" />
                    </el-form-item>
                    <el-form-item label="Za" prop="za">
                      <el-input v-model="systemMaintenance.ptz.za" />
                    </el-form-item>
                    <el-form-item label="Zb" prop="zb">
                      <el-input v-model="systemMaintenance.ptz.zb" />
                    </el-form-item>
                    <el-button
                      :loading="loading.gyroscopeBtnLoding"
                      class="save-button"
                      type="primary"
                      @click="confirmGyro"
                    >
                      确认
                    </el-button>
                  </el-form>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <el-dialog v-model="showMaintenanceLogin" width="30%" :show-close="false" style="width: 360px">
      <template #header> <el-text>验证密码后显示系统维护页面</el-text><br /> </template>
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
          <el-input v-model="loginForm.password" @keyup.enter="confirmLogin" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showMaintenanceLogin = false">取消</el-button>
          <el-button type="primary" @click="confirmLogin" :loading="loading.systemLoginBtnLoading">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  genFileId,
  type FormInstance,
  type FormRules,
  type UploadInstance,
  type UploadProps,
  type UploadRawFile
} from 'element-plus'
import util from '@/common/util'
import { CameraFilled } from '@element-plus/icons-vue'
import forms from '@/common/forms'
import apis from '@/common/apis'
import store from '@/store/AppStore'
import type {
  StorageForm,
  VersionInfo,
  UserCommUartForm,
  UserCommUdpForm,
  UserCommunicationForm,
  SystemMaintenance,
  SystemProduct,
  SystemProductConfig,
  SystemPtzAngleZero,
  SystemPtzInstallZero,
  SystemGyroscope,
  SystemYtPitch,
  SystemYtYaw,
  SystemYtRoll
} from '@/common/apis/modelTypes'
import type { StartWith } from '@/common/type'

type LoginFormType = { account: string; password: string }
const upload = ref<UploadInstance>()
const systemConfigModel = ref([] as string[])

const systemInfo = ref<VersionInfo>({} as VersionInfo)
const userCommConfigForm = ref<UserCommunicationForm>({
  udp: {} as UserCommUdpForm,
  uart: {} as UserCommUartForm,
  checkData: 0
} as UserCommunicationForm)
const storageForm = ref<StorageForm>({} as StorageForm)
const systemMaintenance = ref<SystemMaintenance>({
  product: {},
  config: {},
  ptz: {
    angleZero: {},
    installZero: {}
  }
} as SystemMaintenance)
const systemMaintenanceValues = {
  无: '',
  X1: 'X1',
  X2: 'X2',
  X3: 'X3',
  X4: 'X4'
}
const showMaintenanceLogin = ref(false)
const showMaintenanceForm = ref(false)
const loginForm = ref<LoginFormType>({} as LoginFormType)
const userCommConfigRef = ref()
const storageRef = ref()
const loginFormRef = ref()
const systemMaintenanceFormRef = ref()
const fileList = ref([])
const upgradeBtnDisabled = ref(true)
const upgradeUrl = store.config.upgradeSystemFileUrl
// const upgradeUrl = 'http://192.168.144.1:8080/upload'
const loading = ref({
  systemSectionLoading: false,
  userConmunicationSectionLoading: false,
  storageSectionLoading: false,
  systemMaintenanceLoading: false,
  // button loading
  selectFileBtnLoding: false,
  updateSystemBtnLoading: false,
  resetSystemBtnLoading: false,
  restartBtnLoding: false,
  submitUserCommunicationBtnLoding: false,
  submitStorageInfoBtnLoading: false,
  systemMaintenanceBtnLoading: true,
  formatBtnLoading: false,
  //
  systemLoginBtnLoading: false,
  productInfoBtnLoding: false,
  productConfigBtnLoding: false,
  ytZeroBtnLoding: false,
  ytInstallBtnLoding: false,
  ptzServoBtnLoding: false,
  gyroscopeBtnLoding: false
})
const activeName = ref('yaw') // 云台配置菜单控制
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

const systemProductRef = ref()
const systemProductConfigRef = ref()
const systemYtAngleZeroRef = ref()
const systemYtInstallRef = ref()
const systemYtYawRef = ref()
const systemYtPitchRef = ref()
const systemYtRollRef = ref()
const systemGyroscopeRef = ref()
const systemProductRules = reactive<FormRules<SystemProduct>>({
  productNo: [{ validator: forms.checkString('产品编码'), trigger: 'blur' }],
  productSn: [{ validator: forms.checkString('产品SN码'), trigger: 'blur' }],
  note: [{ validator: forms.checkString('备注'), trigger: 'blur' }]
})
const systemProductConfigRules = reactive<FormRules<SystemProductConfig>>({
  tv1: [{ validator: forms.checkString('TV1型号'), trigger: 'blur' }],
  tv2: [{ validator: forms.checkString('TV2型号'), trigger: 'blur' }],
  ir1: [{ validator: forms.checkString('IR1型号'), trigger: 'blur' }],
  ir2: [{ validator: forms.checkString('IR2型号'), trigger: 'blur' }],
  la: [{ validator: forms.checkString('LA型号'), trigger: 'blur' }],
  userProtocol: [{ validator: forms.checkString('用户协议'), trigger: 'blur' }]
})
const systemPtzAngleZeroRules = reactive<FormRules<SystemPtzAngleZero>>({
  angleYaw: [{ validator: forms.checkString('方位'), trigger: 'blur' }],
  anglePitch: [{ validator: forms.checkString('仰角'), trigger: 'blur' }],
  angleRoll: [{ validator: forms.checkString('翻滚'), trigger: 'blur' }]
})
const systemPtzInstallZeroRules = reactive<FormRules<SystemPtzInstallZero>>({
  installYaw: [{ validator: forms.checkString('方位'), trigger: 'blur' }],
  installPitch: [{ validator: forms.checkString('仰角'), trigger: 'blur' }],
  installRoll: [{ validator: forms.checkString('翻滚'), trigger: 'blur' }]
})
const systemYtYawRules = reactive<FormRules<SystemYtYaw>>({
  yawKp: [{ validator: forms.checkString('方位Kp'), trigger: 'blur' }],
  yawKi: [{ validator: forms.checkString('方位Ki'), trigger: 'blur' }],
  yawFp: [{ validator: forms.checkString('方位Fp'), trigger: 'blur' }]
})
const systemYtPitchRules = reactive<FormRules<SystemYtPitch>>({
  pitchKp: [{ validator: forms.checkString('俯仰Kp'), trigger: 'blur' }],
  pitchKi: [{ validator: forms.checkString('俯仰Ki'), trigger: 'blur' }],
  pitchFp: [{ validator: forms.checkString('俯仰Fp'), trigger: 'blur' }]
})
const systemYtRollRules = reactive<FormRules<SystemYtRoll>>({
  rollKp: [{ validator: forms.checkString('滚转Kp'), trigger: 'blur' }],
  rollKi: [{ validator: forms.checkString('滚转Ki'), trigger: 'blur' }],
  rollFp: [{ validator: forms.checkString('滚转Fp'), trigger: 'blur' }]
})
const systemGyroscopeRules = reactive<FormRules<SystemGyroscope>>({
  xa: [{ validator: forms.checkString('Xa'), trigger: 'blur' }],
  xb: [{ validator: forms.checkString('Xb'), trigger: 'blur' }],
  ya: [{ validator: forms.checkString('Ya'), trigger: 'blur' }],
  yb: [{ validator: forms.checkString('Yb'), trigger: 'blur' }],
  za: [{ validator: forms.checkString('Za'), trigger: 'blur' }],
  zb: [{ validator: forms.checkString('Zb'), trigger: 'blur' }]
})
/**
 * yawKp: number
  yawKi: number
  yawFp: number
 */
watch(fileList, (newValue) => {
  upgradeBtnDisabled.value = newValue == null || newValue.length == 0
})

const handSystemFormExpand = () => {
  if (!showMaintenanceForm.value) {
    showMaintenanceLogin.value = true
    systemConfigModel.value = []
  }
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

const onUploadError = (error: Error) => {
  console.error(error)
  util.showMessage('文件上传失败', 'error')
  fileList.value = []
}
const onUploadSuccess = () => {
  util.showMessage('文件上传成功')
  getSystemInfo()
}
const handleRemove: UploadProps['onRemove'] = () => {
  upload.value!.clearFiles()
}
const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
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

const confirmSystemMaintenance = () => {
  if (!systemMaintenanceFormRef.value) {
    return
  }
  ;(systemMaintenanceFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      loading.value.systemMaintenanceBtnLoading = true
      apis
        .submitSystemMaintenance(systemMaintenance.value)
        .then((res) => util.resultHandler(res, '提交系统维护信息失败'))
        .finally(() => (loading.value.systemMaintenanceBtnLoading = false))
    } else {
      util.showMessage('表单校验失败', 'error')
    }
  })
}

const confirmLogin = () => {
  if (!loginFormRef.value) {
    return
  }
  ;(loginFormRef.value as FormInstance).validate((valid) => {
    if (!valid) {
      return
    }

    forms.validateForm(loginFormRef.value as FormInstance, () => {
      loading.value.systemLoginBtnLoading = true
      apis
        .submitSplitSystemMaintenanceForm('auth', {
          auth: {
            user: loginForm.value.account,
            passwd: loginForm.value.password
          }
        })
        .then((res) =>
          util.resultHandler(res, '认证失败', () => {
            util.showMessage('认证成功')
            showMaintenanceLogin.value = false
            showMaintenanceForm.value = true
            systemConfigModel.value = ['1']
            nextTick(() => getSystemMaintenanceInfo())
          })
        )
        .finally(() => (loading.value.systemLoginBtnLoading = false))
    })
  })
}

const confirmSystemProduct = () => {
  if (!systemProductRef.value) {
    return
  }
  forms.validateForm(systemProductRef.value as FormInstance, () => {
    loading.value.productInfoBtnLoding = true
    apis
      .submitSplitSystemMaintenanceForm('product', {
        product: systemMaintenance.value.product
      })
      .then((res) => util.resultHandler(res, '提交产品信息失败'))
      .finally(() => (loading.value.productInfoBtnLoding = false))
  })
}

const confirmSystemProductConfig = () => {
  if (!systemProductConfigRef.value) {
    return
  }
  forms.validateForm(systemProductConfigRef.value as FormInstance, () => {
    loading.value.productConfigBtnLoding = true
    apis
      .submitSplitSystemMaintenanceForm('product_config', {
        productConfig: systemMaintenance.value.config
      })
      .then((res) => util.resultHandler(res, '提交产品配置信息失败'))
      .finally(() => (loading.value.productConfigBtnLoding = false))
  })
}

const confirmAngleZero = () => {
  if (!systemYtAngleZeroRef.value) {
    return
  }
  forms.validateForm(systemYtAngleZeroRef.value as FormInstance, () => {
    loading.value.ytZeroBtnLoding = true
    apis
      .submitSplitSystemMaintenanceForm('angle_zero', {
        angleZero: systemMaintenance.value.ptz.angleZero
      })
      .then((res) => util.resultHandler(res, '提交角度零位信息失败'))
      .finally(() => (loading.value.ytZeroBtnLoding = false))
  })
}

const confirmInstall = () => {
  if (!systemYtInstallRef.value) {
    return
  }
  forms.validateForm(systemYtInstallRef.value as FormInstance, () => {
    loading.value.ytInstallBtnLoding = true
    apis
      .submitSplitSystemMaintenanceForm('install_zero', {
        installZero: systemMaintenance.value.ptz.installZero
      })
      .then((res) => util.resultHandler(res, '提交安装误差信息失败'))
      .finally(() => (loading.value.ytInstallBtnLoding = false))
  })
}

const servoRefMap = {
  yaw: systemYtYawRef,
  pitch: systemYtPitchRef,
  roll: systemYtRollRef
}
const confirmServoParams = (type: keyof typeof servoRefMap) => {
  if (!servoRefMap[type].value) {
    return
  }
  forms.validateForm(servoRefMap[type].value as FormInstance, () => {
    type keysType = keyof typeof systemMaintenance.value.ptz
    loading.value.ptzServoBtnLoding = true
    const keys = Object.keys(systemMaintenance.value.ptz) as [keysType]
    type formType = Partial<Record<StartWith<keysType, typeof type>, any>>
    const params = (keys.filter((k) => k.startsWith(type)) as [keyof formType]).reduce((p, c) => {
      p[c] = systemMaintenance.value.ptz[c]
      return p
    }, {} as formType)
    apis
      .submitSplitSystemMaintenanceForm('servo_' + type, {
        [type]: params
      })
      .then((res) => util.resultHandler(res, '提交伺服参数失败'))
      .finally(() => (loading.value.ptzServoBtnLoding = false))
  })
}

const confirmGyro = () => {
  if (!systemGyroscopeRef.value) {
    return
  }
  forms.validateForm(systemGyroscopeRef.value as FormInstance, () => {
    loading.value.gyroscopeBtnLoding = true
    type keyType = keyof typeof systemMaintenance.value.ptz
    const params = Object.keys(systemMaintenance.value.ptz)
      .filter((k) => k.startsWith('x') || k.startsWith('y') || k.startsWith('z'))
      .reduce((p, c) => (p[c as keyType] = systemMaintenance.value.ptz[c as keyType]), {} as any)
    apis
      .submitSplitSystemMaintenanceForm('gyro_compensation', {
        para: params
      })
      .then((res) => util.resultHandler(res, '提交陀螺补偿信息失败'))
      .finally(() => (loading.value.gyroscopeBtnLoding = false))
  })
}

const getSystemInfo = () => {
  loading.value.systemSectionLoading = true
  apis
    .getVersionInfo()
    .then((res) => (systemInfo.value = res))
    .finally(() => {
      loading.value.systemSectionLoading = false
    })
}
const getUserCommunicationInfo = () => {
  loading.value.userConmunicationSectionLoading = true
  apis
    .getUserCommunicationInfo()
    .then((res) => (userCommConfigForm.value = res))
    .finally(() => {
      loading.value.userConmunicationSectionLoading = false
    })
}
const getStorageInfo = () => {
  loading.value.storageSectionLoading = true

  apis
    .getStorageInfo()
    .then((res) => (storageForm.value = res))
    .finally(() => (loading.value.storageSectionLoading = false))
}

const getSystemMaintenanceInfo = () => {
  loading.value.systemMaintenanceLoading = true
  apis
    .getSystemMaintenanceInfo()
    .then((res) => (systemMaintenance.value = res))
    .finally(() => (loading.value.systemMaintenanceLoading = false))
}

onMounted(() => {
  getSystemInfo()
  getUserCommunicationInfo()
  getStorageInfo()
})
</script>
<style scoped>
.channel-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
:deep(.system-form .el-upload-list__item-name) {
  width: 200px;
}
:deep(.el-upload-list__item-file-name) {
  width: 160px;
}
:deep(.el-upload-list__item .el-progress) {
  top: 30px;
}
.system-info-box {
  display: flex;
}
.system-info-wrap {
  display: flex;
  flex-direction: column;
  margin: 0 21px;
}
</style>
