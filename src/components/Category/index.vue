<template>
  <el-card>
    <el-form :inline="true" :disabled="scene == 0 ? false : true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="handler1">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'

import { onMounted } from 'vue'
let categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
const getC1 = () => {
  categoryStore.getC1()
}

//一级分类选中时触发
const handler = () => {
  //将二级和三级分类清空
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // console.log(4448);
  categoryStore.getC2()
}
//二级分类选中时触发
const handler1 = () => {
  categoryStore.c3Id = ''
  // console.log(4448);
  categoryStore.getC3()
}
// 接受父组件参数
defineProps(['scene'])
</script>

<style scoped >
</style>