<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div class="form-box bordered">
          <FormTitle title="采集编码"></FormTitle>
          <el-form
            :inline="true"
            :model="formInline"
            class="inline-form"
            label-position="left"
            label-width="100px"
          >
            <el-form-item label="音频选择" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="HDMI" value="HDMI" />
              </el-select>
            </el-form-item>

            <el-form-item class="form-right-button">
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form
            :inline="true"
            :model="formInline"
            class="inline-form"
            label-position="left"
            label-width="100px"
          >
            <div>
              <el-form-item label="HDMI输出" class="dot-left" :style="{ width: '600px' }">
                <el-switch v-model="active" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="输出分辨率" class="custom-select">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option label="1080P24" value="1080P24" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="音频输出" class="custom-select">
                <el-select v-model="formInline.switch" placeholder="">
                  <el-option label="关闭" value="关闭" />
                  <el-option label="开启" value="开启" />
                </el-select>
              </el-form-item>
            </div>
            <el-form-item class="form-right-button">
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      sourceConfigs: {},
      formInline: {},
      active: true
    }
  }
}
</script>
<style></style>
