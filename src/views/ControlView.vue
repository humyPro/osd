<template>
  <div class="normal-layout">
    <MenuBar />
    <div class="main-content">
      <div class="forms-box">
        <div class="form-box bordered">
          <FormTitle :title="$t('gimbal.title')"></FormTitle>
          <div class="buttons">
            <div>
              <el-button @click="submitBtnAction('OFF')">OFF</el-button>
              <el-button @click="submitBtnAction('HIDE')">HIDE</el-button>
              <el-button @click="submitBtnAction('RES')">RES</el-button>
              <el-button @click="submitBtnAction('RATF')">RATF</el-button>
            </div>
            <div>
              <el-button @click="submitBtnAction('GIMF')">GIMF</el-button>
              <el-button @click="submitBtnAction('EULF')">EULF</el-button>
              <el-button @click="submitBtnAction('SCAN')">SCAN</el-button>
              <el-button @click="submitBtnAction('GEO')">GEO</el-button>
            </div>
            <div>
              <el-button @click="submitBtnAction('CEUL')">CEUL</el-button>
              <el-button @click="submitBtnAction('CGEO')">CGEO</el-button>
              <el-button @click="submitBtnAction('CGIM')">CGIM</el-button>
              <el-button @click="submitBtnAction('DOWN')">DOWN</el-button>
            </div>
            <div>
              <el-button @click="submitBtnAction('RGIM')">RGIM</el-button>
              <el-button @click="submitBtnAction('TRA')">TRA</el-button>
              <el-button @click="submitBtnAction('CTRA')">CTRA</el-button>
              <el-button @click="submitBtnAction('ATRA')">ATRA</el-button>
            </div>
          </div>
          <div class="yt_box">
            <ul class="pie">
              <li
                v-for="n in 8"
                :class="`slice-${n} slice`"
                :key="n"
                @click="submitBtnAction(keyMap[n])"
              >
                <TriangleIcon :title="n" class="yt_icon" :checked="true" />
              </li>
              <div class="center"></div>
            </ul>
          </div>
        </div>
        <div class="form-box bordered">
          <FormTitle :title="$t('camera.title')"></FormTitle>
          <el-form label-position="left">
            <el-form-item :title="$t('camera.title')">
              <el-select v-model="deviceSelected">
                <el-option label="TV1" :value="0" />
                <el-option label="TV2" :value="1" />
                <el-option label="IR" :value="2" />
              </el-select>
            </el-form-item>
            <div class="buttons">
              <div>
                <el-button @click="submitCameraAction(1)">{{
                  $t('camera.buttons.zoomIn')
                }}</el-button>
                <el-button @click="submitCameraAction(2)">{{
                  $t('camera.buttons.zoomOut')
                }}</el-button>
                <el-button @click="submitCameraAction(0)">{{
                  $t('camera.buttons.zoomStop')
                }}</el-button>
                <el-button @click="submitCameraAction(3)">{{
                  $t('camera.buttons.zoomSet')
                }}</el-button>
              </div>
              <div>
                <el-button @click="submitCameraAction(4)">{{
                  $t('camera.buttons.focusIn')
                }}</el-button>
                <el-button @click="submitCameraAction(5)">{{
                  $t('camera.buttons.focusOut')
                }}</el-button>
                <el-button @click="submitCameraAction(6)">{{
                  $t('camera.buttons.autoFocus')
                }}</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import apis from '@/common/apis'
import util from '@/common/util'
import { ref } from 'vue'
const deviceSelected = ref(0)
const keyMap: { [key: string]: string } = {
  '1': 'up',
  '2': 'upper_right',
  '3': 'right',
  '4': 'lower_right',
  '5': 'down',
  '6': 'lower_left',
  '7': 'left',
  '8': 'upper_left'
}
const submitBtnAction = (action: string) => {
  apis.ytControlAction(action).then((res) => util.resultHandler(res))
}

const submitCameraAction = (action: number) => {
  apis.submitCameraAction(deviceSelected.value, action).then((res) => util.resultHandler(res))
}
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
