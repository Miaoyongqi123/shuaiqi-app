<template>
  <div>
    <el-form>
      <el-form-item label="SKU名称">
        <el-input
          placeholder="宝宝请输入SKU名称"
          v-model="skuParams.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuParams.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          placeholder="重量(克)"
          type="number"
          v-model="skuParams.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          placeholder="SKU描述"
          type="textarea"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="(item, index) in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select v-model="item.saleAttrIdAndValueId">
              <el-option
                :value="`${item.id}:${attrValue.id}`"
                v-for="(attrValue, index) in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            :label="item.saleAttrName"
            v-for="(item, index) in saleArr"
            :key="item.id"
          >
            <el-select v-model="item.saleAttrIdAndValueId">
              <el-option
                :value="`${item.id}:${saleAttrValue.id}`"
                v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column
            type="selection"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template #="{ row, $index }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="success" size="default" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
import { ref, reactive } from 'vue'
import type {
  SkuInfoData,
  SkuData,
  SpuData,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
//平台属性
let attrArr = ref<any>([])
//销售属性
let saleArr = ref<any>([])
//照片
let imgArr = ref<any>([])
//获取table组件实例
let table = ref<any>([])
//收集SKU的参数
let skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  //v-model收集
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述

  skuAttrValueList: [
    //平台属性的收集
  ],
  skuSaleAttrValueList: [
    //销售属性
  ],
  skuDefaultImg: '', //sku图片地址
})
let $emit = defineEmits(['changeScene'])
//取消按钮
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
//当前子组件方法
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  ;(skuParams.category3Id = spu.category3Id),
    (skuParams.spuId = spu.id),
    (skuParams.tmId = spu.tmId)
  //获取对应平台属性
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  //获取对应销售属性
  let result1: any = await reqSpuHasSaleAttr(spu.id)
  //图片
  let result2: any = await reqSpuImageList(spu.id)
  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}
//图片设置
const handler = (row: any) => {
  //复选框选中
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  // 选中图片才勾选
  table.value.toggleRowSelection(row, true)
  //收集图片地址
  skuParams.skuDefaultImg = row.imgUrl
}
//保存按钮
const save = async () => {
  //整理参数
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
      return prev
    }
  }, [])
  //销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  //添加sku方法
let result:any=  await reqAddSku(skuParams)
// console.log(result);
if(result.code==200){
ElMessage({
  type:'success',
  message:'添加sku成功'
})
//切换场景
$emit('changeScene',{flag:0,params:''})
}else{
  ElMessage({
  type:'error',
  message:'添加sku失败'
})
}

}
defineExpose({
  initSkuData,
})
</script>
<style scoped>
</style>