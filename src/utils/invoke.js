import axios from 'axios'
import { localStorageGet, messageInfo } from './util'
import qs from 'qs'
import _ from 'lodash'

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

		instance.interceptors.response.use((response) => {
			const data = response.data
			const code = response.status
			const headers = response.headers
			const message = response.message || ''
			console.log('download', headers['content-type'].indexOf('application/vnd.ms-excel'))
			if(code !== 200){
				// 由于此处无法引入element-ui,暂时打印处理
				console.log('error', message)
			} else if (headers['content-type'].indexOf('application/vnd.ms-excel') >= -1) {

				// 文件流处理 下载文件
				const content = headers['content-disposition'];
				// 获取文件名称
				let file_name = (_.split(content, 'fileName='))[1]
				// 解码
				file_name = decodeURIComponent(file_name)

				if ('download' in document.createElement('a')) { // 非IE下载
					const url = window.URL.createObjectURL(data)
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', file_name)
					document.body.appendChild(link)
					link.click()
					window.URL.revokeObjectURL(url);
					document.body.removeChild(link)
				} else { // IE 10+ 下载
					navigator.msSaveBlob((data), file_name)
				}
			} else {
				return data
			}
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