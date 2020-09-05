import Vue from 'vue'
import Vuex from 'vuex'
import layouts from './modules/layouts'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
		layouts,
		user
    }
})
