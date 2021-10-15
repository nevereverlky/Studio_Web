import request from '@/utils/invoke';

export function login(data) {
  return request({
    url: "/user/managetoken",
    method: 'post',
    data: data
  })
}
