<template>
  <el-card>
    <div class="box">
      <!-- <img :src="userStore.avatar" alt="" class="avatar" /> -->
      <img src="@/assets/images/bauty.jpg" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
        <p class="subtitle">帅奇甄选运营平台</p>
      </div>
    </div>
    <img src="@/assets/images/first.jpg" alt="" class="img" />
  </el-card>
</template>
<script setup lang="ts">
//引入生命周期函数
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
</script>
<style scoped lang="scss">
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    font-size: 30px;
    margin-bottom: 20px;
  }
  .bottom {
    margin-left: 20px;
    .title {
      margin-top: 20px;
      margin-bottom: 30px;
      font-weight: 900;
    }
    .subtitle {
      font-style: italic;
      color: orange;
    }
  }
}
.img {
  margin-left: 30px;
  margin-top: 40px;
  border-radius: 0.5%;
  height: 450px;
  width: 1150px;
}
</style>
