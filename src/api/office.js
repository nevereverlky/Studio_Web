import request from '@/utils/invoke';

// 下载模板
export function exportFormat(data) {
    return request({
      url: "/user/downloadtemplate",
      method: 'get',
      responseType: 'blob',
      params: data
    })
  }