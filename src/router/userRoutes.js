import Basic from '../components/layouts/Basic.vue'
import home from '../views/home.vue'
import RouterView from '../components/layouts/RouterView.vue'

/**
 * router meta
 * title：菜单名称
 * hiddenInMenu: true  菜单中是否隐藏
 * target: '__blank' 外部链接
 * icon: 菜单图标
 */

const addRouter = [
	{
		name: 'basic',
		path: '/',
		component: Basic,
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: home,
				meta: { title: '首页' }
			}
		]
	}
]

export const userRoutes = [
	{
		path: '/user',
		name: 'user',
		component: RouterView,
		meta: { title: '用户管理', icon: 'user' },
		redirect: '/user/role',
		children: [
			{
				path: 'role',
				name: 'role',
				component: () => import('@/views/user/role/index.vue'),
				meta: { title: '角色管理' },
				redirect: 'role/student',
				children: [
					{
						path: 'student',
						name: 'student',
						meta: { title: '学生管理' }
					},
					{
						path: 'person',
						name: 'person',
						meta: { title: '学生管理2' }
					}
				]
			},
			{
				path: 'power',
				name: 'power',
				component: () => import('@/views/user/power/index.vue'),
				meta: { title: '权限管理' }
			}
		]
	}
]

addRouter[0].children = [...addRouter[0].children, ...userRoutes]

export default addRouter
