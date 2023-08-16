<template>
  <el-icon
    class="icon"
    @click="changeIcon"
    style="cursor: pointer; margin-right: 5px"
  >
    <!-- <Expand /> -->
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <!-- 图标 -->
      <el-icon style="vertical-align: middle;
      margin: 0px 5px;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- //展示匹配的路由得标题 -->
      <span style="cursor: pointer;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
    <!-- <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
  </el-breadcrumb>
</template>

<script setup lang="ts">
//获取仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
// 切换图标方法
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $route = useRoute()
const changeIcon = () => {
  // fold.value=!fold.value
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
// 面包屑导航切换
const handler = () => {
  console.log($route.matched)
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>


<style scoped lang="scss">
</style>
