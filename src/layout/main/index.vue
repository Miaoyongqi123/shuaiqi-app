<template>
  <!-- 路由组件出口位置 -->
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout哟极路由子路由 -->
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
//或获取小仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'
let layoutSettingStore = useLayOutSettingStore()
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//控制组件销毁
let flag = ref(true)
//监听数据变化
watch(
  () => layoutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
  transform: scale(0);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
