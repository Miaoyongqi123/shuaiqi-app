<template>
  <el-table style="width: 100%; margin-bottom: 20px" row-key="id" border :data="allPermisstionData">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, $index }">
        <el-button type="primary" size="small" icon="Plus" :disabled="row.level==4?true:false" @click="addPermisstion(row)">{{ row.level==3?"添加功能":'添加菜单' }}</el-button>
        <el-button type="success" size="small" icon="Edit" :disabled="row.level==1?true:false" @click="updatePermisstion(row)">编辑</el-button>
        <el-button type="warning" size="small" icon="Delete" :disabled="row.level==1?true:false" @click="removeMenu(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
    width="30%"
  >
    <template #default>
      <el-form-item label="名称">
           <el-input placeholder="请输入名称" v-model="menuData.name">名称</el-input>
      </el-form-item>
     <el-form-item label="权限">
          <el-input placeholder="请输入权限值" v-model="menuData.code">权限值</el-input>
     </el-form-item>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="success" @click="save"> 确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted ,reactive} from 'vue'
import { reqAllPermisstion ,reqAddOrUpdateMenu,reqRemoveMenu} from '@/api/acl/menu'
import type { PermisstionResponseData,PermisstionList,Permisstion,MenuParams} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
// 定义全部权限菜单
let allPermisstionData = ref<PermisstionList>([])
//对话框显示与隐藏
let dialogVisible = ref<boolean>(false)
//携带的参数
let menuData = reactive<MenuParams>({
    "code": "",
    "level": 0,
    "name": "",
    "pid": 0,
})
onMounted(() => {
  getHasPermission()
})
// 获取全部权限菜单
const getHasPermission = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if(result.code==200){
      allPermisstionData.value=result.data
  }

  
}

//添加菜单按钮的回调
const addPermisstion = (row: Permisstion) => {
    //清空数据
    Object.assign(menuData, {
         id: 0,
        "code": "",
        "level": 0,
        "name": "",
        "pid": 0,
    })
    //对话框显示出来
    dialogVisible.value = true;
    //收集新增的菜单的level数值
    menuData.level = row.level + 1;
    //给谁新增子菜单
    menuData.pid = (row.id as number);

}
//编辑按钮
const updatePermisstion=(row:Permisstion)=>{
  dialogVisible.value=true
  Object.assign(menuData,row)
}
// 确定按钮
const save= async()=>{
    dialogVisible.value=false
   let result:any = await reqAddOrUpdateMenu(menuData)
   if (result.code == 200) {
        //对话框隐藏
        dialogVisible.value = false;
        //提示信息
        ElMessage({ type: 'success', message: menuData.id ? '更新成功' : '添加成功' })
        //再次获取全部最新的菜单的数据
        getHasPermission();
    }
}

//删除按钮
const removeMenu= async(id:number)=>{
let result =await reqRemoveMenu(id)
if (result.code == 200) {
      
        //提示信息
        ElMessage({ type: 'success', message: '删除成功' })
        //再次获取全部最新的菜单的数据
        getHasPermission();
    }
}
</script>
<style scoped lang="scss"></style>
