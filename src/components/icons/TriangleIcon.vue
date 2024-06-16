<template>
  <div calss="triangle-box">
    <div :class="{ triangle: true, checked }"></div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  checked: {
    type: Boolean,
    default: true
  }
})
</script>
<style scoped>
.triangle-box {
  width: 15px;
  height: 15px;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
}
.triangle:not(.checked) {
  border-bottom: 15px solid rgba(62, 69, 71, 0.164);
}
.triangle.checked {
  border-bottom: 15px solid var(--el-color-primary);
}
.triangle:active {
  border-bottom: 15px solid rgba(62, 69, 71, 0.164);
}
</style>
