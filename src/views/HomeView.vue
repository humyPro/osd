<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="form-content" v-for="channel in channels" :key="channel.index">
        <div class="title" style="margin-bottom: 10px">
          <FormTitle title="编码通道2参数设置" />
        </div>
        <el-form
          :inline="true"
          :model="formInline"
          class="inline-form"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="编码类型">
            <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
              <el-option label="H265" value="H264" />
              <el-option label="H265" value="H265" />
            </el-select>
          </el-form-item>
          <el-form-item label="分辨率">
            <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
              <el-option label="1080*960" value="1080*960" />
            </el-select>
          </el-form-item>
          <el-form-item label="帧率">
            <el-input class="custom-form-item" placeholder="5-60" />
          </el-form-item>
          <el-form-item label="关键帧间隔">
            <el-input class="custom-form-item" placeholder="30-180之间，30的倍数" />
          </el-form-item>
          <el-form-item label="码率(kbps)">
            <el-input class="custom-form-item" placeholder="160-20000" />
          </el-form-item>
          <el-form-item label="动态码率">
            <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
              <el-option label="CBR" value="CBR" />
              <el-option label="VBR" value="VBR" />
            </el-select>
          </el-form-item>
          <el-form-item label="画面比例">
            <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
              <el-option label="自动" value="auto" />
              <el-option label="4:3" value="4:3" />
              <el-option label="16:9" value="16:9" />
            </el-select>
          </el-form-item>
          <el-form-item label="MinQp">
            <el-input class="custom-form-item" placeholder="1-51" />
          </el-form-item>
          <el-form-item label="MaxQp">
            <el-input class="custom-form-item" placeholder="MinQp-51" />
          </el-form-item>
          <el-form-item label="MinIQp">
            <el-input class="custom-form-item" placeholder="MinQp-MaxQp" />
          </el-form-item>
          <el-form-item label="264级别">
            <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
              <el-option label="baseline profile" value="auto" />
              <el-option label="main profile" value="4:3" />
              <el-option label="high profile" value="16:9" />
            </el-select>
          </el-form-item>
          <el-button class="save-button" type="primary">保存</el-button>
        </el-form>
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
      formInline: {},
      channels: [
        {
          index: 1
        },
        {
          index: 2
        },
        {
          index: 3
        }
      ]
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
<style scoped>
.inline-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
