<template>
  <div class="form-title">
    <div class="dot"></div>
    <el-text size="large" :type="textType">{{ title }}</el-text>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    title: String,
    textType: {
      type: String as any,
      default: 'primary'
    }
  }
}
</script>
<style scoped>
.form-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 18px;
}
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  border-radius: 3px;
  background-color: #5c8ce8;
}
</style>
