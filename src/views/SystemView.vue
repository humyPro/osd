<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered" v-loading="loading.userConmunicationSectionLoading">
          <FormTitle :title="t('userCommunication.title')"></FormTitle>
          <el-form
            :model="userCommConfigForm"
            label-position="left"
            :rules="userCommConfigRules"
            ref="userCommConfigRef"
          >
            <el-form-item :label="t('userCommunication.udp')" prop="udp.udpEn">
              <el-switch
                v-model="userCommConfigForm.udp.udpEn"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item :label="t('userCommunication.localPort')" prop="udp.udpLocalPort">
              <el-input type="number" v-model.number="userCommConfigForm.udp.udpLocalPort" />
            </el-form-item>
            <el-form-item :label="t('userCommunication.destinationAddress')" prop="udp.udpDstIp">
              <el-input v-model.trim="userCommConfigForm.udp.udpDstIp" />
            </el-form-item>
            <el-form-item :label="t('userCommunication.destinationPort')" prop="udp.udpDstPort">
              <el-input type="number" v-model.number="userCommConfigForm.udp.udpDstPort" />
            </el-form-item>
            <el-divider />

            <el-form-item :label="t('userCommunication.uart')" prop="uart.uartEn">
              <el-switch
                v-model="userCommConfigForm.uart.uartEn"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item
              type="number"
              :label="t('userCommunication.baudRate')"
              prop="uart.baudrate"
            >
              <el-input v-model.number="userCommConfigForm.uart.baudrate" />
            </el-form-item>
            <el-form-item :label="t('userCommunication.dataBits')" prop="uart.dataBit">
              <el-input
                type="number"
                placeholder="5/6/7/8"
                v-model.number="userCommConfigForm.uart.dataBit"
              />
            </el-form-item>
            <el-form-item :label="t('userCommunication.stopBits')" prop="uart.stopBit">
              <el-input
                type="number"
                placeholder="1/1.5/2"
                v-model.number="userCommConfigForm.uart.stopBit"
              />
            </el-form-item>
            <el-form-item :label="t('userCommunication.parity')" prop="uart.parityBit">
              <el-select v-model="userCommConfigForm.uart.parityBit">
                <el-option :label="t('userCommunication.parityOptions.none')" :value="0" />
                <el-option :label="t('userCommunication.parityOptions.odd')" :value="1" />
                <el-option :label="t('userCommunication.parityOptions.even')" :value="2" />
              </el-select>
            </el-form-item>
            <el-divider />

            <el-form-item :label="t('userCommunication.checkData')">
              <el-switch
                v-model="userCommConfigForm.checkData"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>

            <el-form-item :label="t('userCommunication.metadata')">
              <el-switch
                v-model="userCommConfigForm.metedata"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-button
              type="primary"
              class="save-button"
              @click="confirmUserCommConfig"
              :loading="loading.submitUserCommunicationBtnLoding"
              >{{ t('userCommunication.save') }}</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered" v-loading="loading.storageSectionLoading">
          <FormTitle :title="t('storage.title')"></FormTitle>
          <el-form
            :model="storageForm"
            label-position="left"
            ref="storageRef"
            :rules="storageRules"
          >
            <el-form-item :label="t('storage.format')" prop="recordType">
              <el-select v-model="storageForm.recordType">
                <el-option :label="t('storage.formatOptions.h26x')" :value="0" />
                <el-option :label="t('storage.formatOptions.mp4')" :value="1" />
                <el-option :label="t('storage.formatOptions.avi')" :value="2" />
                <el-option :label="t('storage.formatOptions.flv')" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('storage.mode')" prop="recordMode">
              <el-radio-group v-model="storageForm.recordMode">
                <el-radio :label="t('storage.modeOptions.loop')" :value="0"></el-radio>
                <el-radio :label="t('storage.modeOptions.nonLoop')" :value="1"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="t('storage.duration')" prop="recordDuration">
              <el-select v-model="storageForm.recordDuration">
                <el-option :label="t('storage.durationOptions.1min')" :value="1" />
                <el-option :label="t('storage.durationOptions.3min')" :value="3" />
                <el-option :label="t('storage.durationOptions.5min')" :value="5" />
                <el-option :label="t('storage.durationOptions.10min')" :value="10" />
                <el-option :label="t('storage.durationOptions.15min')" :value="15" />
                <el-option :label="t('storage.durationOptions.20min')" :value="20" />
                <el-option :label="t('storage.durationOptions.30min')" :value="30" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('storage.freeSpace')">
              <el-text>{{ storageForm.diskFreeSize }}MB</el-text>
            </el-form-item>
            <el-form-item :label="t('storage.totalSpace')">
              <el-text>{{ storageForm.diskTotalSize }}MB</el-text>
            </el-form-item>
            <el-form-item label=" ">
              <el-popconfirm
                :title="t('storage.formatConfirm')"
                @confirm="confirmFormat"
                :confirm-button-text="t('storage.confirm')"
                :cancel-button-text="t('storage.cancel')"
              >
                <template #reference>
                  <el-button type="danger" :loading="loading.formatBtnLoading">{{
                    t('storage.formatButton')
                  }}</el-button>
                </template>
              </el-popconfirm>
            </el-form-item>
            <el-form-item :label="t('storage.channel', { index: 0 })">
              <div class="channel-content">
                <el-switch
                  v-model="storageForm.ch0RecordEn"
                  :active-value="1"
                  :inactive-value="0"
                />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-form-item :label="t('storage.channel', { index: 1 })">
              <div class="channel-content">
                <el-switch
                  v-model="storageForm.ch1RecordEn"
                  :active-value="1"
                  :inactive-value="0"
                />
                <el-button :icon="CameraFilled" circle />
              </div>
            </el-form-item>
            <el-form-item :label="t('storage.channel', { index: 2 })">
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
              >{{ t('storage.save') }}</el-button
            >
          </el-form>
        </div>
        <div class="form-box bordered" v-loading="loading.systemSectionLoading">
          <FormTitle :title="t('system.title')"></FormTitle>
          <el-form :model="systemInfo" label-position="left" class="system-form">
            <el-form-item :label="t('system.version')">
              <el-text :title="systemInfo.version" :line-clamp="5">{{
                systemInfo.version || t('unknown')
              }}</el-text>
            </el-form-item>
            <el-form-item :label="t('system.upgrade')" class="upload">
              <el-upload
                style="display: flex; justify-content: center; flex-wrap: wrap"
                ref="upload"
                v-model:file-list="fileList"
                :action="upgradeUrl"
                :limit="1"
                :auto-upload="false"
                :on-error="onUploadError"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :on-change="handleChange"
              >
                <template #trigger>
                  <el-button type="primary" :loading="loading.selectFileBtnLoding">{{
                    t('system.selectFile')
                  }}</el-button>
                  <el-button
                    style="margin-left: 20px"
                    type="success"
                    @click="submitUpload"
                    :loading="loading.updateSystemBtnLoading"
                    :disabled="upgradeBtnDisabled"
                  >
                    {{ t('system.update') }}
                  </el-button>
                </template>
              </el-upload>
              <el-progress v-if="showUploadProgress" :percentage="upProgress" />
            </el-form-item>
            <el-divider />
            <div style="width: 100%; display: flex; justify-content: space-around">
              <el-button
                type="danger"
                :loading="loading.resetSystemBtnLoading"
                @click="resetSystem"
                >{{ t('system.reset') }}</el-button
              >
              <el-button type="danger" :loading="loading.restartBtnLoding" @click="restartSystem">{{
                t('system.restart')
              }}</el-button>
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
            <el-collapse-item name="1" :title="t('system.maintenance')">
              <template #title>
                <div style="width: 309px; display: flex; align-items: flex-start">
                  <el-text type="primary" size="large">{{ t('system.maintenance') }}</el-text>
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
                      <FormTitle :title="t('system.productInfo')"></FormTitle>
                      <el-form-item :label="t('system.model')" prop="productNo">
                        <el-input
                          :placeholder="t('placeholders.model')"
                          :disabled="systemMaintenance.product.lock === 'true'"
                          v-model="systemMaintenance.product.productNo"
                        />
                      </el-form-item>
                      <el-form-item :label="t('system.serialNumber')" prop="productSn">
                        <el-input
                          placeholder="001-0001"
                          :disabled="systemMaintenance.product.lock === 'true'"
                          v-model="systemMaintenance.product.productSn"
                        />
                      </el-form-item>
                      <el-form-item :label="t('system.notes')" prop="note">
                        <el-input
                          v-model="systemMaintenance.product.note"
                          type="textarea"
                        ></el-input>
                      </el-form-item>
                      <el-button
                        :loading="loading.productInfoBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmSystemProduct"
                        >{{ t('system.save') }}</el-button
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
                      <FormTitle :title="t('system.productConfig')"></FormTitle>
                      <el-form-item :label="t('system.tv1Model')" prop="tv1">
                        <el-input placeholder="0/1/2/3/4" v-model="systemMaintenance.config.tv1" />
                      </el-form-item>
                      <el-form-item :label="t('system.tv2Model')" prop="tv2">
                        <el-input placeholder="0/1/2/3/4" v-model="systemMaintenance.config.tv2" />
                      </el-form-item>
                      <el-form-item :label="t('system.ir1Model')" prop="ir1">
                        <el-input placeholder="0/1/2/3/4" v-model="systemMaintenance.config.ir1" />
                      </el-form-item>
                      <el-form-item :label="t('system.ir2Model')" prop="ir2">
                        <el-input placeholder="0/1/2/3/4" v-model="systemMaintenance.config.ir2" />
                      </el-form-item>
                      <el-form-item :label="t('system.laModel')" prop="la">
                        <el-input placeholder="0/1/2/3/4" v-model="systemMaintenance.config.la" />
                      </el-form-item>
                      <el-form-item :label="t('system.userProtocol')" prop="userProtocol">
                        <el-input
                          placeholder="0/1/2/3/4"
                          v-model="systemMaintenance.config.userProtocol"
                        />
                      </el-form-item>
                      <el-button
                        :loading="loading.productConfigBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmSystemProductConfig"
                        >{{ t('system.save') }}
                      </el-button>
                    </el-form>
                  </div>
                </div>

                <div class="system-info-wrap">
                  <div>
                    <FormTitle :title="t('system.angleZero')"></FormTitle>
                    <el-tabs v-model="zeroActiveName">
                      <el-tab-pane
                        :label="
                          t(`system.angleTypes.${angleZero.type === '0' ? 'internal' : 'external'}`)
                        "
                        :name="angleZero.type"
                        :key="angleZero.type"
                        v-for="(angleZero, index) in systemMaintenance.ptz.angleZero"
                      >
                        <el-form
                          class="custom-label-size"
                          :rules="systemPtzAngleZeroRules"
                          :model="angleZero"
                          label-width="80px"
                          ref="systemYtAngleZeroRef"
                        >
                          <el-form-item :label="t('system.azimuth')" prop="angleYaw">
                            <el-input
                              placeholder="[0,360]"
                              type="number"
                              v-model="angleZero.angleYaw"
                            />
                          </el-form-item>
                          <el-form-item :label="t('system.pitch')" prop="anglePitch">
                            <el-input
                              placeholder="[0,360]"
                              type="number"
                              v-model="angleZero.anglePitch"
                            />
                          </el-form-item>
                          <el-form-item :label="t('system.roll')" prop="angleRoll">
                            <el-input
                              placeholder="[0,360]"
                              type="number"
                              v-model="angleZero.angleRoll"
                            />
                          </el-form-item>
                          <el-form-item>
                            <div
                              :style="{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%'
                              }"
                            >
                              <el-button
                                :loading="loading.ytZeroAutoBtnLoding"
                                type="primary"
                                @click="confirmAutoAngleZero"
                                >{{ t('system.autoZero') }}
                              </el-button>
                              <el-button
                                :loading="loading.ytZeroBtnLoding"
                                type="primary"
                                @click="() => confirmAngleZero(index, angleZero)"
                                >{{ t('system.confirm') }}
                              </el-button>
                            </div>
                          </el-form-item>
                        </el-form>
                      </el-tab-pane>
                    </el-tabs>
                    <el-form
                      class="custom-label-size"
                      :rules="systemPtzInstallZeroRules"
                      :model="systemMaintenance.ptz.installZero"
                      label-width="80px"
                      ref="systemYtInstallRef"
                    >
                      <FormTitle :title="t('system.installationError')"></FormTitle>
                      <el-form-item :label="t('system.azimuth')" prop="installYaw">
                        <el-input
                          placeholder="[-5,5]"
                          type="number"
                          v-model="systemMaintenance.ptz.installZero.installYaw"
                        />
                      </el-form-item>
                      <el-form-item :label="t('system.pitch')" prop="installPitch">
                        <el-input
                          placeholder="[-5,5]"
                          type="number"
                          v-model="systemMaintenance.ptz.installZero.installPitch"
                        />
                      </el-form-item>
                      <el-form-item :label="t('system.roll')" prop="installRoll">
                        <el-input
                          placeholder="[-5,5]"
                          type="number"
                          v-model="systemMaintenance.ptz.installZero.installRoll"
                        />
                      </el-form-item>
                      <el-button
                        :loading="loading.ytInstallBtnLoding"
                        class="save-button"
                        type="primary"
                        @click="confirmInstall"
                        >{{ t('system.confirm') }}
                      </el-button>
                    </el-form>
                  </div>
                  <div>
                    <FormTitle :title="t('system.servoParams')"></FormTitle>
                    <el-tabs v-model="ptzActiveName">
                      <el-tab-pane :label="t('system.yaw')" name="yaw">
                        <el-form
                          class="custom-label-size"
                          :rules="systemYtYawRules"
                          :model="systemMaintenance.ptz"
                          label-width="80px"
                          ref="systemYtYawRef"
                        >
                          <el-form-item :label="`${t('system.yaw')}${t('system.kp')}`" prop="yawKp">
                            <el-input
                              placeholder="[0,500]"
                              type="number"
                              v-model="systemMaintenance.ptz.yawKp"
                            />
                          </el-form-item>
                          <el-form-item :label="`${t('system.yaw')}${t('system.ki')}`" prop="yawKi">
                            <el-input
                              placeholder="[0,50000]"
                              type="number"
                              v-model="systemMaintenance.ptz.yawKi"
                            />
                          </el-form-item>
                          <el-form-item :label="`${t('system.yaw')}${t('system.fp')}`" prop="yawFp">
                            <el-input
                              placeholder="[0,1000]"
                              type="number"
                              v-model="systemMaintenance.ptz.yawFp"
                            />
                          </el-form-item>
                          <el-button
                            :loading="loading.ptzServoBtnLoding"
                            class="save-button"
                            type="primary"
                            @click="confirmServoParams('yaw')"
                            >{{ t('system.confirm') }}
                          </el-button>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane :label="t('system.pitch')" name="pitch">
                        <el-form
                          class="custom-label-size"
                          :rules="systemYtPitchRules"
                          :model="systemMaintenance.ptz"
                          label-width="80px"
                          ref="systemYtPitchRef"
                        >
                          <el-form-item
                            :label="`${t('system.pitch')}${t('system.kp')}`"
                            prop="pitchKp"
                          >
                            <el-input
                              placeholder="[0,500]"
                              type="number"
                              v-model="systemMaintenance.ptz.pitchKp"
                            />
                          </el-form-item>
                          <el-form-item
                            :label="`${t('system.pitch')}${t('system.ki')}`"
                            prop="pitchKi"
                          >
                            <el-input
                              placeholder="[0,50000]"
                              type="number"
                              v-model="systemMaintenance.ptz.pitchKi"
                            />
                          </el-form-item>
                          <el-form-item
                            :label="`${t('system.pitch')}${t('system.fp')}`"
                            prop="pitchFp"
                          >
                            <el-input
                              placeholder="[0,1000]"
                              type="number"
                              v-model="systemMaintenance.ptz.pitchFp"
                            />
                          </el-form-item>
                          <el-button
                            :loading="loading.ptzServoBtnLoding"
                            class="save-button"
                            type="primary"
                            @click="confirmServoParams('pitch')"
                            >{{ t('system.confirm') }}
                          </el-button>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane :label="t('system.roll')" name="roll">
                        <el-form
                          class="custom-label-size"
                          :rules="systemYtRollRules"
                          :model="systemMaintenance.ptz"
                          label-width="80px"
                          ref="systemYtRollRef"
                        >
                          <el-form-item
                            placeholder="[0,500]"
                            type="number"
                            :label="`${t('system.roll')}${t('system.kp')}`"
                            prop="rollKp"
                          >
                            <el-input v-model="systemMaintenance.ptz.rollKp" />
                          </el-form-item>
                          <el-form-item
                            placeholder="[0,50000]"
                            type="number"
                            :label="`${t('system.roll')}${t('system.ki')}`"
                            prop="rollKi"
                          >
                            <el-input v-model="systemMaintenance.ptz.rollKi" />
                          </el-form-item>
                          <el-form-item
                            :label="`${t('system.roll')}${t('system.fp')}`"
                            prop="rollFp"
                          >
                            <el-input
                              placeholder="[0,1000]"
                              type="number"
                              v-model="systemMaintenance.ptz.rollFp"
                            />
                          </el-form-item>
                          <el-button
                            :loading="loading.ptzServoBtnLoding"
                            class="save-button"
                            type="primary"
                            @click="confirmServoParams('roll')"
                            >{{ t('system.confirm') }}
                          </el-button>
                        </el-form>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <div>
                  <FormTitle :title="t('system.gyroCompensation')"></FormTitle>
                  <el-form
                    class="custom-label-size"
                    :rules="systemGyroscopeRules"
                    :model="systemMaintenance.ptz"
                    label-width="80px"
                    ref="systemGyroscopeRef"
                  >
                    <el-form-item label="Xa" prop="xa">
                      <el-input type="number" v-model="systemMaintenance.ptz.xa" />
                    </el-form-item>
                    <el-form-item label="Xb" prop="xb">
                      <el-input type="number" v-model="systemMaintenance.ptz.xb" />
                    </el-form-item>
                    <el-form-item label="Ya" prop="ya">
                      <el-input type="number" v-model="systemMaintenance.ptz.ya" />
                    </el-form-item>
                    <el-form-item label="Yb" prop="yb">
                      <el-input type="number" v-model="systemMaintenance.ptz.yb" />
                    </el-form-item>
                    <el-form-item label="Za" prop="za">
                      <el-input type="number" v-model="systemMaintenance.ptz.za" />
                    </el-form-item>
                    <el-form-item label="Zb" prop="zb">
                      <el-input type="number" v-model="systemMaintenance.ptz.zb" />
                    </el-form-item>
                    <el-form-item>
                      <div :style="{ display: 'flex', justifyContent: 'flex-end', width: '100%' }">
                        <el-button
                          :loading="loading.gyroscopeAutoBtnLoding"
                          type="primary"
                          @click="confirmAutoGyro"
                        >
                          {{ t('system.autoCompensation') }}
                        </el-button>
                        <el-button
                          :loading="loading.gyroscopeBtnLoding"
                          type="primary"
                          @click="confirmGyro"
                        >
                          {{ t('system.confirm') }}
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                  <FormTitle :title="t('system.motorZero')"></FormTitle>
                  <el-form
                    class="custom-label-size"
                    :rules="systemMoterRule"
                    :model="systemMaintenance.ptz"
                    label-width="110px"
                    ref="systemMoterZero"
                  >
                    <el-tabs v-model="ptzMoterActiveName">
                      <el-tab-pane :label="t('system.motorTypes.yaw')" name="0">
                        <el-form-item :label="t('system.zeroPosition')" prop="moterYawZero">
                          <el-input
                            v-model="systemMaintenance.ptz.moterYawZero"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </el-tab-pane>

                      <el-tab-pane :label="t('system.motorTypes.pitch')" name="1">
                        <el-form-item :label="t('system.zeroPosition')" prop="moterPitchZero">
                          <el-input
                            v-model="systemMaintenance.ptz.moterPitchZero"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </el-tab-pane>

                      <el-tab-pane :label="t('system.motorTypes.roll')" name="4">
                        <el-form-item :label="t('system.zeroPosition')" prop="moterRollZero">
                          <el-input
                            v-model="systemMaintenance.ptz.moterRollZero"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </el-tab-pane>
                      <el-tab-pane :label="t('system.motorTypes.externalYaw')" name="2">
                        <el-form-item :label="t('system.zeroPosition')" prop="moterOutYawZero">
                          <el-input
                            v-model="systemMaintenance.ptz.moterOutYawZero"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </el-tab-pane>
                      <el-tab-pane :label="t('system.motorTypes.externalPitch')" name="3">
                        <el-form-item :label="t('system.zeroPosition')" prop="moterOutPitchZero">
                          <el-input
                            v-model="systemMaintenance.ptz.moterOutPitchZero"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </el-tab-pane>
                    </el-tabs>
                    <div :style="{ display: 'flex', justifyContent: 'flex-end', width: '100%' }">
                      <el-button
                        @click="confirmSystemMoterBtn(2)"
                        type="primary"
                        :loading="loading.systemMoterBtnLoading"
                        >{{ t('system.stopZero') }}</el-button
                      >
                      <el-button
                        @click="confirmSystemMoterBtn(0)"
                        type="primary"
                        :loading="loading.systemMoterBtnLoading"
                        >{{ t('system.autoZero') }}</el-button
                      >

                      <el-button
                        @click="confirmSystemMoterBtn(1)"
                        type="primary"
                        :loading="loading.systemMoterBtnLoading"
                        >{{ t('system.confirmZero') }}</el-button
                      >
                    </div>
                  </el-form>
                </div>
              </div>
              <div class="export-btn-box">
                <el-button
                  @click="systemParam(0)"
                  type="primary"
                  :loading="loading.systemParamBtnLoading"
                  >{{ t('system.paramOperations.get') }}</el-button
                >
                <el-button
                  @click="systemParam(1)"
                  type="primary"
                  :loading="loading.systemParamBtnLoading"
                  >{{ t('system.paramOperations.save') }}</el-button
                >
                <el-button
                  @click="exportToFile"
                  type="primary"
                  :loading="loading.systemExportBtnLoading"
                  >{{ t('system.paramOperations.export') }}</el-button
                >
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <el-dialog v-model="showMaintenanceLogin" width="30%" :show-close="false" style="width: 360px">
      <template #header>
        <el-text>{{ t('system.login.title') }}</el-text
        ><br />
      </template>
      <el-form
        class="custom-label-size"
        :model="loginForm"
        label-position="left"
        ref="loginFormRef"
        :rules="loginFormRules"
      >
        <el-form-item :label="t('system.login.account')" label-width="70px" prop="account">
          <el-input v-model.trim="loginForm.account" @keyup.enter="confirmLogin" />
        </el-form-item>
        <el-form-item :label="t('system.login.password')" label-width="70px" prop="password">
          <el-input v-model="loginForm.password" @keyup.enter="confirmLogin" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showMaintenanceLogin = false">{{
            t('system.login.cancel')
          }}</el-button>
          <el-button type="primary" @click="confirmLogin" :loading="loading.systemLoginBtnLoading">
            {{ t('system.login.confirm') }}
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
import useFormValidation from '@/common/forms/formValidator'
import apis from '@/common/apis'
import { useAppConfig } from '@/store/AppStore'
import { useI18n } from 'vue-i18n'
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
  SystemYtRoll,
  SystemMoter
} from '@/common/apis/modelTypes'
import type { StartWith } from '@/common/type'
const forms = useFormValidation()
const { t } = useI18n()

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
const upProgress = ref(0) //上传进度
const showMaintenanceLogin = ref(false)
const showMaintenanceForm = ref(false)
const showUploadProgress = ref(false)
const loginForm = ref<LoginFormType>({} as LoginFormType)
const userCommConfigRef = ref()
const storageRef = ref()
const loginFormRef = ref()
const fileList = ref([])
const upgradeBtnDisabled = ref(true)
const upgradeUrl = useAppConfig().config.upgradeSystemFileUrl
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
  ytZeroAutoBtnLoding: false,
  ytInstallBtnLoding: false,
  ptzServoBtnLoding: false,
  gyroscopeBtnLoding: false,
  gyroscopeAutoBtnLoding: false,
  systemMoterBtnLoading: false,
  systemParamBtnLoading: false,
  systemExportBtnLoading: false
})
const ptzActiveName = ref('yaw') // 云台配置菜单控制
const zeroActiveName = ref('0') // 云台配置菜单控制
const ptzMoterActiveName = ref<'0' | '1' | '2' | '3' | '4'>('0') // 电机
const userCommConfigRules = reactive<FormRules<UserCommunicationForm>>({
  'udp.udpLocalPort': [
    { validator: forms.checkNumber(0, 65535, t('userCommunication.localPort')), trigger: 'blur' }
  ],
  'udp.udpDstIp': [
    { validator: forms.checkIp(t('userCommunication.destinationAddress')), trigger: 'blur' }
  ],
  'udp.udpDstPort': [
    {
      validator: forms.checkNumber(0, 65535, t('userCommunication.destinationPort')),
      trigger: 'blur'
    }
  ],
  'uart.baudrate': [
    { validator: forms.checkNumber(0, 1000000, t('userCommunication.baudRate')), trigger: 'blur' }
  ],
  'uart.dataBit': [
    { validator: forms.checkNumber(0, 10, t('userCommunication.dataBits')), trigger: 'blur' }
  ],
  'uart.stopBit': [
    { validator: forms.checkNumber(0, 10, t('userCommunication.stopBits')), trigger: 'blur' }
  ],
  'uart.parityBit': [
    { validator: forms.checkNumber(0, 10, t('userCommunication.parity')), trigger: 'blur' }
  ]
})
const storageRules = reactive<FormRules<StorageForm>>({
  recordType: [{ validator: forms.checkSelect(t('storage.format')), trigger: 'change' }],
  recordMode: [{ validator: forms.checkSelect(t('storage.mode')), trigger: 'change' }],
  recordDuration: [{ validator: forms.checkSelect(t('storage.duration')), trigger: 'change' }]
})
const loginFormRules = reactive<FormRules<LoginFormType>>({
  account: [{ validator: forms.checkString(t('system.login.account')), trigger: 'blur' }],
  password: [{ validator: forms.checkString(t('system.login.password')), trigger: 'blur' }]
})

const systemProductRef = ref()
const systemProductConfigRef = ref()
const systemYtAngleZeroRef = ref()
const systemYtInstallRef = ref()
const systemYtYawRef = ref()
const systemYtPitchRef = ref()
const systemYtRollRef = ref()
const systemGyroscopeRef = ref()
const systemMoterZero = ref()
const systemProductRules = reactive<FormRules<SystemProduct>>({
  productNo: [{ validator: forms.checkString(t('system.model')), trigger: 'blur' }],
  productSn: [{ validator: forms.checkString(t('system.serialNumber')), trigger: 'blur' }],
  note: [{ validator: forms.checkString(t('system.notes')), trigger: 'blur' }]
})
const systemProductConfigRules = reactive<FormRules<SystemProductConfig>>({
  tv1: [{ validator: forms.checkString(t('system.tv1Model')), trigger: 'blur' }],
  tv2: [{ validator: forms.checkString(t('system.tv2Model')), trigger: 'blur' }],
  ir1: [{ validator: forms.checkString(t('system.ir1Model')), trigger: 'blur' }],
  ir2: [{ validator: forms.checkString(t('system.ir2Model')), trigger: 'blur' }],
  la: [{ validator: forms.checkString(t('system.laModel')), trigger: 'blur' }],
  userProtocol: [{ validator: forms.checkString(t('system.userProtocol')), trigger: 'blur' }]
})
const systemPtzAngleZeroRules = reactive<FormRules<SystemPtzAngleZero>>({
  angleYaw: [{ validator: forms.checkNumber(0, 300, t('system.azimuth'), false), trigger: 'blur' }],
  anglePitch: [{ validator: forms.checkNumber(0, 300, t('system.pitch'), false), trigger: 'blur' }],
  angleRoll: [{ validator: forms.checkNumber(0, 300, t('system.roll'), false), trigger: 'blur' }],
  type: [{ validator: forms.checkSelect(t('system.angleTypes.mode')), trigger: 'change' }]
})
const systemPtzInstallZeroRules = reactive<FormRules<SystemPtzInstallZero>>({
  installYaw: [
    { validator: forms.checkNumber(-5, 5, t('system.azimuth'), false), trigger: 'blur' }
  ],
  installPitch: [
    { validator: forms.checkNumber(-5, 5, t('system.pitch'), false), trigger: 'blur' }
  ],
  installRoll: [{ validator: forms.checkNumber(-5, 5, t('system.roll'), false), trigger: 'blur' }]
})
const systemYtYawRules = reactive<FormRules<SystemYtYaw>>({
  yawKp: [
    {
      validator: forms.checkNumber(0, 500, `${t('system.yaw')}${t('system.kp')}`, false),
      trigger: 'blur'
    }
  ],
  yawKi: [
    {
      validator: forms.checkNumber(0, 50000, `${t('system.yaw')}${t('system.ki')}`, false),
      trigger: 'blur'
    }
  ],
  yawFp: [
    {
      validator: forms.checkNumber(0, 1000, `${t('system.yaw')}${t('system.fp')}`, false),
      trigger: 'blur'
    }
  ]
})
const systemYtPitchRules = reactive<FormRules<SystemYtPitch>>({
  pitchKp: [
    {
      validator: forms.checkNumber(0, 500, `${t('system.pitch')}${t('system.kp')}`, false),
      trigger: 'blur'
    }
  ],
  pitchKi: [
    {
      validator: forms.checkNumber(0, 50000, `${t('system.pitch')}${t('system.ki')}`, false),
      trigger: 'blur'
    }
  ],
  pitchFp: [
    {
      validator: forms.checkNumber(0, 1000, `${t('system.pitch')}${t('system.fp')}`, false),
      trigger: 'blur'
    }
  ]
})
const systemYtRollRules = reactive<FormRules<SystemYtRoll>>({
  rollKp: [
    {
      validator: forms.checkNumber(0, 500, `${t('system.roll')}${t('system.kp')}`, false),
      trigger: 'blur'
    }
  ],
  rollKi: [
    {
      validator: forms.checkNumber(0, 50000, `${t('system.roll')}${t('system.ki')}`, false),
      trigger: 'blur'
    }
  ],
  rollFp: [
    {
      validator: forms.checkNumber(0, 1000, `${t('system.roll')}${t('system.fp')}`, false),
      trigger: 'blur'
    }
  ]
})
const systemGyroscopeRules = reactive<FormRules<SystemGyroscope>>({
  xa: [{ validator: forms.checkString('Xa'), trigger: 'blur' }],
  xb: [{ validator: forms.checkString('Xb'), trigger: 'blur' }],
  ya: [{ validator: forms.checkString('Ya'), trigger: 'blur' }],
  yb: [{ validator: forms.checkString('Yb'), trigger: 'blur' }],
  za: [{ validator: forms.checkString('Za'), trigger: 'blur' }],
  zb: [{ validator: forms.checkString('Zb'), trigger: 'blur' }]
})

const systemMoterRule = reactive<FormRules<SystemMoter>>({
  moterYawZero: [
    { validator: forms.checkNumber(-180, 180, t('system.zeroPosition'), false), trigger: 'blur' }
  ],
  moterPitchZero: [
    { validator: forms.checkNumber(-180, 180, t('system.zeroPosition'), false), trigger: 'blur' }
  ],
  moterOutYawZero: [
    { validator: forms.checkNumber(-180, 180, t('system.zeroPosition'), false), trigger: 'blur' }
  ],
  moterOutPitchZero: [
    { validator: forms.checkNumber(-180, 180, t('system.zeroPosition'), false), trigger: 'blur' }
  ],
  moterRollZero: [
    { validator: forms.checkNumber(-180, 180, t('system.zeroPosition'), false), trigger: 'blur' }
  ]
})

watch(fileList, (newValue) => {
  upgradeBtnDisabled.value = newValue == null || newValue.length == 0
  upProgress.value = 0
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
    .then((res) => util.resultHandler(res, t('system.resetFailed')))
    .finally(() => (loading.value.resetSystemBtnLoading = false))
}

const restartSystem = () => {
  loading.value.restartBtnLoding = true
  apis
    .systemSetting(1)
    .then((res) => util.resultHandler(res, t('system.restartFailed')))
    .finally(() => (loading.value.restartBtnLoding = false))
}

let uploadProgressTimer: number | null = null
const onUploadError = (error: Error) => {
  console.error(error)
  util.showMessage(t('system.uploadFailed'), 'error')
  fileList.value = []
  if (uploadProgressTimer) {
    clearTimeout(uploadProgressTimer)
  }
}

const onUploadSuccess = () => {
  util.showMessage(t('system.uploadSuccess'))
  getSystemInfo()
}

const handleRemove: UploadProps['onRemove'] = () => {
  upload.value!.clearFiles()
  showUploadProgress.value = false
}

const handleChange = () => {}

const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upProgress.value = 0
  showUploadProgress.value = true
  upload.value!.submit()
  const getProgress = () => {
    const timer = setTimeout(() => {
      apis.getUpProgress().then((res) => {
        if (!showUploadProgress.value) {
          clearTimeout(timer)
          return
        }
        const progress = res.upProgress
        upProgress.value = progress
        if (progress < 100) {
          getProgress()
        } else {
          onUploadSuccess()
        }
      })
    }, 200)
    uploadProgressTimer = timer
  }
  getProgress()
}

const confirmFormat = () => {
  loading.value.formatBtnLoading = true
  apis
    .formatDisk()
    .then((res) => util.resultHandler(res, t('storage.formatFailed')))
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
        .then((res) => util.resultHandler(res, t('userCommunication.submitFailed')))
        .finally(() => {
          loading.value.submitUserCommunicationBtnLoding = false
        })
    } else {
      util.showMessage(t('validation.formInvalid'), 'error')
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
        .then((res) => util.resultHandler(res, t('storage.submitFailed')))
        .finally(() => (loading.value.submitStorageInfoBtnLoading = false))
    } else {
      util.showMessage(t('validation.formInvalid'), 'error')
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
          util.resultHandler(res, t('system.login.authFailed'), () => {
            util.showMessage(t('system.login.authSuccess'))
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
      .then((res) => util.resultHandler(res, t('system.productSubmitFailed')))
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
      .then((res) => util.resultHandler(res, t('system.configSubmitFailed')))
      .finally(() => (loading.value.productConfigBtnLoding = false))
  })
}

const confirmAutoAngleZero = () => {
  loading.value.ytZeroAutoBtnLoding = true
  apis
    .submitSplitSystemMaintenanceForm('angle_zero', {
      angleZero: { type: '2' }
    })
    .then((res) => util.resultHandler(res, t('system.autoZeroFailed')))
    .finally(() => (loading.value.ytZeroAutoBtnLoding = false))
}

const confirmAngleZero = (index: number, param: SystemPtzAngleZero) => {
  if (!systemYtAngleZeroRef.value) {
    return
  }
  forms.validateForm(systemYtAngleZeroRef.value[index] as FormInstance, () => {
    loading.value.ytZeroBtnLoding = true
    apis
      .submitSplitSystemMaintenanceForm('angle_zero', {
        angleZero: param
      })
      .then((res) => util.resultHandler(res, t('system.angleZeroSubmitFailed')))
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
      .then((res) => util.resultHandler(res, t('system.installErrorSubmitFailed')))
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
      .then((res) => util.resultHandler(res, t('system.servoSubmitFailed')))
      .finally(() => (loading.value.ptzServoBtnLoding = false))
  })
}

const confirmSystemMoterBtn = (type: 0 | 1 | 2) => {
  loading.value.systemMoterBtnLoading = true
  const active = ptzMoterActiveName.value
  const activePropMap = {
    '0': 'moterYawZero',
    '1': 'moterPitchZero',
    '2': 'moterOutYawZero',
    '3': 'moterOutPitchZero',
    '4': 'moterRollZero'
  }
  const prop = activePropMap[active] as keyof SystemMoter
  apis
    .submitSplitSystemMaintenanceForm('ext', {
      ext: { op: type, type: active, para: systemMaintenance.value.ptz[prop] }
    })
    .then((res) => util.resultHandler(res, t('system.operationFailed')))
    .finally(() => (loading.value.systemMoterBtnLoading = false))
}

const confirmAutoGyro = () => {
  loading.value.gyroscopeAutoBtnLoding = true
  apis
    .submitSplitSystemMaintenanceForm('gyro_compensation', {
      para: { mode: 0 }
    })
    .then((res) => util.resultHandler(res, t('system.autoCompensationFailed')))
    .finally(() => (loading.value.gyroscopeAutoBtnLoding = false))
}

const confirmGyro = () => {
  if (!systemGyroscopeRef.value) {
    return
  }
  forms.validateForm(systemGyroscopeRef.value as FormInstance, () => {
    loading.value.gyroscopeBtnLoding = true
    type keyType = keyof typeof systemMaintenance.value.ptz
    const params = Object.keys(systemMaintenance.value.ptz)
      .filter((k) => /^[xyz][ab]$/.test(k))
      .reduce((p, c) => {
        const v = systemMaintenance.value.ptz[c as keyType]
        p[c as keyType] = v
        return p
      }, {} as any)
    params.mode = 1
    apis
      .submitSplitSystemMaintenanceForm('gyro_compensation', {
        para: params
      })
      .then((res) => util.resultHandler(res, t('system.gyroSubmitFailed')))
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
    .then((res) => {
      systemMaintenance.value = res
      const angleZeros = systemMaintenance.value.ptz.angleZero
      if (angleZeros) {
        for (const obj of angleZeros) {
          obj.type = String(obj.type)
        }
      }
    })
    .finally(() => (loading.value.systemMaintenanceLoading = false))
}

const systemParam = (type: 0 | 1) => {
  loading.value.systemParamBtnLoading = true
  apis.systemParam(type).finally(() => (loading.value.systemParamBtnLoading = false))
}

const exportToFile = () => {
  loading.value.systemExportBtnLoading = true
  try {
    const form = systemMaintenance.value
    const innerInfo = (form.ptz.angleZero.filter((o) => o.type === '0') || [{}])[0]
    const outerInfo = (form.ptz.angleZero.filter((o) => o.type === '1') || [{}])[0]

    const content = `${t('system.model')}：${form.product.productNo}
${t('system.serialNumber')}：${form.product.productSn}
${t('system.azimuth')}${t('system.angleZero')}-${t('system.angleTypes.internal')}：${innerInfo.angleYaw}
${t('system.pitch')}${t('system.angleZero')}-${t('system.angleTypes.internal')}：${innerInfo.anglePitch}
${t('system.roll')}${t('system.angleZero')}-${t('system.angleTypes.internal')}：${innerInfo.angleRoll}
${t('system.azimuth')}${t('system.angleZero')}-${t('system.angleTypes.external')}：${outerInfo.angleYaw}
${t('system.pitch')}${t('system.angleZero')}-${t('system.angleTypes.external')}：${outerInfo.anglePitch}
${t('system.roll')}${t('system.angleZero')}-${t('system.angleTypes.external')}：${outerInfo.angleRoll}
${t('system.azimuth')}${t('system.installationError')}：${form.ptz.installZero.installYaw}
${t('system.pitch')}${t('system.installationError')}：${form.ptz.installZero.installPitch}
${t('system.roll')}${t('system.installationError')}：${form.ptz.installZero.installRoll}
${t('system.gyroCompensation')}xa：${form.ptz.xa}
${t('system.gyroCompensation')}xb：${form.ptz.xb}
${t('system.gyroCompensation')}ya：${form.ptz.ya}
${t('system.gyroCompensation')}yb：${form.ptz.yb}
${t('system.gyroCompensation')}za：${form.ptz.za}
${t('system.gyroCompensation')}zb：${form.ptz.zb}
${t('system.yaw')}${t('system.kp')}：${form.ptz.yawKp}
${t('system.yaw')}${t('system.ki')}：${form.ptz.yawKi}
${t('system.yaw')}${t('system.fp')}：${form.ptz.yawFp}
${t('system.pitch')}${t('system.kp')}：${form.ptz.pitchKp}
${t('system.pitch')}${t('system.ki')}：${form.ptz.pitchKi}
${t('system.pitch')}${t('system.fp')}：${form.ptz.pitchFp}
${t('system.roll')}${t('system.kp')}：${form.ptz.rollKp}
${t('system.roll')}${t('system.ki')}：${form.ptz.rollKi}
${t('system.roll')}${t('system.fp')}：${form.ptz.rollFp}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const now = new Date()
    link.download = `${form.product.productNo}_${form.product.productSn}_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } finally {
    loading.value.systemExportBtnLoading = false
  }
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
  display: none;
}
:deep(.el-upload-list__item-file-name) {
  white-space: break-spaces;
}
.system-info-box {
  display: flex;
}
.system-info-wrap {
  display: flex;
  flex-direction: column;
  margin: 0 21px;
}
.upload .el-progress--line {
  width: 100%;
}
.export-btn-box {
  display: flex;
  justify-content: flex-end;
}
</style>
