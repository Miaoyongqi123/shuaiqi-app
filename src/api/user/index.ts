import request from "@/utils/request";
import type { loginFormData, loginResponseData, userInfoResponseData } from "./type";
//统一接口管理
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}

// enum API {
//     LOGIN_URL = "/user/login",
//     USERINFO_URL = "/user/info"
// }
// //  暴露请求函数
//登录请求方法
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//用户信息接口
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

