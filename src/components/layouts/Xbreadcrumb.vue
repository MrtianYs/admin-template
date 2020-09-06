<template>
    <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item
            v-for="(item) in breadCrumbList"
            :key="item.name"
            @click="turnTo(item)"
        >
            <router-link v-if="item.redirect" :to="item.redirect">
                {{ item.meta.title }}
            </router-link>
            <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
    export default {
        name: 'Xbreadcrumb',
        data () {
            return {
                breadCrumbList: []
            }
        },
        watch: {
            $route: {
                handler () {
                    const routes = this.$route.matched.slice(1)
                    if (routes[0].name !== 'home') {
                        routes.unshift({
                            name: 'home',
                            meta: {
                                title: '首页'
                            },
                            redirect: '/home'
                        })
                    }
                    routes.map((item, index) => {
                        if (index && index !== routes.length - 1) {
                            const pathSplitRes = item.path.split('/')
                            const redirectSplitRes = item.redirect.split('/')
                            item.redirect = Array.from(new Set([...pathSplitRes, ...redirectSplitRes])).join('/')
                        }
                    })
                    this.breadCrumbList = routes
                },
                immediate: true
            }
        }
    }
</script>

<style lang="less" scoped>
	.breadcrumb {
		padding: 15px 16px;
	}
</style>
