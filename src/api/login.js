import fetch from 'utils/fetch'

// 以用户名登陆
export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: 'logon',
    method: 'post',
    data
  })
}

// 退出
export function logout () {
  return fetch({
    url: 'logout',
    method: 'get'
  })
}

// 获取登陆用户信息
export function getUserInfo () {
  return fetch({
    url: 'restfulservice/rbacUserService/getUserInfo',
    method: 'get'
  })
}

// 以用户名和token登陆
export function loginByUsernameAndToken (username, token) {
  return fetch({
    url: 'restfulservice/uCenterLoginService/login',
    method: 'get',
    params: {username, token}
  })
}
