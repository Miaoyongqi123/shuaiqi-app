import { defineStore } from 'pinia'
let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,//控制菜单是否收起
            refsh:false,//控制刷新
        }
    }
})
export default useLayOutSettingStore