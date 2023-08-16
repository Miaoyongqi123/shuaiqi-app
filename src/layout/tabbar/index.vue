<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <BreadCrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>
<script setup lang="ts">
//引入左侧导航
import BreadCrumb from './breadcrumb/index.vue'
//引入右侧设置
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-image: linear-gradient(
  //   to right,
  //   rgb(232, 223, 223),
  //   rgb(201, 178, 178),
  //   rgb(197, 165, 165)
  // );

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .icon {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
