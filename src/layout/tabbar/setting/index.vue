<template>
  <el-button
    type="primary"
    icon="RefreshRight"
    size="small"
    @click="updateRefsh"
    class="btn"
  ></el-button>
  <el-button
    type="primary"
    icon="FullScreen"
    size="small"
    @click="fullSsreen"
    class="btn"
  ></el-button>
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button
        type="primary"
        icon="Setting"
        size="small"
        class="btn"
      ></el-button>
    </template>
  </el-popover>
  <img :src="userStore.avatar" alt="" />
  <el-dropdown class="dropdown">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu style="cursor: pointer">
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
// //或获取小仓库
import useLayOutSettingStore from '@/store/modules/setting'
//用户相关小仓库
import useUserStore from '@/store/modules/user'
let $router = useRouter()
let $route = useRoute()
let layoutSettingStore = useLayOutSettingStore()
// 收集开关数据
let dark = ref<boolean>(false)
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
let userStore = useUserStore()
//控制全屏
const fullSsreen = () => {
  //DOM对象的属性，判断是否为全屏
  let full = document.fullscreenElement
  // 切换全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
//退出登录
const logout = async () => {
  // alert(555)
  // 清除数据
  //跳转到登录

  await userStore.userLogout()
  //跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
//颜色取景器

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 暗黑模式按钮事件
const changeDark = () => {
  let html = document.documentElement
  // console.log(html);
  // 判断类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
//设置主题颜色
const setColor = () => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped lang="scss">
img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
}
.dropdown:hover {
  cursor: pointer;
}
// .btn{
//   border-radius: 25%;
// }
</style>
