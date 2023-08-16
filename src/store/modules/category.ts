//商品分类仓库
import { defineStore } from "pinia";
import { reqC1, reqC2 ,reqC3} from '@/api/product/attr/index'
import type { CategoryResponseData,  } from "@/api/product/attr/type"
let useCategoryStore = defineStore('Category', {
    state: (): any => {
        return {
            //储存一级分类
            c1Arr: [],
            //存储一级分类id
            c1Id: '',
            //存储一级分类下的二级分类
            c2Arr: [],
            //存储一级分类id
            c2Id: '',
             //存储二级分类下的三级分类
            c3Arr: [],
            //存储三级分类id
            c3Id: '',
        }
    },
    actions: {
        //获取一级分类数据
        async getC1() {
            let result: CategoryResponseData = await reqC1()
            // console.log(result);
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        // 获取二级分类数据
        async getC2() {
            let result: CategoryResponseData = await reqC2(this.c1Id)
            // console.log(result);
            if (result.code == 200) {
                this.c2Arr = result.data
            }

        },
        async getC3() {
            let result: CategoryResponseData = await reqC3(this.c2Id)
            // console.log(result);
            if (result.code == 200) {
                this.c3Arr = result.data
            }

        }
    },
    getters: {

    }
})
export default useCategoryStore