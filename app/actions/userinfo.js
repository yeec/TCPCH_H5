import * as actionTypes from '../constants/userinfo'

// 引用位置,调用login()函数并向函数内传入data值
export function login(data) {
    return {
        type: actionTypes.USERINFO_LOGIN,
        data
    }
}