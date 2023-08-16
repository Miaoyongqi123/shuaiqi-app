<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//标题和logo配置文件
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  color: white;
  align-items: center;
  width: 100%;
  height: $base-logo-height;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
    padding-top: 5px;
    border-radius: 50%;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
