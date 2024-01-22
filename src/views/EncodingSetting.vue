<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content encoding-forms">
      <div class="forms-box" v-for="(ndlConfig, index) in encodingConfigs" :key="index.toString()">
        <div class="form-box bordered">
          <el-form :model="formInline" label-position="left">
            <el-form-item label="HTTP1" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="HTTP端口">
              <el-input placeholder="1-65535，重启生效" />
            </el-form-item>
            <el-form-item label="流名称">
              <el-input placeholder="格式：/stream1，重启生效" />
            </el-form-item>
            <el-form-item label="UDP单播1" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="IP">
              <el-input placeholder="单播IP" />
            </el-form-item>
            <el-form-item label="端口">
              <el-input placeholder="1-65535" />
            </el-form-item>
            <el-form-item label="UDP组播1" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="IP">
              <el-input placeholder="组播IP" />
            </el-form-item>
            <el-form-item label="端口">
              <el-input placeholder="1-65535" />
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form :model="formInline" label-position="left">
            <el-form-item label="RTR1" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="流名称">
              <el-input placeholder="格式：/stream1" />
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form :model="formInline" label-position="left">
            <el-form-item label="RTSP1" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="端口">
              <el-input placeholder="1-65535" />
            </el-form-item>
            <el-form-item label="传输模式" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="UDP" value="UDP" />
                <el-option label="TCP" value="TCP" />
              </el-select>
            </el-form-item>
            <el-form-item label="G.711" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="禁用" value="禁用" />
                <el-option label="启用" value="启用" />
              </el-select>
            </el-form-item>
            <el-form-item label="流名称">
              <el-input placeholder="格式：/stream1" />
            </el-form-item>
            <el-form-item label="RTSP模式" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="音频加视频" value="音频加视频" />
                <el-option label="纯音频" value="纯音频" />
                <el-option label="纯视频" value="纯视频" />
              </el-select>
            </el-form-item>
            <el-form-item label="RTSP认证" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input placeholder="字母和数字" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input placeholder="字母和数字" />
            </el-form-item>
            <el-form-item label="RTSP用户数" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form :model="formInline" label-position="left">
            <el-form-item label="SRT1" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="SRT模式" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="Listener" value="Listener" />
              </el-select>
            </el-form-item>
            <el-form-item label="加密" class="custom-select">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="禁用" value="禁用" />
                <el-option label="启用" value="启用" />
              </el-select>
            </el-form-item>
            <el-form-item label="密码">
              <el-input placeholder="长度建议:10-16" />
            </el-form-item>
            <el-form-item label="监听端口">
              <el-input placeholder="1-65535" />
            </el-form-item>
            <el-form-item label="Caller服务器">
              <el-input />
            </el-form-item>
            <el-form-item label="Caller端口">
              <el-input />
            </el-form-item>
            <el-form-item label="Latency">
              <el-input placeholder="单位:毫秒(ms)" />
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form :model="formInline" label-position="left">
            <el-form-item label="HSL" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="流名称">
              <el-input placeholder="hd-live" />
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box bordered">
          <el-form :model="formInline" label-position="left">
            <el-form-item label="ONVIF认证" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input />
            </el-form-item>
            <el-form-item label="密码">
              <el-input />
            </el-form-item>
          </el-form>
        </div>
        <div class="form-box fixed-button">
          <el-button type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      formInline: {
        region: ''
      },
      active: false,

      encodingConfigs: [
        {
          httpConfig: {},
          ndlConfig: {}
        },
        {
          httpConfig: {},
          ndlConfig: {}
        }
      ]
    }
  }
}
</script>
<style scoped>
.encoding-forms {
  display: flex;
  flex-direction: row;
}
.encoding-forms .forms-box {
  display: flex;
  flex-direction: column;
}
</style>
