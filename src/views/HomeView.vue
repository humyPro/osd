<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="form-content">
        <div class="title" style="margin-bottom: 10px">
          <FormTitle title="编码通道1参数设置" />
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
        </el-form>
      </div>
      <div class="form-content">
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
        </el-form>
      </div>
      <div class="form-content">
        <div class="title" style="margin-bottom: 10px">
          <FormTitle title="编码通道3参数设置" />
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
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import MenuBar from '@/components/MenuBar.vue'
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
<style scoped>
.inline-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
