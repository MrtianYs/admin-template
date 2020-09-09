import axios from '@/utils/request'

export const login = (data) => {
	return axios({
		url: '/login',
		method: 'post',
		data
	})
}
