<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div
          class="form-box bordered"
          v-for="(rtmpConfig, index) in rtmpConfigs"
          :key="index.toString()"
        >
          <FormTitle title="编码通道1"></FormTitle>
          <el-form :model="formInline" label-position="left">
            <div>
              <el-form-item label="RTMP 推流地址">
                <el-switch v-model="active" />
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <el-input></el-input>
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
      rtmpConfigs: [{}, {}],
      formInline: {},
      active: true
    }
  }
}
</script>
<style></style>
