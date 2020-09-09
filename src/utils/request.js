import Vue from 'vue'
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import axios from 'axios'
import store from '@/store'

export const baseUrl = '/'
export const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。'
}

const request = (config) => {
	const token = Vue.TY.get('Access-Token')
	if (token) {
		config.headers['Access-Token'] = token
	}
	return config
}

export const response = (res) => {
	const data = res.data
	if (res && res.config && res.config.responseType === 'blob') {
		if (data.type === 'application/json') {
			return data.text().then(res => {
				const txt = JSON.parse(res)
				return responeSuccess(txt)
			})
		} else {
			return Promise.resolve(response)
		}
	} else {
		return responeSuccess(data)
	}
}

function responeSuccess (data) {
	const code = data.code || 200
	if (parseInt(code / 100) !== 2) {
		if (data.msg) {
			notification.error({
				message: '提示',
				description: data.msg
			})
		}
		if (code === 300) {
			store.dispatch('Logout').then(() => {
				location.href = '/'
			})
		} else {
			return Promise.reject(data)
		}
	} else {
		if (data.msg) {
			message.success(data.msg)
		}
		return Promise.resolve(data)
	}
}

export const error = (error) => {
	if (error.response) {
		const status = error.response.status
		notification.error({
			message: '提示',
			description: codeMessage[status]
		})
	}
	if (error.code === 'ECONNABORTED' && error.request.status === 0 && error.toJSON().message.indexOf('timeout') > -1) {
		notification.error({
			message: '提示',
			description: '请求超时'
		})
	}
	return Promise.reject(error.response)
}

const Axios = axios.create({
	baseUrl
})
Axios.interceptors.request.use(request)
Axios.interceptors.response.use(response, error)

export default Axios
