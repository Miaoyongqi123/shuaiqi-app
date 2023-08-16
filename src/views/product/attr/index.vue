
<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="success" size="default" icon="Plus" @click="addAttr">
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="scope">
              <el-tag
                style="margin: 20px"
                v-for="item in scope.row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(scope.row)"
              ></el-button>
              <el-button type="danger" size="small" icon="Delete" @click="del(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="success"
          size="default"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="success" size="default">取消</el-button>
        <el-table style="margin: 10px 0px" :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc:any)=>inputAttr[$index]=vc"
                placeholder="请你输入属性值名称"
                v-model="row.valueName"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="success" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, reactive } from 'vue'
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr} from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
// 存储已有属性
let attrArr = ref<Attr[]>([])
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询数据
    attrArr.value = []
    if (!categoryStore.c3Id) return
    // const {c1Id,c2Id,c3Id}=categoryStore
    // console.log(c1Id,c2Id,c3Id);
    getAttr()
  },
)
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  // 获取分类
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  console.log(result)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//card组件内容切换 :0显示table 1显示展示添加
let scene = ref<number>(0)
//添加属性
const addAttr = () => {
  // 每一次点击时，在收集
  Object.assign(attrParams, {
    attrName: '', //新增属性名称
    attrValueList: [], //新增属性值
    categoryId: categoryStore.c3Id, //三级分类id
    categoryLevel: 3, //代表三级分类
  })
  scene.value = 1
}
//修改属性
const updateAttr = (row: any) => {
  scene.value = 1;
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
}
//取消
const cancel = () => {
  scene.value = 0
}

let attrParams = reactive<Attr>({
  attrName: '', //新增属性名称
  attrValueList: [], //新增属性值
  categoryId: '', //三级分类id
  categoryLevel: 3, //代表三级分类
})

// 添加属性值该方法
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
  })
}
//保存事件
const save = async () => {
  // 发送请求
  let result: any = await reqAddOrUpdateAttr(attrParams)
  // console.log(result);
  if (result.code == 200) {
    //切换场景
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    //重新获取数据
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
//存储输入框实例
let inputAttr = ref<any>([])
// const handler=(el:any)=>{
// console.log(el);

// }
//删除业务
const del = async(attrId:number) => {
  let result:any=await reqRemoveAttr(attrId)
  if(result.code==200){
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }else{
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
  getAttr()
}
</script>

<style scoped lang="scss"></style>
