import Vue from 'vue'
import VueRouter from 'vue-router'
import basic from '../components/basic.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'basic',
        path: '/',
        component: basic,
        children: [

        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
