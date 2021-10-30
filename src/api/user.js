import request from '@/utils/invoke';

// 登录
export function login(data) {
  return request({
    url: "/user/managetoken",
    method: 'post',
    data
  })
}

//获取路由表
export function getRouters() {
  return request({
    url: "/user/routingtable",
    method: 'get'
  })
}

//修改密码
export function updateUserPwd(data) {
  return request({
    url: "/user/pwd",
    method: 'put',
    data
  })
}
