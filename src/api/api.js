import { deleteRequest, getRequest, postRequest, putRequest } from '@/utils/request'

/**
 * 登录
 * post /login
 * json
 */
export function Login(data) {
    return postRequest('/login', data)
}

/**
 * 注册账号
 * post /register
 * json
 */
export function Register(data) {
    return postRequest('/register', data)
}

/**
 * 修改密码
 * put /login
 * json
 */
export function Update(data){
    return putRequest('/login',data)
}

/**
 * 删除用户
 * delete /login/{username}
 * string
 */
export function deleteByUsername(username){
    return deleteRequest('/login/'+username)
}

/**
 * 查询所有用户
 */
export function SelectAll(){
    return getRequest('/dashboard')
}

