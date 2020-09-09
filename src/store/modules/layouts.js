import Vue from 'vue'
import { defaultLayouts } from '@/config/layouts'

export default {
    state: {
        layoutsConfig: {
            theme: {
				siderMenu: defaultLayouts.theme.siderMenu,
				headMenu: defaultLayouts.theme.headMenu
            },
			siderWidth: defaultLayouts.siderMenuWidth,
			headMenu: defaultLayouts.headMenu,
			breadcrumb: defaultLayouts.breadcrumb,
			tabs: defaultLayouts.tabs
		},
		tabs: {
			list: Vue.TY.get('tabs') ? Vue.TY.get('tabs') : [],
			on: 'home'
		}
    },
    getters: {
        getLayoutConfig (state) {
            return state.layoutsConfig
		},
		getTabs (state) {
			return state.tabs
		}
    },
    mutations: {
        setSiderWidth (state, value) {
            state.layoutsConfig.siderWidth = value
		},
		setTabs (state, { list, on }) {
			state.tabs.list = list
			on && (state.tabs.on = on)
			Vue.TY.set('tabs', list)
		}
    }
}
