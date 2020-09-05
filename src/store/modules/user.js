import { userRoutes } from '@/router/userRoutes'

export default {
	state: {
		userInfo: {},
		userRoutes,
		userPower: []
	},
	getters: {
		getUserRoutes (state) {
			return state.userRoutes
		}
	}
}
