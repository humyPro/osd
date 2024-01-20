<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box single-forms">
        <div class="form-box bordered" style="width: 300px">
          <FormTitle title="有线网络参数"></FormTitle>
          <el-form
            :inline="true"
            :model="formInline"
            class="inline-form"
            label-position="left"
            label-width="100px"
          >
            <el-form-item label="IP地址" class="custom-select">
              <el-input />
            </el-form-item>
            <el-form-item label="子网掩码" class="custom-select">
              <el-input />
            </el-form-item>
            <el-form-item label="默认网关" class="custom-select">
              <el-input />
            </el-form-item>
            <el-form-item label="DNS1" class="custom-select">
              <el-input />
            </el-form-item>
            <el-form-item label="DHCP" label-width="120px">
              <el-switch v-model="active" />
            </el-form-item>
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
