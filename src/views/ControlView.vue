<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered">
          <FormTitle title="云台控制"></FormTitle>
          <div class="buttons">
            <div>
              <el-button>OFF</el-button>
              <el-button>HIDE</el-button>
              <el-button>RES</el-button>
              <el-button>RATF</el-button>
            </div>
            <div>
              <el-button>GIMF</el-button>
              <el-button>EULF</el-button>
              <el-button>SCAN</el-button>
              <el-button>GEO</el-button>
            </div>
            <div>
              <el-button>CEUL</el-button>
              <el-button>CGEO</el-button>
              <el-button>CGIM</el-button>
              <el-button>DOWN</el-button>
            </div>
            <div>
              <el-button>RGIM</el-button>
              <el-button>TRA</el-button>
              <el-button>CTRA</el-button>
              <el-button>ATRA</el-button>
            </div>
          </div>
          <div class="yt_box">
            <ul class="pie">
              <li
                v-for="n in 8"
                :class="`slice-${n} slice`"
                :key="n"
                @click="ytBtnChecked[n - 1] = !ytBtnChecked[n - 1]"
              >
                <TriangleIcon class="yt_icon" :checked="ytBtnChecked[n - 1]" />
              </li>
              <div class="center"></div>
            </ul>
          </div>
        </div>
        <div class="form-box bordered">
          <FormTitle title="镜头控制"></FormTitle>
          <el-form :model="formInline" label-position="left">
            <el-form-item label="设备选择">
              <el-select v-model="formInline.region" placeholder="">
                <el-option label="TV1" value="TV1" />
                <el-option label="TV2" value="TV2" />
                <el-option label="IR" value="IR" />
              </el-select>
            </el-form-item>
            <div class="buttons">
              <div>
                <el-button>视场+</el-button>
                <el-button>视场-</el-button>
                <el-button>视场停止</el-button>
                <el-button>视场设置</el-button>
              </div>
              <div>
                <el-button>调焦+</el-button>
                <el-button>调焦-</el-button>
                <el-button>一键聚焦</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const ytBtnChecked = ref(new Array(8))
const formInline = ref({})
</script>
<style scoped>
.buttons > div {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.buttons > div + div {
  margin-top: 5px;
}
.buttons > div > button {
  width: 76.33px;
}

/*云台样式*/
.yt_box {
  height: 220px;
  /* width: 320px; */
  padding: 20px;
  /* background-color: #f6f8fe; */
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pie {
  position: relative;
  box-shadow: 0 0 20px #ccc;
  padding: 0;
  /* width: 300px; */
  width: 200px;
  height: 200px;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  /* background: url('bg.png') no-repeat center center / 100% 100%; */

  background-color: #fdfefe;
}
.center {
  position: absolute;
  width: 80px;
  height: 80px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  /* background: url('paly.png') no-repeat center center / 60% 60%; */
  border: 1px solid #eee;
  background-color: #fff;
}
.slice {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
  background-color: #fff;
}
.slice .yt_icon {
  max-width: 15px;
  margin-top: 40px;
  margin-left: 15px;
  /* margin-top: 70px;
            margin-left: 40px; */
}
.slice-1 {
  transform: rotate(-22.5deg) skewY(-45deg);
  /* background-color: red; */
  /* background-color: #f8f8f8; */
}
.slice-1 .yt_icon {
  transform: skewY(45deg) rotate(22.5deg);
}
.slice-2 {
  /* background-color: green; */
  transform: rotate(22.5deg) skewY(-45deg);
}
.slice-2 .yt_icon {
  transform: skewY(45deg) rotate(22.5deg);
}
.slice-3 {
  /* background-color: blue; */
  transform: rotate(67.5deg) skewY(-45deg);
}
.slice-3 .yt_icon {
  transform: skewY(45deg) rotate(22.5deg);
}
.slice-4 {
  /* background-color: yellow; */
  transform: rotate(112.5deg) skewY(-45deg);
}
.slice-4 .yt_icon {
  transform: skewY(45deg) rotate(20.5deg);
}
.slice-5 {
  /* background-color: black; */
  transform: rotate(157.5deg) skewY(-45deg);
}
.slice-5 .yt_icon {
  transform: skewY(45deg) rotate(20.5deg);
}
.slice-6 {
  /* background-color: seagreen; */
  transform: rotate(202.5deg) skewY(-45deg);
}
.slice-6 .yt_icon {
  transform: skewY(45deg) rotate(20.5deg);
}
.slice-7 {
  /* background-color: darkgoldenrod; */
  transform: rotate(247.5deg) skewY(-45deg);
}
.slice-7 .yt_icon {
  transform: skewY(45deg) rotate(22.5deg);
}
.slice-8 {
  /* background-color: maroon; */
  transform: rotate(292.5deg) skewY(-45deg);
}
.slice-8 .yt_icon {
  transform: skewY(45deg) rotate(22.5deg);
}
</style>
