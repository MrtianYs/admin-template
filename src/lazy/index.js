import Vue from 'vue'
import Storage from 'vue-ls'
import {
	Layout,
	Button,
    Menu,
    Breadcrumb,
	Icon,
	Popover,
	Result,
	FormModel,
	Input,
	Message,
	Modal,
	Notification
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Result)
Vue.use(Button)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Message)
Vue.use(Modal)
Vue.use(Notification)

Vue.use(Storage, {
	namespace: 'TY_',
	name: 'TY',
	storage: 'local'
})
Vue.prototype.$message = Message
Vue.prototype.$modal = Modal
Vue.prototype.$notification = Notification
