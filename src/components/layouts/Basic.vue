<template>
    <a-layout id="components-layout-fixed-sider">
        <a-layout-sider
            v-model="collapsed"
            :width="getLayoutConfig.siderWidth"
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
            <div class="logo">
                <span v-show="!collapsed">后台管理系统</span>
            </div>
            <a-menu
                :theme="getLayoutConfig.theme.siderMenu"
                mode="inline"
                v-model="sideMenuKey"
                :open-keys.sync="sideMenuOpenKey"
                @click="sideMenuClick"
            >
                <template v-for="item in sideMenuList">
                    <SubMenu
                        v-if="item.children && !item.meta.hiddenInMenu"
                        :key="item.name"
                        :menu="item"
                    />
                    <a-menu-item
                        v-else-if="!item.meta.hiddenInMenu"
                        :key="item.name"
                    >
                        <a-icon
                            v-if="item.meta.icon"
                            :type="item.meta.icon"
                        />
                        <span class="nav-text">{{ item.meta.title }}</span>
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: getLayoutConfig.siderWidth, transition: 'all 0.2s' }">
            <a-layout-header class="header">
                <div class="header-warp">
                    <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="setCollapsed"
                    />
                    <a-menu
                        v-if="getLayoutConfig.headMenu"
                        mode="horizontal"
                        class="header-menu"
                        v-model="headMenuKey"
                        @click="headMenuClick"
                    >
                        <template
                            v-for="item in getUserRoutes"
                        >
                            <a-menu-item
                                :key="item.name"
                                v-if="!item.meta.hiddenInMenu"
                            >
                                <a
                                    v-if="item.meta.target"
                                    :target="item.meta.target"
                                    :href="item.path"
                                >{{ item.meta.title }}</a>
                                <span v-else>{{ item.meta.title }}</span>
                            </a-menu-item>
                        </template>
                    </a-menu>
                    <div class="user">
                        <a-popover placement="bottomRight">
                            <template slot="content">
                                <div class="logout">退出登录</div>
                            </template>
                            <a-icon type="user" />
                            <span> 超级管理员 </span>
                        </a-popover>
                    </div>
                </div>
            </a-layout-header>
            <a-layout :style="{ marginTop: getLayoutConfig.tabs || getLayoutConfig.breadcrumb ? 0 : '15px' }">
                <Xtabs v-if="getLayoutConfig.tabs" />
                <Xbreadcrumb v-if="getLayoutConfig.breadcrumb" />
            </a-layout>
            <a-layout-content :style="{ margin: '0 16px', overflow: 'initial' }">
                <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import { defaultLayouts } from '@/config/layouts.js'
    import Xbreadcrumb from './Xbreadcrumb.vue'
    import Xtabs from './Xtabs.vue'
    import SubMenu from './SubMenu.vue'
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Basic',
        data () {
            return {
                collapsed: false,
                sideMenuList: [],
                headMenuList: [],
                headMenuKey: [],
                sideMenuKey: [],
                sideMenuOpenKey: []
            }
        },
        components: {
            Xbreadcrumb,
            Xtabs,
            SubMenu
        },
        watch: {
            $route: {
                handler () {
                    this.setMenuStatus()
                },
                immediate: true
            }
        },
        computed: {
            ...mapGetters(['getLayoutConfig', 'getUserRoutes'])
        },
        mounted () {

        },
        methods: {
            ...mapMutations(['setSiderWidth']),
            setMenuStatus () {
                if (this.getLayoutConfig.headMenu) {
                    const headMenuKey = this.$route.matched[1].name
                    this.headMenuKey = [headMenuKey]
                    const sildeMenuParent = this.getUserRoutes.filter(item => item.name === headMenuKey)
                    if (sildeMenuParent[0]) {
                        this.sideMenuList = sildeMenuParent[0].children
                        this.sideMenuOpenKey = this.$route.matched.slice(1, this.$route.matched.length - 1).map(item => item.name)
                    }
                } else {
                    this.sideMenuList = this.getUserRoutes
                    this.sideMenuOpenKey = this.$route.matched.slice(1).map(item => item.name)
                }
                this.sideMenuKey = [this.$route.name]
            },
            setCollapsed () {
                if (this.collapsed) {
                    this.setSiderWidth(defaultLayouts.siderMenuWidth)
                    this.collapsed = false
                    this.setMenuStatus()
                } else {
                    this.setSiderWidth('80px')
                    this.collapsed = true
                    this.sideMenuOpenKey = []
                }
            },
            headMenuClick ({ item, key, keyPath }) {
                const getItem = this.getUserRoutes.filter(item => item.name === key)[0]
                if (getItem.children) {
                    this.sideMenuList = getItem.children
                } else {
                    if (this.$route.name !== key) {
                        this.$router.push({ name: key })
                        this.sideMenuList = []
                    }
                }
            },
            sideMenuClick ({ item, key, keyPath }) {
                if (this.$route.name !== key) {
                    this.$router.push({ name: key })
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    #components-layout-fixed-sider .logo {
        height: 32px;
        margin: 16px;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        line-height: 32px;
    }
    .header {
		padding: 0;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        &-menu {
			display: inline-block;
            line-height: 64px;
			margin-left: 20px;
			width: calc(100% - 150px);
		}
		&-warp {
			padding: 0 20px;
			width: 100%;
		}
    }
    .trigger {
        font-size: 18px;
        font-weight: 800;
	}
	.user {
		float: right;
		cursor: pointer;
	}
	.logout {
		cursor: pointer;
	}
</style>
