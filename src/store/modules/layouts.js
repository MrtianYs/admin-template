import { layouts } from '@/config/index'

export default {
    state: {
        layoutsConfig: {
            theme: {
                siderMenu: 'dark',
                topMenu: 'dark'
            },
            siderWidth: layouts.siderMenuWidth
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
