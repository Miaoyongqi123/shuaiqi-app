<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input
          placeholder="输入要搜索的职位关键字"
          v-model="keyWord"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="search"
          :disabled="keyWord ? false : true"
        >
          搜索
        </el-button>
        <el-button type="warning" icon="Refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table border style="margin: 10px 0px" :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column align="center" label="id" prop="id"></el-table-column>
      <el-table-column
        align="center"
        label="职位名称"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="280px">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            icon="Plus"
            size="small"
            @click="setPermission(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="success"
            icon="Edit"
            size="small"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-button
            type="warning"
            icon="Delete"
            size="small"
            @click="deleteRole(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasRole"
    />
  </el-card>
  <!-- 添加职位与更新职位：对话框 -->
  <el-dialog
    v-model="dialogVisite"
    :title="RoleParams.id ? '更新职位' : '添加职位'"
  >
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input
          placeholder="输入职位名称"
          v-model="RoleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="dialogVisite = false">取消</el-button>
      <el-button type="success" @click="save">确认</el-button>
    </template>
  </el-dialog>
  <!-- 抽屉组件：分配职位与菜单权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <!-- 树形控件：展示权限 -->
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectArr"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <el-button type="primary" @click="drawer = false">取消</el-button>
      <el-button type="success" @click="confirm">确认</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
  reqRemoveRole,
} from '@/api/acl/role'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuList,
} from '@/api/acl/role/type'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'

//当前页码
let pageNo = ref<number>(1)
// 每页展示数据
let pageSize = ref<number>(10)
// 搜索关键字
let keyWord = ref<string>('')
// 存储全部职位
let allRole = ref<Records>([])
//获取form组件实例
let form = ref<any>()
// 总个数
let total = ref<number>(10)
// 对话框显示与隐藏
let dialogVisite = ref<boolean>(false)
// 抽屉显示与隐藏
let drawer = ref<boolean>(false)
//新增职位数据
let RoleParams = reactive<RoleData>({
  roleName: '',
})
// 存储权限数据
let menuArr = ref<MenuList>([])
//存储勾选权限的id(4级)
let selectArr = ref<any>([])
//获取树形控件组件实例
let tree = ref<any>()
//获取仓库模板
let settingStore = useLayOutSettingStore()
onMounted(() => {
  getHasRole()
})
const getHasRole = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyWord.value,
  )
  // console.log(result);
  if (result.code == 200) {
    ;(total.value = result.data.total), (allRole.value = result.data.records)
  }
}
//每页下拉改变数据
const handleSizeChange = () => {
  getHasRole()
}
//搜索按钮
const search = () => {
  getHasRole()
  keyWord.value = ''
}
//重置按钮
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
//添加按钮
const addRole = () => {
  dialogVisite.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//编辑按钮
const updateRole = (row: RoleData) => {
  dialogVisite.value = true
  //存储已有职位
  Object.assign(RoleParams, row)
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称至少两位'))
  }
}
//职位校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
//确认按钮
const save = async () => {
  //校验通过发送请求
  await form.value.validate
  //  发送请求
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功',
    })
    dialogVisite.value = false
    getHasRole(RoleParams.id ? pageNo.value : pageSize.value - 1)
  }
}
// 分配权限按钮
const setPermission = async (row: RoleData) => {
  drawer.value = true
  //收集数据
  Object.assign(RoleParams, row)
  // 发请求
  let result: any = await reqAllMenuList(RoleParams.id as number)
  console.log(result)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
// 过滤id
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
// 分配权限
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 抽屉确定按钮
const confirm = async () => {
  // 职位id
  const roleId = RoleParams.id as number
  //选中节点的Id
  let arr = tree.value.getCheckedKeys()
  // 半选择的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  // 下发权限
  let permissionId = arr.concat(arr1)
  let result: any = await reqSetPermisstion(roleId, permissionId)
  // console.log(result);
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    //页面刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
}
//删除角色
const deleteRole = async (id: number) => {
  let result: any = await reqRemoveRole(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
  getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
}
</script>
<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
