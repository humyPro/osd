<template>
  <div class="dot">
    <div></div>
    <el-text size="large" type="primary">{{ title }}</el-text>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    title: String
  }
}
</script>
<style scoped>
.dot {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 18px;
}
.dot div {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  border-radius: 3px;
  background-color: #5c8ce8;
}
</style>
