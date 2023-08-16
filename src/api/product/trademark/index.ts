//品牌管理模块
import request from "@/utils/request";
import type { Trademark, TrademarkResponseData } from "./type";
enum API {
    //获取接口
    TREADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌
    ADD_TREADEMARK_URL = '/admin/product/baseTrademark/save',
    // 修改品牌
    UPDATE_TREADEMARK_URL = '/admin/product/baseTrademark/update',

    //删除已有品牌
    DELETE_URL = '/admin/product/baseTrademark/remove/',

}

export const reqHasTrademark = (page: number, limit: number) => request.get<any, TrademarkResponseData>(API.TREADEMARK_URL + `${page}/${limit}`)

//添加与更新
export const reqAddOrUpdateTrademark = (data: Trademark) => {
    //修改
    if (data.id) {
        return request.put<any, any>(API.UPDATE_TREADEMARK_URL, data)
    } else {
        // 新增
        return request.post<any, any>(API.ADD_TREADEMARK_URL, data)
    }
}
//删除数据
export const reqDeleteTrademark = (id: number) =>
    request.delete<any, any>(API.DELETE_URL + id)
