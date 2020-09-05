import { defaultLayouts } from '@/config/layouts'

export default {
    state: {
        layoutsConfig: {
            theme: {
				siderMenu: defaultLayouts.theme.siderMenu,
				headMenu: defaultLayouts.theme.headMenu
            },
			siderWidth: defaultLayouts.siderMenuWidth,
			headMenu: defaultLayouts.headMenu
        }
    },
    getters: {
        getLayoutConfig (state) {
            return state.layoutsConfig
        }
    },
    mutations: {
        setSiderWidth (state, value) {
            console.log(value)
            state.layoutsConfig.siderWidth = value
        }
    }
}
