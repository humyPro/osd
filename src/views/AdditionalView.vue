<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered">
          <FormTitle title="GB2812设置"></FormTitle>
          <el-form
            :inline="true"
            :model="formInline"
            class="inline-form"
            label-position="left"
            label-width="110px"
          >
            <div>
              <el-form-item label="GB28181" label-width="120px">
                <el-switch v-model="active" />
              </el-form-item>
            </div>
            <el-form-item label="音频" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="OFF" value="OFF" />
                <el-option label="ON" value="ON" />
              </el-select>
            </el-form-item>
            <el-form-item label="SIP服务器地址">
              <el-input />
            </el-form-item>
            <el-form-item label="SIP服务器端口">
              <el-input />
            </el-form-item>
            <el-form-item label="SIP服务器ID">
              <el-input />
            </el-form-item>

            <el-form-item label="注册有效期">
              <el-input />
            </el-form-item>
            <el-form-item label="心跳周期">
              <el-input />
            </el-form-item>
            <el-form-item label="本地SIP端口">
              <el-input />
            </el-form-item>
            <el-form-item label="SIP认证ID">
              <el-input />
            </el-form-item>
            <el-form-item label="SIP认证密码">
              <el-input />
            </el-form-item>
            <el-form-item class="form-right-button">
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <FormTitle title="OSD设置"></FormTitle>
          <el-form
            :inline="true"
            :model="formInline"
            class="inline-form"
            label-position="left"
            label-width="110px"
          >
            <div>
              <el-form-item label="LOGO上传">
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
                    上传
                  </el-button>
                </el-upload>
              </el-form-item>
            </div>
            <el-form-item label="LOGO提示">
              <el-text>logo1.bmp</el-text>
            </el-form-item>
            <div>
              <el-form-item label="LOGO开关">
                <el-switch v-model="active" />
              </el-form-item>
            </div>
            <el-form-item label="LOGO X坐标">
              <el-input />
            </el-form-item>
            <el-form-item label="LOGO Y坐标">
              <el-input />
            </el-form-item>
            <el-form-item label="LOGO 透明度">
              <el-input placeholder="0-255" />
            </el-form-item>
            <el-form-item label="字体 X坐标">
              <el-input />
            </el-form-item>
            <el-form-item label="字体 Y坐标">
              <el-input />
            </el-form-item>
            <el-form-item label="字体大小">
              <el-input placeholder="8-72" />
            </el-form-item>
            <el-form-item label="字体 透明度">
              <el-input placeholder="0-255" />
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="color" />
            </el-form-item>
            <el-form-item label="文本">
              <el-input />
            </el-form-item>
            <div>
              <el-form-item label="字幕滚动">
                <el-switch v-model="active" />
              </el-form-item>
            </div>
            <el-form-item label="步进速度" class="custom-select" style="width: 302px">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="1" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="滚动方向" class="custom-select" style="width: 302px">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="左" value="左" />
              </el-select>
            </el-form-item>
            <el-form-item label="步进速度">
              <el-input placeholder="5-200" />
            </el-form-item>
            <el-form-item class="form-right-button">
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered"></div>
        <div class="form-box bordered"></div>
        <div class="form-box bordered"></div>
        <div class="form-box bordered"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()
const formInline = ref({
  region: ''
})

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

const color = ref('#409EFF')
</script>
<style scoped>
.forms-box {
  flex-wrap: wrap;
  flex-direction: row;
}
.form-box {
  width: 300px;
}
</style>
