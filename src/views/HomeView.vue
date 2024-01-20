<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box" v-for="channel in channels" :key="channel.index">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'编码通道' + channel.index + '参数设置'" text-type="primary" />
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
        <div class="form-box bordered form-right">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle :title="'编码通道' + channel.index + '播放地址'" />
            <template v-for="url in channel.urls" :key="url">
              <el-tooltip :content="url" placement="top" effect="light">
                <el-text class="mx-1" truncated>{{ url }}</el-text>
              </el-tooltip>
              <p></p>
            </template>
          </div>
        </div>
      </div>
      <div class="forms-box">
        <div class="form-box bordered">
          <div class="title" style="margin-bottom: 10px">
            <FormTitle title="音频参数" text-type="primary" />
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="inline-form"
            label-position="left"
            label-width="100px"
          >
            <el-form-item label="音频编码">
              <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
                <el-option label="ACC" value="ACC" />
              </el-select>
            </el-form-item>
            <el-form-item label="声道布局">
              <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
                <el-option label="立体声" value="立体声" />
              </el-select>
            </el-form-item>
            <el-form-item label="ACC格式">
              <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
                <el-option label="LC-ACC" value="LC-ACC" />
              </el-select>
            </el-form-item>
            <el-form-item label="音频比特率">
              <el-select class="custom-form-item" v-model="formInline.region" placeholder="">
                <el-option label="24000" value="24000" />
              </el-select>
            </el-form-item>
            <el-button class="save-button" type="primary">保存</el-button>
          </el-form>
        </div>
        <div class="form-box bordered form-right">
          <div class="qrcode-image">
            <el-image style="width: 100px; height: 100px" :src="QRCode" fit="fill">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <el-text>扫描下载app|扫描连接设备</el-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import MenuBar from '@/components/MenuBar.vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
export default {
  components: {
    MenuBar,
    IconPicture
  },
  data() {
    return {
      formInline: {
        region: ''
      },
      channels: [
        {
          index: 1,
          urls: [
            'http://123.456aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            'http://123.456',
            'http://123.456'
          ]
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
.inline-form {
  display: flex;
  flex-wrap: wrap;
}
.form-right {
  width: 300xp;
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
