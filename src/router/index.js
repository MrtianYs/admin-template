import Vue from 'vue'
import VueRouter from 'vue-router'
import notFound from '../views/error/404.vue'
import authorized from '../views/error/403.vue'
import servererror from '../views/error/500.vue'
import addRouter from './userRoutes'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login'
	},
	{
		path: '/404',
		name: '404',
		component: notFound
	},
	{
		path: '/403',
		name: '403',
		component: authorized
	},
	{
		path: '/500',
		name: '500',
		component: servererror
	},
	{
		path: '*',
		redirect: '/404'
	}
]

const router = new VueRouter({
	routes
})

router.addRoutes(addRouter)

export default router
