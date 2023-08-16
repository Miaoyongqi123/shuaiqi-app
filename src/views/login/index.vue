<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
//定义加载效果
let loading = ref(false)
//引入当前时间函数
import { getTime } from '@/utils/time'
// 引入仓库
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
//引入路由器
import { useRouter } from 'vue-router'
let $router = useRouter()
let useStote = useUserStore()
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
const login = async () => {
  await loginForms.value.validate()
  // 开启加载
  loading.value = true
  //通知仓库发请求
  try {
    await useStote.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来宝宝',
      title: `HI,${getTime()}好宝宝`,
    })
    // 登陆成功加载效果消失
    loading.value = false
  } catch (error) {
    // 登陆失败加载效果消失
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:校验规则对象
  //value:表单元素文本内容
  //callback条件符合放行函数
  if (value.length >= 5) {
    callback()
  }else{
    callback(new Error('宝宝你要按要求输入啊话，账号只能输入5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule:校验规则对象
  //value:表单元素文本内容
  //callback条件符合放行函数
  if (value.length >= 6) {
    callback()
  }else{
    callback(new Error('宝宝密码长度至少六位'))
  }
}
//定义表单校验配置
const rules = {
  username: [
    // { required: true, message: '客官输一个名字吧', trigger: 'blur' },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
  { trigger: 'change', validator: validatorPassword },
  ],
}
//获取el-form
const loginForms = ref()
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到帅奇商城</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
