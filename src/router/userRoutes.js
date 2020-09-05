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
		meta: { hiddenInMenu: true },
		children: [
			{
				path: '/home',
				name: 'home',
				component: home,
				meta: { hiddenInMenu: true }
			}
		]
	}
]

export const userRoutes = [
	{
		path: '/user',
		name: 'user',
		redirect: '/user/role',
		component: RouterView,
		meta: { title: '用户管理' },
		children: [
			{
				path: 'role',
				name: 'role',
				component: () => import('@/views/user/role/index.vue'),
				meta: { title: '角色管理' },
				children: [
					{
						path: 'student',
						name: 'student',
						component: () => import('@/views/user/role/index.vue'),
						meta: { title: '学生用户' }
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
	},
	{
		path: '/teacher',
		name: 'teacher',
		component: () => import('@/views/teacher/index.vue'),
		meta: { title: '教师管理' }
	}
]

addRouter[0].children = [...addRouter[0].children, ...userRoutes]

export default addRouter
