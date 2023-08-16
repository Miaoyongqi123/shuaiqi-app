// 登录接口携带参数
export interface loginFormData {
    username: string,
    password: string,
}

//登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string,
}

export interface userInfoResponseData extends ResponseData {

    data: {
        routes: string[];
        buttons: string[];
        roles: string[];
        name: string[];
        avatar: string[]; 
    }
}
//全部接口返回数据拥有ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}