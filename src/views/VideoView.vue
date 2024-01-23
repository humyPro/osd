<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered" v-for="video in videos" :key="video.index">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'视频' + video.index + '参数设置'" text-type="primary" />
          </div>
          <el-form :model="formInline" label-position="left" :inline="false">
            <el-form-item label="UDP H26X" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="模式">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="单播" value="单播" />
                <el-option label="组播" value="组播" />
                <el-option label="广播" value="广播" />
              </el-select>
            </el-form-item>
            <el-form-item label="本机端口">
              <el-input />
            </el-form-item>
            <el-form-item label="目的IP">
              <el-input placeholder="ip" />
            </el-form-item>
            <el-form-item label="目的端口">
              <el-input />
            </el-form-item>
            <el-form-item label="发送长度">
              <el-input />
            </el-form-item>
            <el-form-item label="发送间隔">
              <el-input />
            </el-form-item>
            <el-divider />
            <el-form-item label="UDP TS" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="模式">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="单播" value="单播" />
                <el-option label="组播" value="组播" />
                <el-option label="广播" value="广播" />
              </el-select>
            </el-form-item>
            <el-form-item label="本机端口">
              <el-input />
            </el-form-item>
            <el-form-item label="目的IP">
              <el-input placeholder="ip" />
            </el-form-item>
            <el-form-item label="目的端口">
              <el-input />
            </el-form-item>
            <el-form-item label="发送长度">
              <el-input />
            </el-form-item>
            <el-form-item label="发送间隔">
              <el-input />
            </el-form-item>
            <el-divider />
            <el-form-item label="RTSP" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="服务端口">
              <el-input />
            </el-form-item>
            <el-form-item label="传输模式">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="UDP" value="UDP" />
                <el-option label="TCP" value="TCP" />
              </el-select>
            </el-form-item>
            <el-form-item label="流名称">
              <el-input placeholder="[格式：/stream0,重启生效]" />
            </el-form-item>
            <el-form-item label="用户数">
              <el-input placeholder="[1~5]" />
            </el-form-item>
            <el-form-item label="保活时间(ms)">
              <el-input placeholder="[毫秒]" />
            </el-form-item>
            <el-divider />
            <el-form-item label="RTMP" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="推流地址">
              <el-input />
            </el-form-item>
            <el-divider />
            <el-form-item label="GB28181" class="dot-left">
              <el-switch v-model="active" />
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
          </el-form>
          <el-button class="fixed-button" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import MenuBar from '@/components/MenuBar.vue'
export default {
  components: {
    MenuBar
  },
  data() {
    return {
      formInline: {
        region: ''
      },
      videos: [
        {
          index: 1
        },
        {
          index: 2
        },
        {
          index: 3
        }
      ],
      QRCode: ''
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
<style scoped>
.forms-box {
  display: flex;
}
.form-box {
  display: flex;
  flex-direction: column;
}
.qrcode-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.qrcode-image .el-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-fill-color-light);
  margin-bottom: 10px;
}
</style>
