<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box" v-for="video in videos" :key="video.index">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'视频' + video.index + '参数设置'" text-type="primary" />
          </div>
          <el-form :model="formInline" label-position="left" :inline="false">
            <el-form-item label="UDP H26X" class="dot-left">
              <el-switch v-model="active" />
            </el-form-item>
            <el-form-item label="音频编码">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="ACC" value="ACC" />
              </el-select>
            </el-form-item>
            <el-button class="save-button" type="primary">保存</el-button>
          </el-form>
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
