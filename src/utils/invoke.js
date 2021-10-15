import axios from 'axios'
import { localStorageGet, messageInfo } from './util'
import qs from 'qs'

// 重试上限次数
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

export default function request(option) {
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = axios.create({
			baseURL: process.env.VUE_APP_BASE_API,
			// baseURL: process.env.VUE_APP_BASE_API,
			timeout: 20000
		});

		// 配置请求和响应拦截
		instance.interceptors.request.use((config) => {
      // 请求头其他信息
      config.headers['Authorization'] = localStorageGet('token')
      config.data = qs.stringify(config.data)
      return config
    },
    error => Promise.reject(error))

		instance.interceptors.response.use(response => {
			return response.data
		}, err => {
      console.log(err);
      if (err && err.response) {
				switch (err.response.errorCode) {
					case 400:
            messageInfo('请求错误', 'error')
						break
					case 401:
            localStorage.removeItem('token')
            messageInfo('未授权的访问', 'error')
						break
					default:
						messageInfo('连接错误', 'error')
				}
			}
			return err
		})

		// 构造入参对象，进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
